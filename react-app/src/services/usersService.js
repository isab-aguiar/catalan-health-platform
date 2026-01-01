import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { auth, db, functions } from "../config/firebase";
const COLLECTION_NAME = "users";
export async function getUserData(uid) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }
    const userRef = doc(db, COLLECTION_NAME, uid);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists()) {
      return {
        success: false,
        error: "Usuário não encontrado",
        notFound: true,
      };
    }
    return {
      success: true,
      data: {
        uid: userDoc.id,
        ...userDoc.data(),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    return { success: false, error: error.message };
  }
}
export async function getAllUsers() {
  try {
    const usersRef = collection(db, COLLECTION_NAME);
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        uid: doc.id,
        ...doc.data(),
      });
    });
    return { success: true, data: users };
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    return { success: false, error: error.message };
  }
}
export async function createUser(userData, password, createdByUid) {
  try {
    if (!userData.email || !userData.displayName || !userData.role) {
      return { success: false, error: "Email, nome e role são obrigatórios" };
    }
    if (!password || password.length < 6) {
      return { success: false, error: "Senha deve ter no mínimo 6 caracteres" };
    }
    if (!["admin", "profissional", "diretoria"].includes(userData.role)) {
      return { success: false, error: "Role inválido" };
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      password
    );
    const newUser = userCredential.user;
    const userDoc = {
      uid: newUser.uid,
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      active: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: createdByUid || null,
    };
    await setDoc(doc(db, COLLECTION_NAME, newUser.uid), userDoc);
    return {
      success: true,
      data: {
        uid: newUser.uid,
        ...userDoc,
      },
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    let errorMessage = "Erro ao criar usuário";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Este email já está em uso";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Email inválido";
    } else if (error.code === "auth/weak-password") {
      errorMessage = "Senha muito fraca";
    }
    return { success: false, error: errorMessage };
  }
}
export async function updateUserRole(uid, role) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }
    if (!["admin", "profissional", "diretoria"].includes(role)) {
      return { success: false, error: "Role inválido" };
    }
    const userRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(userRef, {
      role,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    return { success: false, error: error.message };
  }
}
export async function toggleUserActive(uid, active) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }
    const userRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(userRef, {
      active: !!active,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar status do usuário:", error);
    return { success: false, error: error.message };
  }
}
export async function updateUser(uid, updates) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }

    // Se email está sendo atualizado, usar Cloud Function
    if (updates.email) {
      const emailResult = await updateUserEmail(uid, updates.email);
      if (!emailResult.success) {
        return emailResult;
      }
      // Remove email from updates since it was handled by Cloud Function
      delete updates.email;
    }

    // Se houver outras atualizações, aplicar no Firestore
    if (Object.keys(updates).length > 0) {
      const userRef = doc(db, COLLECTION_NAME, uid);
      const updateData = {
        ...updates,
        updatedAt: Timestamp.now(),
      };

      // Proteger campos sensíveis
      delete updateData.uid;
      delete updateData.createdAt;
      delete updateData.createdBy;

      await updateDoc(userRef, updateData);
    }

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return { success: false, error: error.message };
  }
}
export async function deleteUser(uid) {
  // DEPRECADO: Usar deleteUserComplete ao invés
  // Esta função apenas remove do Firestore, não do Authentication
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }
    const userRef = doc(db, COLLECTION_NAME, uid);
    await deleteDoc(userRef);
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Deletar usuário completamente (Authentication + Firestore)
 * Usa Cloud Function para maior segurança
 */
export async function deleteUserComplete(uid) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }

    // Verificar se functions está disponível
    if (!functions) {
      console.warn("Firebase Functions não inicializado");
      return {
        success: false,
        error: "Cloud Functions não disponível. Deploy as functions primeiro."
      };
    }

    const deleteUserFn = httpsCallable(functions, "deleteUserComplete");
    const result = await deleteUserFn({ uid });

    return {
      success: true,
      message: result.data.message,
    };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);

    // Tratamento de erros específicos do Firebase Functions
    let errorMessage = error.message;

    if (error.code === "unauthenticated") {
      errorMessage = "Você precisa estar autenticado";
    } else if (error.code === "permission-denied") {
      errorMessage = error.message; // Já vem com mensagem específica
    } else if (error.code === "not-found") {
      errorMessage = "Usuário não encontrado";
    } else if (error.code === "invalid-argument") {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}

/**
 * Enviar email de reset de senha
 * Usa Cloud Function para gerar link seguro
 */
export async function sendPasswordResetEmail(email) {
  try {
    if (!email) {
      return { success: false, error: "Email é obrigatório" };
    }

    if (!functions) {
      return {
        success: false,
        error: "Cloud Functions não disponível. Deploy as functions primeiro."
      };
    }

    const resetPasswordFn = httpsCallable(functions, "resetUserPassword");
    const result = await resetPasswordFn({ email });

    return {
      success: true,
      message: result.data.message,
    };
  } catch (error) {
    console.error("Erro ao enviar email de reset:", error);

    let errorMessage = error.message;

    if (error.code === "unauthenticated") {
      errorMessage = "Você precisa estar autenticado";
    } else if (error.code === "permission-denied") {
      errorMessage = error.message;
    } else if (error.code === "not-found") {
      errorMessage = "Usuário não encontrado";
    }

    return { success: false, error: errorMessage };
  }
}

/**
 * Admin define senha diretamente
 * Usa Cloud Function para alterar senha sem enviar email
 */
export async function setUserPasswordByAdmin(uid, newPassword) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "Senha deve ter no mínimo 6 caracteres" };
    }

    if (!functions) {
      return {
        success: false,
        error: "Cloud Functions não disponível. Deploy as functions primeiro."
      };
    }

    const setPasswordFn = httpsCallable(functions, "setUserPassword");
    const result = await setPasswordFn({ uid, newPassword });

    return {
      success: true,
      message: result.data.message,
    };
  } catch (error) {
    console.error("Erro ao definir senha:", error);

    let errorMessage = error.message;

    if (error.code === "unauthenticated") {
      errorMessage = "Você precisa estar autenticado";
    } else if (error.code === "permission-denied") {
      errorMessage = error.message;
    } else if (error.code === "not-found") {
      errorMessage = "Usuário não encontrado";
    } else if (error.code === "invalid-argument") {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}

/**
 * Admin atualiza email do usuário
 * Atualiza no Authentication e Firestore via Cloud Function
 */
export async function updateUserEmail(uid, newEmail) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }

    if (!newEmail || !newEmail.trim()) {
      return { success: false, error: "Email é obrigatório" };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return { success: false, error: "Email inválido" };
    }

    if (!functions) {
      return {
        success: false,
        error: "Cloud Functions não disponível. Deploy as functions primeiro."
      };
    }

    const updateEmailFn = httpsCallable(functions, "updateUserEmail");
    const result = await updateEmailFn({ uid, newEmail });

    return {
      success: true,
      message: result.data.message,
    };
  } catch (error) {
    console.error("Erro ao atualizar email:", error);

    let errorMessage = error.message;

    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Este email já está em uso";
    } else if (error.code === "auth/invalid-email") {
      errorMessage = "Email inválido";
    } else if (error.code === "permission-denied") {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}

export async function setUserData(uid, userData) {
  try {
    if (!uid) {
      return { success: false, error: "UID é obrigatório" };
    }
    const userRef = doc(db, COLLECTION_NAME, uid);
    const userDoc = {
      uid,
      email: userData.email,
      displayName: userData.displayName || userData.email.split("@")[0],
      role: userData.role || "diretoria",
      active: userData.active !== undefined ? userData.active : true,
      createdAt: userData.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: userData.createdBy || null,
    };
    await setDoc(userRef, userDoc, { merge: true });
    return { success: true, data: userDoc };
  } catch (error) {
    console.error("Erro ao definir dados do usuário:", error);
    return { success: false, error: error.message };
  }
}

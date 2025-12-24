// =========================================
// SERVIÇO DE USUÁRIOS
// =========================================
// Funções CRUD para gerenciar usuários no Firestore

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
  Timestamp
} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';

const COLLECTION_NAME = 'users';

/**
 * Busca dados de um usuário específico
 * @param {string} uid - ID do usuário no Firebase Auth
 */
export async function getUserData(uid) {
  try {
    if (!uid) {
      return { success: false, error: 'UID é obrigatório' };
    }

    const userRef = doc(db, COLLECTION_NAME, uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return { success: false, error: 'Usuário não encontrado', notFound: true };
    }

    return {
      success: true,
      data: {
        uid: userDoc.id,
        ...userDoc.data()
      }
    };
  } catch (error) {
    console.error('Erro ao buscar dados do usuário:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca todos os usuários
 */
export async function getAllUsers() {
  try {
    const usersRef = collection(db, COLLECTION_NAME);
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        uid: doc.id,
        ...doc.data()
      });
    });

    return { success: true, data: users };
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Cria um novo usuário (Firebase Auth + Firestore)
 * Apenas admins podem criar usuários
 * @param {Object} userData - Dados do usuário (email, displayName, role)
 * @param {string} password - Senha inicial do usuário
 * @param {string} createdByUid - UID do admin que está criando
 */
export async function createUser(userData, password, createdByUid) {
  try {
    // Validações
    if (!userData.email || !userData.displayName || !userData.role) {
      return { success: false, error: 'Email, nome e role são obrigatórios' };
    }

    if (!password || password.length < 6) {
      return { success: false, error: 'Senha deve ter no mínimo 6 caracteres' };
    }

    if (!['admin', 'profissional', 'diretoria'].includes(userData.role)) {
      return { success: false, error: 'Role inválido' };
    }

    // Criar usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      password
    );

    const newUser = userCredential.user;

    // Criar documento no Firestore
    const userDoc = {
      uid: newUser.uid,
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      active: true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: createdByUid || null
    };

    await setDoc(doc(db, COLLECTION_NAME, newUser.uid), userDoc);

    return {
      success: true,
      data: {
        uid: newUser.uid,
        ...userDoc
      }
    };
  } catch (error) {
    console.error('Erro ao criar usuário:', error);

    // Tratamento de erros específicos
    let errorMessage = 'Erro ao criar usuário';

    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Este email já está em uso';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Email inválido';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Senha muito fraca';
    }

    return { success: false, error: errorMessage };
  }
}

/**
 * Atualiza o role de um usuário
 * @param {string} uid - ID do usuário
 * @param {string} role - Novo role (admin, profissional, diretoria)
 */
export async function updateUserRole(uid, role) {
  try {
    if (!uid) {
      return { success: false, error: 'UID é obrigatório' };
    }

    if (!['admin', 'profissional', 'diretoria'].includes(role)) {
      return { success: false, error: 'Role inválido' };
    }

    const userRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(userRef, {
      role,
      updatedAt: Timestamp.now()
    });

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar role:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Ativa ou desativa um usuário
 * @param {string} uid - ID do usuário
 * @param {boolean} active - true para ativar, false para desativar
 */
export async function toggleUserActive(uid, active) {
  try {
    if (!uid) {
      return { success: false, error: 'UID é obrigatório' };
    }

    const userRef = doc(db, COLLECTION_NAME, uid);
    await updateDoc(userRef, {
      active: !!active,
      updatedAt: Timestamp.now()
    });

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar status do usuário:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Atualiza dados do usuário
 * @param {string} uid - ID do usuário
 * @param {Object} updates - Campos a atualizar
 */
export async function updateUser(uid, updates) {
  try {
    if (!uid) {
      return { success: false, error: 'UID é obrigatório' };
    }

    const userRef = doc(db, COLLECTION_NAME, uid);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now()
    };

    // Não permitir atualizar alguns campos
    delete updateData.uid;
    delete updateData.createdAt;
    delete updateData.createdBy;

    await updateDoc(userRef, updateData);

    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Deleta um usuário (apenas Firestore, não deleta do Auth)
 * @param {string} uid - ID do usuário
 */
export async function deleteUser(uid) {
  try {
    if (!uid) {
      return { success: false, error: 'UID é obrigatório' };
    }

    const userRef = doc(db, COLLECTION_NAME, uid);
    await deleteDoc(userRef);

    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Cria ou atualiza dados do usuário no Firestore
 * Útil para migração ou criação inicial
 * @param {string} uid - ID do usuário
 * @param {Object} userData - Dados do usuário
 */
export async function setUserData(uid, userData) {
  try {
    if (!uid) {
      return { success: false, error: 'UID é obrigatório' };
    }

    const userRef = doc(db, COLLECTION_NAME, uid);
    const userDoc = {
      uid,
      email: userData.email,
      displayName: userData.displayName || userData.email.split('@')[0],
      role: userData.role || 'diretoria',
      active: userData.active !== undefined ? userData.active : true,
      createdAt: userData.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now(),
      createdBy: userData.createdBy || null
    };

    await setDoc(userRef, userDoc, { merge: true });

    return { success: true, data: userDoc };
  } catch (error) {
    console.error('Erro ao definir dados do usuário:', error);
    return { success: false, error: error.message };
  }
}


const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
async function isAdmin(uid) {
  try {
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return false;
    }
    const userData = userDoc.data();
    return userData.role === "admin" && userData.active === true;
  } catch (error) {
    console.error("Erro ao verificar admin:", error);
    return false;
  }
}
async function getUserData(uid) {
  try {
    const userDoc = await admin.firestore().collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return null;
    }
    return userDoc.data();
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return null;
  }
}
exports.deleteUserComplete = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }
  const performerUid = context.auth.uid;
  const { uid } = data;
  if (!uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID do usuário é obrigatório"
    );
  }
  try {
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem deletar usuários"
      );
    }
    if (uid === performerUid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Você não pode deletar sua própria conta"
      );
    }
    const targetUser = await getUserData(uid);
    if (!targetUser) {
      throw new functions.https.HttpsError(
        "not-found",
        "Usuário não encontrado no Firestore"
      );
    }
    if (targetUser.email === "root@esfcatalao.com") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Não é permitido deletar o usuário administrador root"
      );
    }
    try {
      await admin.auth().deleteUser(uid);
      console.log(`Usuário ${uid} deletado do Authentication`);
    } catch (authError) {
      if (authError.code !== "auth/user-not-found") {
        throw authError;
      }
      console.log(
        `Usuário ${uid} não encontrado no Authentication, continuando...`
      );
    }
    await admin.firestore().collection("users").doc(uid).delete();
    console.log(`Usuário ${uid} deletado do Firestore`);
    await admin.firestore().collection("audit_logs").add({
      action: "DELETE_USER",
      performedBy: performerUid,
      targetUser: uid,
      targetEmail: targetUser.email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });
    return {
      success: true,
      message: `Usuário ${targetUser.email} deletado com sucesso`,
    };
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao deletar usuário: ${error.message}`
    );
  }
});
exports.resetUserPassword = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }
  const performerUid = context.auth.uid;
  const { email } = data;
  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email do usuário é obrigatório"
    );
  }
  try {
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem resetar senhas de usuários"
      );
    }
    let targetUser;
    try {
      targetUser = await admin.auth().getUserByEmail(email);
    } catch (authError) {
      if (authError.code === "auth/user-not-found") {
        throw new functions.https.HttpsError(
          "not-found",
          "Usuário não encontrado no Firebase Authentication"
        );
      }
      throw authError;
    }
    const resetLink = await admin.auth().generatePasswordResetLink(email);
    console.log(`Link de reset gerado para ${email}: ${resetLink}`);
    await admin.firestore().collection("audit_logs").add({
      action: "RESET_PASSWORD_EMAIL",
      performedBy: performerUid,
      targetUser: targetUser.uid,
      targetEmail: email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });
    return {
      success: true,
      message: `Email de reset de senha enviado para ${email}`,
      resetLink,
    };
  } catch (error) {
    console.error("Erro ao enviar email de reset:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao enviar email de reset: ${error.message}`
    );
  }
});
exports.setUserPassword = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }
  const performerUid = context.auth.uid;
  const { uid, newPassword } = data;
  if (!uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID do usuário é obrigatório"
    );
  }
  if (!newPassword) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Nova senha é obrigatória"
    );
  }
  if (newPassword.length < 6) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A senha deve ter no mínimo 6 caracteres"
    );
  }
  try {
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem definir senhas de usuários"
      );
    }
    let targetUser;
    try {
      targetUser = await admin.auth().getUser(uid);
    } catch (authError) {
      if (authError.code === "auth/user-not-found") {
        throw new functions.https.HttpsError(
          "not-found",
          "Usuário não encontrado no Firebase Authentication"
        );
      }
      throw authError;
    }
    await admin.auth().updateUser(uid, {
      password: newPassword,
    });
    console.log(`Senha atualizada para usuário ${uid} (${targetUser.email})`);
    await admin.firestore().collection("audit_logs").add({
      action: "SET_PASSWORD_BY_ADMIN",
      performedBy: performerUid,
      targetUser: uid,
      targetEmail: targetUser.email,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });
    return {
      success: true,
      message: `Senha atualizada com sucesso para ${targetUser.email}`,
    };
  } catch (error) {
    console.error("Erro ao definir senha:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao definir senha: ${error.message}`
    );
  }
});
exports.createUserComplete = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }
  const performerUid = context.auth.uid;
  const { email, displayName, password, role } = data;
  if (!email || !displayName || !password || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email, nome, senha e role são obrigatórios"
    );
  }
  if (password.length < 6) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "A senha deve ter no mínimo 6 caracteres"
    );
  }
  const validRoles = ["admin", "profissional", "diretoria", "supervisor"];
  if (!validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Role inválido. Valores permitidos: ${validRoles.join(", ")}`
    );
  }
  try {
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem criar usuários"
      );
    }
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });
    console.log(`Usuário criado no Authentication: ${userRecord.uid}`);
    const userDoc = {
      uid: userRecord.uid,
      email,
      displayName,
      role,
      active: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      createdBy: performerUid,
    };
    await admin
      .firestore()
      .collection("users")
      .doc(userRecord.uid)
      .set(userDoc);
    console.log(`Usuário criado no Firestore: ${userRecord.uid}`);
    await admin.firestore().collection("audit_logs").add({
      action: "CREATE_USER",
      performedBy: performerUid,
      targetUser: userRecord.uid,
      targetEmail: email,
      targetRole: role,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });
    return {
      success: true,
      uid: userRecord.uid,
      message: `Usuário ${email} criado com sucesso`,
    };
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    if (error.code === "auth/email-already-exists") {
      throw new functions.https.HttpsError(
        "already-exists",
        "Este email já está em uso"
      );
    } else if (error.code === "auth/invalid-email") {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Email inválido"
      );
    }
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao criar usuário: ${error.message}`
    );
  }
});
exports.updateUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }
  const performerUid = context.auth.uid;
  const { uid, role } = data;
  if (!uid || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID e role são obrigatórios"
    );
  }
  const validRoles = ["admin", "profissional", "diretoria", "supervisor"];
  if (!validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Role inválido. Valores permitidos: ${validRoles.join(", ")}`
    );
  }
  try {
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem atualizar roles de usuários"
      );
    }
    if (uid === performerUid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Você não pode modificar seu próprio role"
      );
    }
    const targetUser = await getUserData(uid);
    if (!targetUser) {
      throw new functions.https.HttpsError(
        "not-found",
        "Usuário não encontrado no Firestore"
      );
    }
    if (targetUser.email === "root@esfcatalao.com") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Não é permitido modificar o role do usuário root"
      );
    }
    await admin.firestore().collection("users").doc(uid).update({
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`Role atualizado para ${uid}: ${targetUser.role} -> ${role}`);
    await admin.firestore().collection("audit_logs").add({
      action: "UPDATE_USER_ROLE",
      performedBy: performerUid,
      targetUser: uid,
      targetEmail: targetUser.email,
      oldRole: targetUser.role,
      newRole: role,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });
    return {
      success: true,
      message: `Role atualizado com sucesso para ${targetUser.email}`,
    };
  } catch (error) {
    console.error("Erro ao atualizar role:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao atualizar role: ${error.message}`
    );
  }
});
exports.updateUserEmail = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }
  const performerUid = context.auth.uid;
  const { uid, newEmail } = data;
  if (!uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID do usuário é obrigatório"
    );
  }
  if (!newEmail) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Novo email é obrigatório"
    );
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    throw new functions.https.HttpsError("invalid-argument", "Email inválido");
  }
  try {
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem atualizar emails de usuários"
      );
    }
    if (uid === performerUid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Use o perfil para atualizar seu próprio email"
      );
    }
    const targetUser = await getUserData(uid);
    if (!targetUser) {
      throw new functions.https.HttpsError(
        "not-found",
        "Usuário não encontrado"
      );
    }
    if (targetUser.email === "root@esfcatalao.com") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Não é permitido modificar o email do usuário root"
      );
    }
    const oldEmail = targetUser.email;
    await admin.auth().updateUser(uid, {
      email: newEmail,
    });
    console.log(`Email atualizado no Auth: ${oldEmail} -> ${newEmail}`);
    await admin.firestore().collection("users").doc(uid).update({
      email: newEmail,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`Email atualizado no Firestore: ${uid}`);
    await admin.firestore().collection("audit_logs").add({
      action: "UPDATE_USER_EMAIL",
      performedBy: performerUid,
      targetUser: uid,
      oldEmail,
      newEmail,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });
    return {
      success: true,
      message: `Email atualizado com sucesso: ${oldEmail} -> ${newEmail}`,
    };
  } catch (error) {
    console.error("Erro ao atualizar email:", error);
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }
    if (error.code === "auth/email-already-exists") {
      throw new functions.https.HttpsError(
        "already-exists",
        "Este email já está em uso"
      );
    }
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao atualizar email: ${error.message}`
    );
  }
});

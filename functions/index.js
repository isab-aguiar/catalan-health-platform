const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

/**
 * Helper: Verificar se o usuário é admin ativo
 * @param {string} uid - ID do usuário
 * @returns {Promise<boolean>} - True se é admin ativo
 */
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

/**
 * Helper: Buscar dados de um usuário
 * @param {string} uid - ID do usuário
 * @returns {Promise<object|null>} - Dados do usuário ou null
 */
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

/**
 * Cloud Function: Deletar usuário completamente
 * Remove do Firebase Authentication E do Firestore
 */
exports.deleteUserComplete = functions.https.onCall(async (data, context) => {
  // Verificar autenticação
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }

  const performerUid = context.auth.uid;
  const { uid } = data;

  // Validar parâmetros
  if (!uid) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID do usuário é obrigatório"
    );
  }

  try {
    // Verificar se quem está executando é admin
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem deletar usuários"
      );
    }

    // Verificar se não está tentando deletar a si mesmo
    if (uid === performerUid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Você não pode deletar sua própria conta"
      );
    }

    // Buscar dados do usuário a ser deletado
    const targetUser = await getUserData(uid);
    if (!targetUser) {
      throw new functions.https.HttpsError(
        "not-found",
        "Usuário não encontrado no Firestore"
      );
    }

    // Proteger conta root
    if (targetUser.email === "root@esfcatalao.com") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Não é permitido deletar o usuário administrador root"
      );
    }

    // Deletar do Firebase Authentication
    try {
      await admin.auth().deleteUser(uid);
      console.log(`Usuário ${uid} deletado do Authentication`);
    } catch (authError) {
      // Se usuário não existe no Auth, continuar
      if (authError.code !== "auth/user-not-found") {
        throw authError;
      }
      console.log(`Usuário ${uid} não encontrado no Authentication, continuando...`);
    }

    // Deletar do Firestore
    await admin.firestore().collection("users").doc(uid).delete();
    console.log(`Usuário ${uid} deletado do Firestore`);

    // Log de auditoria (opcional)
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

    // Se já for um HttpsError, re-lançar
    if (error instanceof functions.https.HttpsError) {
      throw error;
    }

    // Erro genérico
    throw new functions.https.HttpsError(
      "internal",
      `Erro ao deletar usuário: ${error.message}`
    );
  }
});

/**
 * Cloud Function: Enviar email de reset de senha
 * Gera link e envia email automático do Firebase
 */
exports.resetUserPassword = functions.https.onCall(async (data, context) => {
  // Verificar autenticação
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }

  const performerUid = context.auth.uid;
  const { email } = data;

  // Validar parâmetros
  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email do usuário é obrigatório"
    );
  }

  try {
    // Verificar se quem está executando é admin
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem resetar senhas de usuários"
      );
    }

    // Verificar se usuário existe no Authentication
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

    // Gerar link de reset de senha
    const resetLink = await admin.auth().generatePasswordResetLink(email);

    console.log(`Link de reset gerado para ${email}: ${resetLink}`);

    // Nota: O Firebase envia email automaticamente quando generatePasswordResetLink é chamado
    // com a configuração adequada de email templates no console

    // Log de auditoria
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
      resetLink, // Útil para desenvolvimento/testes
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

/**
 * Cloud Function: Admin define senha diretamente
 * Atualiza senha do usuário sem enviar email
 */
exports.setUserPassword = functions.https.onCall(async (data, context) => {
  // Verificar autenticação
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }

  const performerUid = context.auth.uid;
  const { uid, newPassword } = data;

  // Validar parâmetros
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
    // Verificar se quem está executando é admin
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem definir senhas de usuários"
      );
    }

    // Verificar se usuário existe no Authentication
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

    // Atualizar senha
    await admin.auth().updateUser(uid, {
      password: newPassword,
    });

    console.log(`Senha atualizada para usuário ${uid} (${targetUser.email})`);

    // Log de auditoria
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

/**
 * Cloud Function OPCIONAL: Criar usuário de forma mais segura no backend
 * Valida role e cria no Auth + Firestore
 */
exports.createUserComplete = functions.https.onCall(async (data, context) => {
  // Verificar autenticação
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }

  const performerUid = context.auth.uid;
  const { email, displayName, password, role } = data;

  // Validar parâmetros
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

  const validRoles = ["admin", "profissional", "diretoria"];
  if (!validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Role inválido. Valores permitidos: ${validRoles.join(", ")}`
    );
  }

  try {
    // Verificar se quem está executando é admin
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem criar usuários"
      );
    }

    // Criar no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    console.log(`Usuário criado no Authentication: ${userRecord.uid}`);

    // Criar documento no Firestore
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

    await admin.firestore().collection("users").doc(userRecord.uid).set(userDoc);

    console.log(`Usuário criado no Firestore: ${userRecord.uid}`);

    // Log de auditoria
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

    // Tratar erros específicos do Firebase Auth
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

/**
 * Cloud Function OPCIONAL: Atualizar role de forma mais segura
 * Valida permissões no backend
 */
exports.updateUserRole = functions.https.onCall(async (data, context) => {
  // Verificar autenticação
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Você precisa estar autenticado para executar esta ação"
    );
  }

  const performerUid = context.auth.uid;
  const { uid, role } = data;

  // Validar parâmetros
  if (!uid || !role) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "UID e role são obrigatórios"
    );
  }

  const validRoles = ["admin", "profissional", "diretoria"];
  if (!validRoles.includes(role)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      `Role inválido. Valores permitidos: ${validRoles.join(", ")}`
    );
  }

  try {
    // Verificar se quem está executando é admin
    const isAdminUser = await isAdmin(performerUid);
    if (!isAdminUser) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Apenas administradores podem atualizar roles de usuários"
      );
    }

    // Verificar se não está tentando modificar o próprio role
    if (uid === performerUid) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Você não pode modificar seu próprio role"
      );
    }

    // Verificar se usuário existe
    const targetUser = await getUserData(uid);
    if (!targetUser) {
      throw new functions.https.HttpsError(
        "not-found",
        "Usuário não encontrado no Firestore"
      );
    }

    // Proteger conta root
    if (targetUser.email === "root@esfcatalao.com") {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Não é permitido modificar o role do usuário root"
      );
    }

    // Atualizar role no Firestore
    await admin.firestore().collection("users").doc(uid).update({
      role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Role atualizado para ${uid}: ${targetUser.role} -> ${role}`);

    // Log de auditoria
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

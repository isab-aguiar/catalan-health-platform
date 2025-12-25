// =========================================
// SCRIPT PARA CRIAR USUÁRIO ADMIN NO FIRESTORE
// =========================================
// Este script cria o documento do usuário Admin no Firestore
// IMPORTANTE: Você deve criar o usuário no Firebase Authentication primeiro!
//
// Execute: node --env-file=../.env scripts/criar-admin-firestore.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

// ✅ CONFIGURAÇÃO DO FIREBASE (usando variáveis de ambiente)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Validar variáveis de ambiente
if (!firebaseConfig.apiKey) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  console.error('Execute: node --env-file=../.env scripts/criar-admin-firestore.js');
  process.exit(1);
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// DADOS DO ADMINISTRADOR
// ============================================

const ADMIN_UID = "DLtg8Ik1cOSycUmdGUVnun7Mmur2"; // UID do Firebase Authentication
const ADMIN_EMAIL = "root@esfcatalao.com";
const ADMIN_NOME = "Administrador ESF Catalão";

// ============================================
// FUNÇÃO PRINCIPAL
// ============================================

async function criarAdminNoFirestore() {
  try {
    console.log('🚀 Iniciando criação do usuário Admin no Firestore...\n');
    console.log('📋 Dados do Admin:');
    console.log(`   UID: ${ADMIN_UID}`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Nome: ${ADMIN_NOME}\n`);

    // Referência ao documento do usuário
    const userRef = doc(db, 'users', ADMIN_UID);

    // Verificar se já existe
    console.log('🔍 Verificando se o usuário já existe...');
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      console.log('⚠️  Usuário Admin já existe no Firestore!');
      console.log('📄 Dados atuais:');
      console.log(JSON.stringify(docSnap.data(), null, 2));
      console.log('\n❓ Deseja sobrescrever? (Ctrl+C para cancelar, Enter para continuar)');

      // Aguardar confirmação
      await new Promise((resolve) => {
        process.stdin.once('data', () => resolve());
      });
    }

    // Dados do Admin para o Firestore
    const adminData = {
      uid: ADMIN_UID,
      email: ADMIN_EMAIL,
      displayName: ADMIN_NOME,
      nome: ADMIN_NOME,
      role: 'admin',
      active: true,
      emailVerified: true,
      photoURL: null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      permissions: {
        users: { create: true, read: true, update: true, delete: true },
        avisos: { create: true, read: true, update: true, delete: true },
        campanhas: { create: true, read: true, update: true, delete: true }
      }
    };

    // Criar/atualizar documento
    console.log('\n💾 Salvando usuário Admin no Firestore...');
    await setDoc(userRef, adminData);

    console.log('\n✅ SUCESSO! Usuário Admin criado no Firestore!');
    console.log('\n📊 Documento criado em: users/' + ADMIN_UID);
    console.log('\n🎉 Agora você pode fazer login com:');
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Senha: (a senha que você definiu no Firebase Authentication)`);
    console.log('\n⚠️  LEMBRE-SE:');
    console.log('   1. O usuário deve existir no Firebase Authentication');
    console.log('   2. Use o mesmo UID nos dois lugares');
    console.log('   3. Configure as regras do Firestore e Storage no console');

    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERRO ao criar usuário Admin:', error);
    console.error('Detalhes:', error.message);
    process.exit(1);
  }
}

// ============================================
// EXECUTAR
// ============================================

console.log('═══════════════════════════════════════════════════════');
console.log('  CRIAR USUÁRIO ADMIN NO FIRESTORE');
console.log('  Projeto: ' + firebaseConfig.projectId);
console.log('═══════════════════════════════════════════════════════\n');

criarAdminNoFirestore();

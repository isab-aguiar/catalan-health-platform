// =========================================
// SCRIPT PARA CRIAR USUÁRIO PROFISSIONAL NO FIRESTORE
// =========================================
// Execute: node --env-file=../.env scripts/criar-usuario-profissional.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

if (!firebaseConfig.apiKey) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// CONFIGURAÇÃO DO USUÁRIO PROFISSIONAL
// ============================================
// IMPORTANTE: Altere o UID para o UID real gerado no Firebase Authentication

const PROFISSIONAL_UID = "5Uf8QyVcsih0KktUW2eipWKw0af2";
const PROFISSIONAL_EMAIL = "profissional@esfcatalao.com";
const PROFISSIONAL_NOME = "ESF Profissional";

async function criarUsuarioProfissional() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  CRIAR USUÁRIO PROFISSIONAL NO FIRESTORE');
    console.log('  Projeto: ' + firebaseConfig.projectId);
    console.log('═══════════════════════════════════════════════════════\n');

    if (PROFISSIONAL_UID === "COLE_O_UID_AQUI") {
      console.error('❌ ERRO: Você precisa definir o UID do usuário!');
      console.error('\n📝 PASSOS:');
      console.error('1. Crie o usuário no Firebase Authentication');
      console.error('2. Copie o UID gerado');
      console.error('3. Cole o UID na variável PROFISSIONAL_UID neste script');
      console.error('4. Execute novamente\n');
      process.exit(1);
    }

    console.log('📋 Dados do Profissional:');
    console.log(`   UID: ${PROFISSIONAL_UID}`);
    console.log(`   Email: ${PROFISSIONAL_EMAIL}`);
    console.log(`   Nome: ${PROFISSIONAL_NOME}\n`);

    const userRef = doc(db, 'users', PROFISSIONAL_UID);

    const profissionalData = {
      uid: PROFISSIONAL_UID,
      email: PROFISSIONAL_EMAIL,
      displayName: PROFISSIONAL_NOME,
      nome: PROFISSIONAL_NOME,
      role: 'profissional',
      active: true,
      emailVerified: true,
      photoURL: null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      permissions: {
        users: { create: false, read: true, update: false, delete: false },
        avisos: { create: true, read: true, update: true, delete: true }, // Apenas os próprios
        campanhas: { create: true, read: true, update: true, delete: false } // Apenas as próprias
      }
    };

    console.log('💾 Salvando usuário Profissional no Firestore...');
    await setDoc(userRef, profissionalData);

    console.log('\n✅ SUCESSO! Usuário Profissional criado!');
    console.log('\n🎉 Login:');
    console.log(`   Email: ${PROFISSIONAL_EMAIL}`);
    console.log(`   Role: profissional (pode criar e editar APENAS os próprios avisos/campanhas)`);

    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    process.exit(1);
  }
}

criarUsuarioProfissional();

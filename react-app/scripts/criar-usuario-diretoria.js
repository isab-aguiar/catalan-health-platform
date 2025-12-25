// =========================================
// SCRIPT PARA CRIAR USUÁRIO DA DIRETORIA NO FIRESTORE
// =========================================
// Execute: node --env-file=../.env scripts/criar-usuario-diretoria.js

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
// CONFIGURAÇÃO DO USUÁRIO DA DIRETORIA
// ============================================
// IMPORTANTE: Altere o UID para o UID real gerado no Firebase Authentication

const DIRETORIA_UID = "Z37PXqvcEZMfNatgmio3dhY8XQR2";
const DIRETORIA_EMAIL = "diretoria@esfcatalao.com";
const DIRETORIA_NOME = "ESF Diretoria";

async function criarUsuarioDiretoria() {
  try {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  CRIAR USUÁRIO DIRETORIA NO FIRESTORE');
    console.log('  Projeto: ' + firebaseConfig.projectId);
    console.log('═══════════════════════════════════════════════════════\n');

    if (DIRETORIA_UID === "COLE_O_UID_AQUI") {
      console.error('❌ ERRO: Você precisa definir o UID do usuário!');
      console.error('\n📝 PASSOS:');
      console.error('1. Crie o usuário no Firebase Authentication');
      console.error('2. Copie o UID gerado');
      console.error('3. Cole o UID na variável DIRETORIA_UID neste script');
      console.error('4. Execute novamente\n');
      process.exit(1);
    }

    console.log('📋 Dados da Diretoria:');
    console.log(`   UID: ${DIRETORIA_UID}`);
    console.log(`   Email: ${DIRETORIA_EMAIL}`);
    console.log(`   Nome: ${DIRETORIA_NOME}\n`);

    const userRef = doc(db, 'users', DIRETORIA_UID);

    const diretoriaData = {
      uid: DIRETORIA_UID,
      email: DIRETORIA_EMAIL,
      displayName: DIRETORIA_NOME,
      nome: DIRETORIA_NOME,
      role: 'diretoria',
      active: true,
      emailVerified: true,
      photoURL: null,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      lastLogin: Timestamp.now(),
      permissions: {
        users: { create: false, read: true, update: false, delete: false },
        avisos: { create: false, read: true, update: false, delete: false },
        campanhas: { create: false, read: true, update: false, delete: false }
      }
    };

    console.log('💾 Salvando usuário Diretoria no Firestore...');
    await setDoc(userRef, diretoriaData);

    console.log('\n✅ SUCESSO! Usuário Diretoria criado!');
    console.log('\n🎉 Login:');
    console.log(`   Email: ${DIRETORIA_EMAIL}`);
    console.log(`   Role: diretoria (pode LER tudo, mas NÃO pode criar/editar/excluir)`);

    process.exit(0);

  } catch (error) {
    console.error('\n❌ ERRO:', error.message);
    process.exit(1);
  }
}

criarUsuarioDiretoria();

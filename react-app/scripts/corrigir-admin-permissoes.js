// =========================================
// SCRIPT PARA CORRIGIR PERMISSÕES DO ADMIN
// =========================================
// Execute este script para garantir permissões do administrador

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

// SUAS CREDENCIAIS DO FIREBASE
// Copie do arquivo firebase.js
const firebaseConfig = {
  apiKey: "sua_api_key_aqui",
  authDomain: "seu_projeto.firebaseapp.com",
  projectId: "seu_projeto_id",
  storageBucket: "seu_projeto.appspot.com",
  messagingSenderId: "seu_id",
  appId: "seu_app_id"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DADOS DO ADMINISTRADOR
const ADMIN_DATA = {
  uid: "Z37PXqvcEZMfNatgmio3dhY8XQR2",
  email: "root@esfcatalao.com",
  displayName: "Administrador",
  role: "admin",
  active: true
};

async function corrigirPermissoesAdmin() {
  try {
    console.log('🔧 Iniciando correção de permissões...\n');
    
    const userRef = doc(db, 'users', ADMIN_DATA.uid);
    
    // Verificar se o documento existe
    console.log('📋 Verificando documento atual...');
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      console.log('✅ Documento encontrado!');
      console.log('Dados atuais:', docSnap.data());
      console.log('');
    } else {
      console.log('⚠️  Documento não existe. Será criado.\n');
    }
    
    // Criar/atualizar documento com permissões corretas
    console.log('💾 Salvando permissões corretas...');
    
    const adminDoc = {
      uid: ADMIN_DATA.uid,
      email: ADMIN_DATA.email,
      displayName: ADMIN_DATA.displayName,
      role: ADMIN_DATA.role,
      active: ADMIN_DATA.active,
      createdAt: docSnap.exists() ? docSnap.data().createdAt : Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(userRef, adminDoc, { merge: true });
    
    console.log('✅ Permissões corrigidas com sucesso!\n');
    console.log('📄 Dados salvos:');
    console.log('   Email:', adminDoc.email);
    console.log('   Nome:', adminDoc.displayName);
    console.log('   Role:', adminDoc.role);
    console.log('   Ativo:', adminDoc.active);
    console.log('');
    console.log('🎉 PRONTO! Agora:');
    console.log('   1. Faça LOGOUT do sistema');
    console.log('   2. Faça LOGIN novamente');
    console.log('   3. Teste "Gerenciar Avisos"');
    console.log('');
    
  } catch (error) {
    console.error('❌ Erro ao corrigir permissões:', error);
    console.error('\nVerifique:');
    console.error('1. Credenciais do Firebase estão corretas no script');
    console.error('2. Você tem permissão de escrita no Firestore');
    console.error('3. As regras do Firestore permitem escrita');
  }
}

// Executar
corrigirPermissoesAdmin();


// =========================================
// SCRIPT PARA CORRIGIR PERMISSÕES DO ADMIN AUTOMATICAMENTE
// =========================================
// Execute: node scripts/corrigir-admin-automatico.js

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';

// ✅ CONFIGURAÇÃO DO FIREBASE
// IMPORTANTE: Configure as variáveis de ambiente no arquivo .env
// Execute: node --env-file=../.env scripts/corrigir-admin-automatico.js
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Validar que as variáveis de ambiente estão configuradas
if (!firebaseConfig.apiKey) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  console.error('Execute o script com: node --env-file=../.env scripts/corrigir-admin-automatico.js');
  process.exit(1);
}

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DADOS DO ADMINISTRADOR
// Se você souber seu UID, substitua aqui. Caso contrário, o script tentará encontrar pelo email
const ADMIN_EMAIL = "root@esfcatalao.com";
const ADMIN_UID = "c7QFLlMEMmWBZvvkibp1Q8oFRfj1"; // UID do admin

async function corrigirPermissoesAdmin() {
  try {
    console.log('🔧 Iniciando correção de permissões...\n');
    console.log('📋 Configuração do Firebase:');
    console.log('   Project ID:', firebaseConfig.projectId);
    console.log('   Auth Domain:', firebaseConfig.authDomain);
    console.log('');
    
    const userRef = doc(db, 'users', ADMIN_UID);
    
    // Verificar se o documento existe
    console.log('📋 Verificando documento do usuário...');
    console.log('   UID:', ADMIN_UID);
    console.log('   Email:', ADMIN_EMAIL);
    console.log('');
    
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      console.log('✅ Documento encontrado!');
      const currentData = docSnap.data();
      console.log('📄 Dados atuais:');
      console.log('   Email:', currentData.email || 'não definido');
      console.log('   Nome:', currentData.displayName || 'não definido');
      console.log('   Role:', currentData.role || 'não definido');
      console.log('   Ativo:', currentData.active !== undefined ? currentData.active : 'não definido');
      console.log('');
    } else {
      console.log('⚠️  Documento não existe. Será criado.\n');
    }
    
    // Criar/atualizar documento com permissões corretas
    console.log('💾 Salvando permissões corretas...');
    
    const existingData = docSnap.exists() ? docSnap.data() : {};
    
    const adminDoc = {
      uid: ADMIN_UID,
      email: ADMIN_EMAIL,
      displayName: existingData.displayName || "Administrador",
      role: "admin", // IMPORTANTE: definir como admin
      active: true,  // IMPORTANTE: definir como ativo
      createdAt: existingData.createdAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    await setDoc(userRef, adminDoc, { merge: true });
    
    console.log('✅ Permissões corrigidas com sucesso!\n');
    console.log('📄 Dados salvos:');
    console.log('   UID:', adminDoc.uid);
    console.log('   Email:', adminDoc.email);
    console.log('   Nome:', adminDoc.displayName);
    console.log('   Role:', adminDoc.role, '← ADMIN');
    console.log('   Ativo:', adminDoc.active, '← TRUE');
    console.log('');
    console.log('🎉 PRONTO! Agora:');
    console.log('   1. Faça LOGOUT do sistema');
    console.log('   2. Limpe o cache do navegador (Ctrl + Shift + Delete)');
    console.log('   3. Faça LOGIN novamente');
    console.log('   4. Teste as permissões de admin');
    console.log('');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Erro ao corrigir permissões:', error);
    console.error('\nVerifique:');
    console.error('1. Variáveis de ambiente do Firebase estão configuradas');
    console.error('2. Você tem permissão de escrita no Firestore');
    console.error('3. As regras do Firestore permitem escrita');
    console.error('4. O UID do admin está correto');
    console.error('\nErro completo:', error.message);
    process.exit(1);
  }
}

// Executar
corrigirPermissoesAdmin();


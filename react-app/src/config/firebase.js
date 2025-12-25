// =========================================
// CONFIGURAÇÃO DO FIREBASE
// =========================================
// Este arquivo conecta seu app React ao Firebase usando variáveis de ambiente
// As configurações estão no arquivo .env (mais seguro!)

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// ✅ CONFIGURAÇÕES DO FIREBASE (usando variáveis de ambiente)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validação das variáveis de ambiente
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(
  varName => !import.meta.env[varName] || import.meta.env[varName].trim() === ''
);

if (missingVars.length > 0) {
  console.error('❌ Variáveis de ambiente do Firebase não configuradas:', missingVars);
  console.error('⚠️ Configure as variáveis de ambiente na Vercel ou no arquivo .env');
  console.error('📖 Veja react-app/docs/CONFIGURACAO-ENV.md para mais informações');
}

// Validação adicional: verifica se as variáveis não são apenas espaços ou valores inválidos
const isValidConfig = missingVars.length === 0 && 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'undefined';

// Inicializa o Firebase apenas se todas as variáveis estiverem definidas
let app;
let auth;
let db;
let storage;

try {
  if (isValidConfig) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    console.log('✅ Firebase inicializado com sucesso');
  } else {
    // Cria objetos mock para evitar erros durante o desenvolvimento
    console.warn('⚠️ Firebase não inicializado - variáveis de ambiente ausentes ou inválidas');
    console.warn('Configuração atual:', {
      apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'ausente',
      projectId: firebaseConfig.projectId || 'ausente',
      authDomain: firebaseConfig.authDomain || 'ausente'
    });
  }
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
  console.error('Detalhes do erro:', {
    code: error.code,
    message: error.message,
    stack: error.stack
  });
}

// Exporta os serviços que vamos usar
export { auth, db, storage };
export default app;


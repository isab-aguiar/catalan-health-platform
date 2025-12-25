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
  console.error('⚠️ Configure as variáveis de ambiente:');
  console.error('   1. Crie um arquivo .env na raiz do projeto (react-app/.env)');
  console.error('   2. Ou configure na Vercel: Settings > Environment Variables');
  console.error('   3. Adicione todas as variáveis VITE_FIREBASE_* necessárias');
  console.error('');
  console.error('📖 Como obter as credenciais:');
  console.error('   1. Acesse https://console.firebase.google.com');
  console.error('   2. Selecione seu projeto');
  console.error('   3. Vá em Project Settings (ícone de engrenagem)');
  console.error('   4. Na seção "Your apps", copie as credenciais do SDK');
}

// Valida formato da API key se estiver presente
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'undefined') {
  if (!firebaseConfig.apiKey.startsWith('AIza') && !firebaseConfig.apiKey.startsWith('ya29')) {
    console.warn('⚠️ A API Key do Firebase parece estar em formato inválido');
    console.warn('   A API Key geralmente começa com "AIza..."');
    console.warn('   Verifique se copiou a chave correta do Firebase Console');
  }
}

// Validação adicional: verifica se as variáveis não são apenas espaços ou valores inválidos
const isValidConfig = missingVars.length === 0 && 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== 'undefined' &&
  firebaseConfig.apiKey.trim() !== '' &&
  !firebaseConfig.apiKey.includes('sua_api_key') &&
  !firebaseConfig.apiKey.includes('your_api_key') &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== 'undefined' &&
  firebaseConfig.projectId.trim() !== '';

// Valida formato básico da API key (começa com AIza...)
const hasValidApiKeyFormat = firebaseConfig.apiKey && 
  (firebaseConfig.apiKey.startsWith('AIza') || firebaseConfig.apiKey.startsWith('ya29'));

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
    console.log('   Project ID:', firebaseConfig.projectId);
  } else {
    // Cria objetos mock para evitar erros durante o desenvolvimento
    console.warn('⚠️ Firebase não inicializado - variáveis de ambiente ausentes ou inválidas');
    console.warn('Configuração atual:', {
      apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 15)}...` : 'ausente',
      projectId: firebaseConfig.projectId || 'ausente',
      authDomain: firebaseConfig.authDomain || 'ausente'
    });
    
    if (firebaseConfig.apiKey && (firebaseConfig.apiKey.includes('sua_api_key') || firebaseConfig.apiKey.includes('your_api_key'))) {
      console.error('❌ Você está usando valores de exemplo! Substitua pelas suas credenciais reais do Firebase.');
    }
  }
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
  
  // Tratamento específico para erro de API key
  if (error.code === 'auth/invalid-api-key' || error.message?.includes('API key') || error.message?.includes('INVALID_ARGUMENT')) {
    console.error('');
    console.error('🔑 ERRO DE API KEY INVÁLIDA');
    console.error('   A API Key configurada não é válida ou não tem permissões.');
    console.error('');
    console.error('📋 Passos para resolver:');
    console.error('   1. Acesse: https://console.firebase.google.com');
    console.error('   2. Selecione seu projeto');
    console.error('   3. Vá em: Project Settings (⚙️) > General');
    console.error('   4. Na seção "Your apps", encontre sua Web App');
    console.error('   5. Copie o valor do campo "apiKey"');
    console.error('   6. Verifique se a API Key está habilitada para Authentication');
    console.error('');
    console.error('   7. Atualize a variável VITE_FIREBASE_API_KEY no arquivo .env ou na Vercel');
    console.error('');
    console.error('   Formato esperado no .env:');
    console.error('   VITE_FIREBASE_API_KEY=AIzaSy...');
  } else {
    console.error('Detalhes do erro:', {
      code: error.code,
      message: error.message
    });
  }
}

// Exporta os serviços que vamos usar
export { auth, db, storage };
export default app;


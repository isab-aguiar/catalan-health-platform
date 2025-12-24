// =========================================
// CONFIGURAÇÃO DO FIREBASE
// =========================================
// Este arquivo conecta seu app React ao Firebase usando variáveis de ambiente
// As configurações estão no arquivo .env (mais seguro!)

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ✅ CONFIGURAÇÕES DO FIREBASE (usando variáveis de ambiente)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Exporta os serviços que vamos usar
export const auth = getAuth(app);  // Para autenticação (login/logout)
export const db = getFirestore(app);  // Para banco de dados (usaremos na Etapa 2)

export default app;


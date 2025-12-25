import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function loadEnv() {
  const envPaths = [
    join(__dirname, '..', '.env'),
    join(__dirname, '..', '..', '.env'),
    join(process.cwd(), '.env')
  ];
  for (const envPath of envPaths) {
    try {
      const envContent = readFileSync(envPath, 'utf-8');
      const envVars = {};
      envContent.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            envVars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
          }
        }
      });
      return envVars;
    } catch (err) {
      // Continuar tentando outros caminhos
    }
  }
  return {};
}
// Carregar variáveis de ambiente
const envVars = loadEnv();
// ✅ CONFIGURAÇÃO DO FIREBASE (usando variáveis de ambiente)
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || envVars.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || envVars.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || envVars.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || envVars.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || envVars.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || envVars.VITE_FIREBASE_APP_ID
};
// Validar variáveis de ambiente
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ ERRO: Variáveis de ambiente não configuradas!');
  console.error('Certifique-se de que o arquivo .env existe em react-app/.env ou na raiz do projeto');
  console.error('\nVariáveis necessárias:');
  console.error('  VITE_FIREBASE_API_KEY');
  console.error('  VITE_FIREBASE_AUTH_DOMAIN');
  console.error('  VITE_FIREBASE_PROJECT_ID');
  console.error('  VITE_FIREBASE_STORAGE_BUCKET');
  console.error('  VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.error('  VITE_FIREBASE_APP_ID');
  process.exit(1);
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ADMIN_UID = "c7QFLlMEMmWBZvvkibp1Q8oFRfj1"; 
const ADMIN_EMAIL = "root@esfcatalao.com"; 
const ADMIN_NOME = "Administrador ESF Catalão"; 
async function criarAdminNoFirestore() {
  try {
    console.log('🚀 Iniciando criação do usuário Admin no Firestore...\n');
    console.log('📋 Dados do Admin:');
    console.log(`   UID: ${ADMIN_UID}`);
    console.log(`   Email: ${ADMIN_EMAIL}`);
    console.log(`   Nome: ${ADMIN_NOME}\n`);
    const userRef = doc(db, 'users', ADMIN_UID);
    console.log('🔍 Verificando se o usuário já existe...');
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log('⚠️  Usuário Admin já existe no Firestore!');
      console.log('📄 Dados atuais:');
      console.log(JSON.stringify(docSnap.data(), null, 2));
      console.log('\n❓ Deseja sobrescrever? (Ctrl+C para cancelar, Enter para continuar)');
      await new Promise((resolve) => {
        process.stdin.once('data', () => resolve());
      });
    }
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
console.log('═══════════════════════════════════════════════════════');
console.log('  CRIAR USUÁRIO ADMIN NO FIRESTORE');
console.log('  Projeto: ' + firebaseConfig.projectId);
console.log('═══════════════════════════════════════════════════════\n');
criarAdminNoFirestore();

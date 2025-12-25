// =========================================
// SCRIPT PARA UPLOAD DE VACINAS PARA FIRESTORE
// =========================================
// Execute este script para fazer upload de todas as vacinas do arquivo vacinas-sus.js
// para o Firestore. Os dados podem ser editados depois através do painel admin.

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, Timestamp, collection, getDocs } from 'firebase/firestore';
import { vacinas2025 } from '../src/data/vacinas-sus.js';

// ✅ CONFIGURAÇÕES DO FIREBASE
// IMPORTANTE: Configure as variáveis de ambiente no arquivo .env
// Execute: node --env-file=.env scripts/upload-vacinas-firestore.js
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
  console.error('');
  console.error('📝 INSTRUÇÕES:');
  console.error('   1. Certifique-se de ter um arquivo .env na pasta react-app/');
  console.error('   2. Execute o script com: node --env-file=.env scripts/upload-vacinas-firestore.js');
  console.error('   3. Ou use: npm run upload:vacinas');
  console.error('');
  console.error('📋 Variáveis necessárias no .env:');
  console.error('   VITE_FIREBASE_API_KEY');
  console.error('   VITE_FIREBASE_AUTH_DOMAIN');
  console.error('   VITE_FIREBASE_PROJECT_ID');
  console.error('   VITE_FIREBASE_STORAGE_BUCKET');
  console.error('   VITE_FIREBASE_MESSAGING_SENDER_ID');
  console.error('   VITE_FIREBASE_APP_ID');
  console.error('');
  process.exit(1);
}

// Nome da coleção no Firestore
const COLLECTION_NAME = 'vacinas';

// Credenciais do admin (para autenticação)
// Você pode configurar via variáveis de ambiente ou usar valores padrão
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'root@esfcatalao.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// Inicializar Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error);
  process.exit(1);
}

/**
 * Autentica com um usuário admin
 */
async function autenticarAdmin() {
  try {
    if (!ADMIN_PASSWORD) {
      console.error('❌ ERRO: Senha do admin não configurada!');
      console.error('');
      console.error('📝 Configure a senha do admin de uma das formas:');
      console.error('   1. Adicione no arquivo .env:');
      console.error('      ADMIN_EMAIL=root@esfcatalao.com');
      console.error('      ADMIN_PASSWORD=sua_senha_aqui');
      console.error('');
      console.error('   2. Ou exporte as variáveis antes de executar:');
      console.error('      export ADMIN_PASSWORD=sua_senha');
      console.error('');
      process.exit(1);
    }

    console.log('🔐 Autenticando como admin...');
    
    const userCredential = await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('✅ Autenticação realizada com sucesso!\n');
    
    // Aguardar um pouco para garantir que a autenticação foi propagada
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return userCredential.user;
  } catch (error) {
    console.error('❌ Erro ao autenticar:', error.message);
    console.error('\nVerifique:');
    console.error('1. Email e senha estão corretos no arquivo .env');
    console.error('2. O usuário existe no Firebase Authentication');
    console.error('3. Não há aspas ou espaços extras nas variáveis do .env');
    process.exit(1);
  }
}

/**
 * Verifica se já existem vacinas no Firestore
 */
async function verificarVacinasExistentes() {
  try {
    const vacinasRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(vacinasRef);
    return snapshot.size;
  } catch (error) {
    console.error('❌ Erro ao verificar vacinas existentes:', error);
    return 0;
  }
}

/**
 * Faz upload de todas as vacinas para o Firestore
 * @param {boolean} forcarAtualizacao - Se true, atualiza mesmo documentos existentes
 */
async function uploadVacinas(forcarAtualizacao = false) {
  try {
    // Autenticar primeiro
    await autenticarAdmin();
    
    console.log('🚀 Iniciando upload de vacinas...\n');
    
    // Verificar vacinas existentes
    const vacinasExistentes = await verificarVacinasExistentes();
    
    if (vacinasExistentes > 0 && !forcarAtualizacao) {
      console.log('⚠️  Já existem vacinas no Firestore! Use --force para atualizar.\n');
    }
    
    let sucesso = 0;
    let atualizados = 0;
    let criados = 0;
    let erros = 0;
    
    // Processar cada vacina
    for (const vacina of vacinas2025) {
      try {
        const vacinaRef = doc(db, COLLECTION_NAME, vacina.id);
        
        // Verificar se o documento já existe
        const docSnap = await getDoc(vacinaRef);
        const existe = docSnap.exists();
        
        // Preparar dados com campos de controle
        const dadosVacina = {
          id: vacina.id,
          nome: vacina.nome,
          finalidade: vacina.finalidade,
          publicoAlvo: vacina.publicoAlvo,
          quantidade: vacina.quantidade || 0,
          // Campos de controle para o painel admin
          publicado: false, // Por padrão, não publicado (será controlado pelo painel admin)
          ativo: true,
          // Timestamps
          updatedAt: Timestamp.now()
        };
        
        // Se o documento existe, preservar createdAt e campos de controle existentes
        if (existe) {
          const dadosExistentes = docSnap.data();
          // Preservar createdAt se já existir
          if (dadosExistentes.createdAt) {
            dadosVacina.createdAt = dadosExistentes.createdAt;
          } else {
            dadosVacina.createdAt = Timestamp.now();
          }
          // Preservar status de publicação e ativo se já existirem
          if (dadosExistentes.publicado !== undefined) {
            dadosVacina.publicado = dadosExistentes.publicado;
          }
          if (dadosExistentes.ativo !== undefined) {
            dadosVacina.ativo = dadosExistentes.ativo;
          }
        } else {
          // Novo documento - adicionar createdAt
          dadosVacina.createdAt = Timestamp.now();
        }
        
        // Salvar no Firestore (merge: true permite atualizar sem perder campos existentes)
        await setDoc(vacinaRef, dadosVacina, { merge: true });
        
        if (existe) {
          atualizados++;
        } else {
          criados++;
        }
        console.log(`${existe ? '🔄' : '✨'} ${vacina.nome}`);
        
        sucesso++;
        
      } catch (error) {
        erros++;
        console.error(`❌ Erro ao processar ${vacina.nome} (${vacina.id}):`, error.message);
      }
    }
    
    console.log('\n📊 RESUMO:');
    console.log(`   ✅ Processado: ${sucesso}/${vacinas2025.length}`);
    console.log(`   ✨ Criados: ${criados}`);
    console.log(`   🔄 Atualizados: ${atualizados}`);
    if (erros > 0) {
      console.log(`   ❌ Erros: ${erros}`);
    }
    console.log('\n🎉 Upload concluído!\n');
    
  } catch (error) {
    console.error('❌ Erro durante o upload:', error.message);
    process.exit(1);
  }
}

/**
 * Lista todas as vacinas no Firestore
 */
async function listarVacinas() {
  try {
    // Autenticar primeiro
    await autenticarAdmin();
    
    console.log('📋 Listando vacinas do Firestore...\n');
    
    const vacinasRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(vacinasRef);
    
    if (snapshot.empty) {
      console.log('⚠️  Nenhuma vacina encontrada no Firestore.\n');
      return;
    }
    
    console.log(`Total de vacinas: ${snapshot.size}\n`);
    
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      console.log(`- ${data.nome} (${doc.id})`);
      console.log(`  Publicado: ${data.publicado ? '✅ Sim' : '❌ Não'}`);
      console.log(`  Quantidade: ${data.quantidade || 0}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Erro ao listar vacinas:', error);
  }
}

// =========================================
// EXECUÇÃO DO SCRIPT
// =========================================

// Verificar argumentos da linha de comando
const args = process.argv.slice(2);
const comando = args[0];

if (comando === '--list' || comando === '-l') {
  listarVacinas();
} else if (comando === '--force' || comando === '-f') {
  uploadVacinas(true);
} else {
  // Upload padrão (sem forçar atualização)
  uploadVacinas(false);
}


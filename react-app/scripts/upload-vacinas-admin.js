// =========================================
// SCRIPT PARA UPLOAD DE VACINAS PARA FIRESTORE (USANDO ADMIN SDK)
// =========================================
// Esta versão usa Firebase Admin SDK que bypassa as regras de segurança
// Execute este script para fazer upload de todas as vacinas do arquivo vacinas-sus.js
// para o Firestore. Os dados podem ser editados depois através do painel admin.
//
// REQUISITOS:
// 1. Instalar: npm install firebase-admin
// 2. Baixar a service account key do Firebase Console
// 3. Configurar o caminho no .env: FIREBASE_SERVICE_ACCOUNT_KEY=./path/to/serviceAccountKey.json

import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { vacinas2025 } from '../src/data/vacinas-sus.js';

// Nome da coleção no Firestore
const COLLECTION_NAME = 'vacinas';

// Caminho para a service account key
const SERVICE_ACCOUNT_KEY_PATH = process.env.FIREBASE_SERVICE_ACCOUNT_KEY || './serviceAccountKey.json';

// Inicializar Firebase Admin SDK
let db;

try {
  // Verificar se a service account key existe
  let serviceAccount;
  try {
    const serviceAccountFile = readFileSync(SERVICE_ACCOUNT_KEY_PATH, 'utf8');
    serviceAccount = JSON.parse(serviceAccountFile);
  } catch (error) {
    console.error('❌ ERRO: Não foi possível ler a service account key!');
    console.error('');
    console.error('📝 INSTRUÇÕES:');
    console.error('   1. Acesse: https://console.firebase.google.com');
    console.error('   2. Selecione seu projeto: esf-catalao-7da48');
    console.error('   3. Vá em: Project Settings (⚙️) > Service accounts');
    console.error('   4. Clique em "Generate new private key"');
    console.error('   5. Salve o arquivo JSON como "serviceAccountKey.json" na pasta react-app/');
    console.error('   6. Adicione no .env: FIREBASE_SERVICE_ACCOUNT_KEY=./serviceAccountKey.json');
    console.error('   7. IMPORTANTE: Adicione serviceAccountKey.json no .gitignore!');
    console.error('');
    console.error('   Erro:', error.message);
    process.exit(1);
  }

  // Inicializar Admin SDK
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  db = admin.firestore();
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase Admin SDK:', error);
  process.exit(1);
}

/**
 * Verifica se já existem vacinas no Firestore
 */
async function verificarVacinasExistentes() {
  try {
    const vacinasRef = db.collection(COLLECTION_NAME);
    const snapshot = await vacinasRef.get();
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
        const vacinaRef = db.collection(COLLECTION_NAME).doc(vacina.id);
        
        // Verificar se o documento já existe
        const docSnap = await vacinaRef.get();
        const existe = docSnap.exists;
        
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
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        };
        
        // Se o documento existe, preservar createdAt e campos de controle existentes
        if (existe) {
          const dadosExistentes = docSnap.data();
          // Preservar createdAt se já existir
          if (dadosExistentes.createdAt) {
            dadosVacina.createdAt = dadosExistentes.createdAt;
          } else {
            dadosVacina.createdAt = admin.firestore.FieldValue.serverTimestamp();
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
          dadosVacina.createdAt = admin.firestore.FieldValue.serverTimestamp();
        }
        
        // Salvar no Firestore (merge: true permite atualizar sem perder campos existentes)
        await vacinaRef.set(dadosVacina, { merge: true });
        
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
    
    // Fechar conexão
    await admin.app().delete();
    
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
    console.log('📋 Listando vacinas do Firestore...\n');
    
    const vacinasRef = db.collection(COLLECTION_NAME);
    const snapshot = await vacinasRef.get();
    
    if (snapshot.empty) {
      console.log('⚠️  Nenhuma vacina encontrada no Firestore.\n');
      await admin.app().delete();
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
    
    await admin.app().delete();
    
  } catch (error) {
    console.error('❌ Erro ao listar vacinas:', error);
    await admin.app().delete();
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


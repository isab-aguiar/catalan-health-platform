import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";
import { vacinas2025 } from "../src/data/vacinas-sus.js";
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};
if (!firebaseConfig.apiKey) {
  console.error("❌ ERRO: Variáveis de ambiente não configuradas!");
  console.error("");
  console.error("📝 INSTRUÇÕES:");
  console.error(
    "   1. Certifique-se de ter um arquivo .env na pasta react-app/"
  );
  console.error(
    "   2. Execute o script com: node --env-file=.env scripts/upload-vacinas-firestore.js"
  );
  console.error("   3. Ou use: npm run upload:vacinas");
  console.error("");
  console.error("📋 Variáveis necessárias no .env:");
  console.error("   VITE_FIREBASE_API_KEY");
  console.error("   VITE_FIREBASE_AUTH_DOMAIN");
  console.error("   VITE_FIREBASE_PROJECT_ID");
  console.error("   VITE_FIREBASE_STORAGE_BUCKET");
  console.error("   VITE_FIREBASE_MESSAGING_SENDER_ID");
  console.error("   VITE_FIREBASE_APP_ID");
  console.error("");
  process.exit(1);
}
const COLLECTION_NAME = "vacinas";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "root@esfcatalao.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
let app;
let auth;
let db;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("❌ Erro ao inicializar Firebase:", error);
  process.exit(1);
}

async function autenticarAdmin() {
  try {
    if (!ADMIN_PASSWORD) {
      console.error("❌ ERRO: Senha do admin não configurada!");
      console.error("");
      console.error("📝 Configure a senha do admin de uma das formas:");
      console.error("   1. Adicione no arquivo .env:");
      console.error("      ADMIN_EMAIL=root@esfcatalao.com");
      console.error("      ADMIN_PASSWORD=sua_senha_aqui");
      console.error("");
      console.error("   2. Ou exporte as variáveis antes de executar:");
      console.error("      export ADMIN_PASSWORD=sua_senha");
      console.error("");
      process.exit(1);
    }
    console.log("🔐 Autenticando como admin...");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      ADMIN_EMAIL,
      ADMIN_PASSWORD
    );
    console.log("✅ Autenticação realizada com sucesso!\n");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return userCredential.user;
  } catch (error) {
    console.error("❌ Erro ao autenticar:", error.message);
    console.error("\nVerifique:");
    console.error("1. Email e senha estão corretos no arquivo .env");
    console.error("2. O usuário existe no Firebase Authentication");
    console.error("3. Não há aspas ou espaços extras nas variáveis do .env");
    process.exit(1);
  }
}
async function verificarVacinasExistentes() {
  try {
    const vacinasRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(vacinasRef);
    return snapshot.size;
  } catch (error) {
    console.error("❌ Erro ao verificar vacinas existentes:", error);
    return 0;
  }
}
async function uploadVacinas(forcarAtualizacao = false) {
  try {
    await autenticarAdmin();
    console.log("🚀 Iniciando upload de vacinas...\n");
    const vacinasExistentes = await verificarVacinasExistentes();
    if (vacinasExistentes > 0 && !forcarAtualizacao) {
      console.log(
        "⚠️  Já existem vacinas no Firestore! Use --force para atualizar.\n"
      );
    }
    let sucesso = 0;
    let atualizados = 0;
    let criados = 0;
    let erros = 0;
    for (const vacina of vacinas2025) {
      try {
        const vacinaRef = doc(db, COLLECTION_NAME, vacina.id);
        const docSnap = await getDoc(vacinaRef);
        const existe = docSnap.exists();
        const dadosVacina = {
          id: vacina.id,
          nome: vacina.nome,
          finalidade: vacina.finalidade,
          publicoAlvo: vacina.publicoAlvo,
          quantidade: vacina.quantidade || 0,
          publicado: false,
          ativo: true,
          updatedAt: Timestamp.now(),
        };
        if (existe) {
          const dadosExistentes = docSnap.data();
          if (dadosExistentes.createdAt) {
            dadosVacina.createdAt = dadosExistentes.createdAt;
          } else {
            dadosVacina.createdAt = Timestamp.now();
          }
          if (dadosExistentes.publicado !== undefined) {
            dadosVacina.publicado = dadosExistentes.publicado;
          }
          if (dadosExistentes.ativo !== undefined) {
            dadosVacina.ativo = dadosExistentes.ativo;
          }
        } else {
          dadosVacina.createdAt = Timestamp.now();
        }
        await setDoc(vacinaRef, dadosVacina, { merge: true });
        if (existe) {
          atualizados++;
        } else {
          criados++;
        }
        console.log(`${existe ? "🔄" : "✨"} ${vacina.nome}`);
        sucesso++;
      } catch (error) {
        erros++;
        console.error(
          `❌ Erro ao processar ${vacina.nome} (${vacina.id}):`,
          error.message
        );
      }
    }
    console.log("\n📊 RESUMO:");
    console.log(`   ✅ Processado: ${sucesso}/${vacinas2025.length}`);
    console.log(`   ✨ Criados: ${criados}`);
    console.log(`   🔄 Atualizados: ${atualizados}`);
    if (erros > 0) {
      console.log(`   ❌ Erros: ${erros}`);
    }
    console.log("\n🎉 Upload concluído!\n");
  } catch (error) {
    console.error("❌ Erro durante o upload:", error.message);
    process.exit(1);
  }
}
async function listarVacinas() {
  try {
    await autenticarAdmin();
    console.log("📋 Listando vacinas do Firestore...\n");
    const vacinasRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(vacinasRef);
    if (snapshot.empty) {
      console.log("⚠️  Nenhuma vacina encontrada no Firestore.\n");
      return;
    }
    console.log(`Total de vacinas: ${snapshot.size}\n`);
    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      console.log(`- ${data.nome} (${doc.id})`);
      console.log(`  Publicado: ${data.publicado ? "✅ Sim" : "❌ Não"}`);
      console.log(`  Quantidade: ${data.quantidade || 0}`);
      console.log("");
    });
  } catch (error) {
    console.error("❌ Erro ao listar vacinas:", error);
  }
}

const args = process.argv.slice(2);
const comando = args[0];
if (comando === "--list" || comando === "-l") {
  listarVacinas();
} else if (comando === "--force" || comando === "-f") {
  uploadVacinas(true);
} else {
  uploadVacinas(false);
}

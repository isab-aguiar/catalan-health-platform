

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import * as readline from "readline";

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
  console.error(
    "Execute o script com: node --env-file=../.env scripts/corrigir-campanhas-e-usuarios.mjs"
  );
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function listarCampanhas() {
  console.log("\n📊 LISTANDO TODAS AS CAMPANHAS DO FIREBASE...\n");

  try {
    const campanhasRef = collection(db, "campanhas");
    const snapshot = await getDocs(campanhasRef);

    if (snapshot.empty) {
      console.log("✅ Nenhuma campanha encontrada no Firebase.");
      return [];
    }

    const campanhas = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      campanhas.push({
        id: doc.id,
        titulo: data.titulo,
        categoria: data.categoria,
        ativo: data.ativo,
        criadoEm: data.criadoEm?.toDate(),
      });
    });

    console.log(`📋 Total: ${campanhas.length} campanha(s)\n`);
    campanhas.forEach((c, index) => {
      console.log(`${index + 1}. [${c.id}]`);
      console.log(`   Título: ${c.titulo}`);
      console.log(`   Categoria: ${c.categoria}`);
      console.log(`   Ativo: ${c.ativo ? "Sim" : "Não"}`);
      console.log(
        `   Criado em: ${c.criadoEm ? c.criadoEm.toLocaleString("pt-BR") : "N/A"}`
      );
      console.log("");
    });

    return campanhas;
  } catch (error) {
    console.error("❌ Erro ao listar campanhas:", error.message);
    return [];
  }
}

async function deletarCampanhaPorId(campanhaId) {
  console.log(`\n🗑️  DELETANDO CAMPANHA: ${campanhaId}...\n`);

  try {
    const campanhaRef = doc(db, "campanhas", campanhaId);
    await deleteDoc(campanhaRef);
    console.log("✅ Campanha DELETADA com sucesso do Firebase!\n");
    return true;
  } catch (error) {
    console.error("❌ Erro ao deletar campanha:", error.message);
    console.error("Código do erro:", error.code);
    return false;
  }
}

async function deletarTodasCampanhas() {
  console.log("\n⚠️  DELETANDO TODAS AS CAMPANHAS...\n");

  try {
    const campanhasRef = collection(db, "campanhas");
    const snapshot = await getDocs(campanhasRef);

    let deleted = 0;
    for (const docSnapshot of snapshot.docs) {
      await deleteDoc(docSnapshot.ref);
      deleted++;
      console.log(`✅ Deletada: ${docSnapshot.data().titulo}`);
    }

    console.log(`\n✅ Total deletadas: ${deleted} campanha(s)\n`);
    return true;
  } catch (error) {
    console.error("❌ Erro ao deletar campanhas:", error.message);
    return false;
  }
}

async function criarUsuarioDiretoria() {
  console.log("\n👤 CRIANDO USUÁRIO DA DIRETÓRIA...\n");

  const diretoriaData = {
    uid: "AuURYgW9NWM5zovstvxOpGppAYF3",
    email: "gestao.estrategica@esfcatalao.com",
    displayName: "Diretória",
    role: "diretoria",
    active: true,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };

  try {
    const userRef = doc(db, "users", diretoriaData.uid);
    await setDoc(userRef, diretoriaData, { merge: true });

    console.log("✅ Usuário DIRETÓRIA criado com sucesso!\n");
    console.log("📄 Dados salvos:");
    console.log("   UID:", diretoriaData.uid);
    console.log("   Email:", diretoriaData.email);
    console.log("   Nome:", diretoriaData.displayName);
    console.log("   Role:", diretoriaData.role);
    console.log("   Ativo:", diretoriaData.active);
    console.log("");
    console.log("📋 PERMISSÕES DA DIRETÓRIA:");
    console.log("   ✅ Pode VER todos os avisos");
    console.log("   ✅ Pode VER todas as campanhas");
    console.log("   ✅ Pode ACESSAR o painel administrativo");
    console.log("   ❌ NÃO pode CRIAR avisos");
    console.log("   ❌ NÃO pode EDITAR avisos");
    console.log("   ❌ NÃO pode EXCLUIR avisos");
    console.log("   ❌ NÃO pode gerenciar usuários");
    console.log("");
    return true;
  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error.message);
    return false;
  }
}

async function main() {
  console.log("╔════════════════════════════════════════════════╗");
  console.log("║  🔧 CORREÇÃO DE CAMPANHAS E USUÁRIOS           ║");
  console.log("║  ESF Catalão - Sistema Administrativo          ║");
  console.log("╚════════════════════════════════════════════════╝\n");

  while (true) {
    console.log("\n🔹 MENU DE OPÇÕES:");
    console.log("1. Listar todas as campanhas");
    console.log("2. Deletar campanha específica (por ID)");
    console.log("3. Deletar TODAS as campanhas (cuidado!)");
    console.log("4. Criar usuário da Diretória");
    console.log("5. Fazer TUDO (criar diretória + listar campanhas)");
    console.log("0. Sair\n");

    const opcao = await question("Escolha uma opção: ");

    switch (opcao) {
      case "1":
        await listarCampanhas();
        break;

      case "2":
        await listarCampanhas();
        const campanhaId = await question(
          "\nDigite o ID da campanha para deletar: "
        );
        if (campanhaId.trim()) {
          const confirmar = await question(
            `\n⚠️  Tem certeza que deseja deletar a campanha [${campanhaId}]? (s/n): `
          );
          if (confirmar.toLowerCase() === "s") {
            await deletarCampanhaPorId(campanhaId.trim());
          } else {
            console.log("❌ Operação cancelada.");
          }
        }
        break;

      case "3":
        const confirmarTodas = await question(
          '\n⚠️⚠️⚠️ ATENÇÃO! Isso vai DELETAR TODAS AS CAMPANHAS!\nDigite "CONFIRMO" para prosseguir: '
        );
        if (confirmarTodas === "CONFIRMO") {
          await deletarTodasCampanhas();
        } else {
          console.log("❌ Operação cancelada.");
        }
        break;

      case "4":
        await criarUsuarioDiretoria();
        break;

      case "5":
        await criarUsuarioDiretoria();
        await listarCampanhas();
        break;

      case "0":
        console.log("\n👋 Encerrando...\n");
        rl.close();
        process.exit(0);

      default:
        console.log("\n❌ Opção inválida!\n");
    }
  }
}

main().catch((error) => {
  console.error("\n❌ Erro fatal:", error);
  rl.close();
  process.exit(1);
});

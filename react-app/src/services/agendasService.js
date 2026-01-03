import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  where,
} from "firebase/firestore";

const COLLECTION_NAME = "agendas_semanais";

export const CATEGORIAS_PROFISSIONAL = {
  MEDICO: "medico",
  GINECOLOGISTA: "ginecologista",
  PEDIATRA: "pediatra",
  FISIOTERAPEUTA: "fisioterapeuta",
  PSICOLOGA: "psicologa",
  ASSISTENTE_SOCIAL: "assistente_social",
  ENFERMEIRA: "enfermeira",
};

export const DIAS_SEMANA = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
  "Domingo",
];

export async function buscarTodasAgendas() {
  try {
    console.log("📋 [agendasService] Buscando todas as agendas...");
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("categoria"),
      orderBy("nome")
    );
    const querySnapshot = await getDocs(q);

    const agendas = [];
    querySnapshot.forEach((doc) => {
      agendas.push({
        id: doc.id,
        ...doc.data(),
        criadoEm: doc.data().criadoEm?.toDate(),
        atualizadoEm: doc.data().atualizadoEm?.toDate(),
      });
    });

    console.log(`✅ [agendasService] ${agendas.length} agendas encontradas`);
    return agendas;
  } catch (error) {
    console.error("❌ [agendasService] Erro ao buscar agendas:", error);
    throw error;
  }
}

export async function buscarAgendasPorCategoria(categoria) {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("categoria", "==", categoria),
      orderBy("nome")
    );
    const querySnapshot = await getDocs(q);

    const agendas = [];
    querySnapshot.forEach((doc) => {
      agendas.push({
        id: doc.id,
        ...doc.data(),
        criadoEm: doc.data().criadoEm?.toDate(),
        atualizadoEm: doc.data().atualizadoEm?.toDate(),
      });
    });

    return agendas;
  } catch (error) {
    console.error("Erro ao buscar agendas por categoria:", error);
    throw error;
  }
}

export async function buscarAgendaPorId(id) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        criadoEm: docSnap.data().criadoEm?.toDate(),
        atualizadoEm: docSnap.data().atualizadoEm?.toDate(),
      };
    } else {
      throw new Error("Agenda não encontrada");
    }
  } catch (error) {
    console.error("Erro ao buscar agenda:", error);
    throw error;
  }
}

export async function criarAgenda(dadosAgenda) {
  try {
    const agora = Timestamp.now();

    const novaAgenda = {
      nome: dadosAgenda.nome,
      categoria: dadosAgenda.categoria,
      horarioAtendimento: dadosAgenda.horarioAtendimento || {},
      agendaSemanal: dadosAgenda.agendaSemanal || {},
      ativa: dadosAgenda.ativa !== undefined ? dadosAgenda.ativa : true,
      observacoes: dadosAgenda.observacoes || "",
      criadoEm: agora,
      atualizadoEm: agora,
    };

    const docRef = await addDoc(collection(db, COLLECTION_NAME), novaAgenda);

    return {
      id: docRef.id,
      ...novaAgenda,
      criadoEm: agora.toDate(),
      atualizadoEm: agora.toDate(),
    };
  } catch (error) {
    console.error("Erro ao criar agenda:", error);
    throw error;
  }
}

export async function atualizarAgenda(id, dadosAtualizados) {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    const atualizacao = {
      ...dadosAtualizados,
      atualizadoEm: Timestamp.now(),
    };

    delete atualizacao.id;
    delete atualizacao.criadoEm;

    await updateDoc(docRef, atualizacao);

    return {
      id,
      ...atualizacao,
      atualizadoEm: atualizacao.atualizadoEm.toDate(),
    };
  } catch (error) {
    console.error("Erro ao atualizar agenda:", error);
    throw error;
  }
}

export async function deletarAgenda(id) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error("Erro ao deletar agenda:", error);
    throw error;
  }
}

export async function adicionarAtividade(agendaId, diaSemana, atividade) {
  try {
    const agenda = await buscarAgendaPorId(agendaId);

    const agendaSemanal = { ...agenda.agendaSemanal };

    if (!agendaSemanal[diaSemana]) {
      agendaSemanal[diaSemana] = [];
    }

    agendaSemanal[diaSemana].push(atividade);

    await atualizarAgenda(agendaId, { agendaSemanal });

    return agendaSemanal;
  } catch (error) {
    console.error("Erro ao adicionar atividade:", error);
    throw error;
  }
}

export async function removerAtividade(agendaId, diaSemana, indiceAtividade) {
  try {
    const agenda = await buscarAgendaPorId(agendaId);

    const agendaSemanal = { ...agenda.agendaSemanal };

    if (agendaSemanal[diaSemana]) {
      agendaSemanal[diaSemana].splice(indiceAtividade, 1);

      if (agendaSemanal[diaSemana].length === 0) {
        delete agendaSemanal[diaSemana];
      }
    }

    await atualizarAgenda(agendaId, { agendaSemanal });

    return agendaSemanal;
  } catch (error) {
    console.error("Erro ao remover atividade:", error);
    throw error;
  }
}

export function agruparAgendasPorCategoria(agendas) {
  const grupos = {
    medicos: [],
    ginecologista: [],
    pediatra: [],
    fisioterapeuta: [],
    psicologa: [],
    assistenteSocial: [],
    enfermeiras: [],
  };

  agendas.forEach((agenda) => {
    switch (agenda.categoria) {
      case CATEGORIAS_PROFISSIONAL.MEDICO:
        grupos.medicos.push(agenda);
        break;
      case CATEGORIAS_PROFISSIONAL.GINECOLOGISTA:
        grupos.ginecologista.push(agenda);
        break;
      case CATEGORIAS_PROFISSIONAL.PEDIATRA:
        grupos.pediatra.push(agenda);
        break;
      case CATEGORIAS_PROFISSIONAL.FISIOTERAPEUTA:
        grupos.fisioterapeuta.push(agenda);
        break;
      case CATEGORIAS_PROFISSIONAL.PSICOLOGA:
        grupos.psicologa.push(agenda);
        break;
      case CATEGORIAS_PROFISSIONAL.ASSISTENTE_SOCIAL:
        grupos.assistenteSocial.push(agenda);
        break;
      case CATEGORIAS_PROFISSIONAL.ENFERMEIRA:
        grupos.enfermeiras.push(agenda);
        break;
      default:
        break;
    }
  });

  return grupos;
}

export async function migrarDadosMockados(agendasMockadas) {
  try {
    const promises = [];

    const categoriaMap = {
      medicos: CATEGORIAS_PROFISSIONAL.MEDICO,
      ginecologista: CATEGORIAS_PROFISSIONAL.GINECOLOGISTA,
      pediatra: CATEGORIAS_PROFISSIONAL.PEDIATRA,
      fisioterapeuta: CATEGORIAS_PROFISSIONAL.FISIOTERAPEUTA,
      psicologa: CATEGORIAS_PROFISSIONAL.PSICOLOGA,
      assistenteSocial: CATEGORIAS_PROFISSIONAL.ASSISTENTE_SOCIAL,
      enfermeiras: CATEGORIAS_PROFISSIONAL.ENFERMEIRA,
    };

    for (const [categoriaAntiga, profissionais] of Object.entries(
      agendasMockadas
    )) {
      const categoria = categoriaMap[categoriaAntiga];

      if (categoria) {
        profissionais.forEach((profissional) => {
          promises.push(
            criarAgenda({
              nome: profissional.nome,
              categoria: categoria,
              horarioAtendimento: profissional.horarioAtendimento || {},
              agendaSemanal: profissional.agendaSemanal || {},
              ativa: true,
              observacoes: `Migrado de dados mockados (ID original: ${profissional.id})`,
            })
          );
        });
      }
    }

    await Promise.all(promises);
    console.log("✅ Migração concluída com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    throw error;
  }
}

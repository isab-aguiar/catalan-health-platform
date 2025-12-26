import { useState, useEffect } from "react";
import {
  collection,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
const COLLECTION_NAME = "vacinas";
export function useVacinas() {
  const [vacinas, setVacinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!db) {
      setError("Firebase não configurado");
      setLoading(false);
      return;
    }
    setLoading(true);
    const vacinasRef = collection(db, COLLECTION_NAME);
    const unsubscribe = onSnapshot(
      vacinasRef,
      (snapshot) => {
        const vacinasData = [];
        snapshot.forEach((doc) => {
          vacinasData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        vacinasData.sort((a, b) => {
          const nomeA = a.nome || "";
          const nomeB = b.nome || "";
          return nomeA.localeCompare(nomeB, "pt-BR");
        });
        setVacinas(vacinasData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        let errorMessage = "Erro ao carregar vacinas. Verifique sua conexão.";
        if (
          err.code === "permission-denied" ||
          err.message?.includes("permission") ||
          err.message?.includes("permissão")
        ) {
          errorMessage =
            'Erro de permissão: Verifique as regras do Firestore para a coleção "vacinas".';
        } else if (
          err.code === "unavailable" ||
          err.message?.includes("unavailable")
        ) {
          errorMessage =
            "Serviço temporariamente indisponível. Tente novamente em alguns instantes.";
        } else if (
          err.code === "unauthenticated" ||
          err.message?.includes("unauthenticated")
        ) {
          errorMessage = "Erro de autenticação. Recarregue a página.";
        }
        setError(errorMessage);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);
  const updateVacina = async (id, campo, valor) => {
    if (!db) {
      setError("Firebase não configurado");
      return { success: false, error: "Firebase não configurado" };
    }
    try {
      const vacinaRef = doc(db, COLLECTION_NAME, id);
      let valorFinal = valor;
      if (valor instanceof Date) {
        valorFinal = Timestamp.fromDate(valor);
      } else if (valor === null || valor === "") {
        valorFinal = null;
      }
      await updateDoc(vacinaRef, {
        [campo]: valorFinal,
        updatedAt: Timestamp.now(),
      });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  const createVacina = async (vacinaData) => {
    if (!db) {
      setError("Firebase não configurado");
      return { success: false, error: "Firebase não configurado" };
    }
    try {
      const id = vacinaData.nome
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove acentos
        .replace(/[^a-z0-9]+/g, "-") // Substitui espaços e caracteres especiais por hífen
        .replace(/^-+|-+$/g, ""); // Remove hífens do início e fim
      const vacinaRef = doc(db, COLLECTION_NAME, id);
      const dadosVacina = {
        id: id,
        nome: vacinaData.nome,
        finalidade: vacinaData.finalidade || "",
        publicoAlvo: vacinaData.publicoAlvo || "",
        quantidade: vacinaData.quantidade || 0,
        periodoInicio: vacinaData.periodoInicio
          ? Timestamp.fromDate(new Date(vacinaData.periodoInicio))
          : null,
        periodoFim: vacinaData.periodoFim
          ? Timestamp.fromDate(new Date(vacinaData.periodoFim))
          : null,
        publicado: vacinaData.publicado ?? false,
        ativo: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      await setDoc(vacinaRef, dadosVacina);
      return { success: true, id };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };
  return {
    vacinas,
    loading,
    error,
    updateVacina,
    createVacina,
  };
}

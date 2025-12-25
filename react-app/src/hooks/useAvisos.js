import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import * as avisosService from "../services/avisosService";
const COLLECTION_NAME = "avisos";
export function useAvisos() {
  const { currentUser } = useAuth();
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    try {
      const avisosRef = collection(db, COLLECTION_NAME);
      const unsubscribe = onSnapshot(
        avisosRef,
        (snapshot) => {
          const avisosData = [];
          snapshot.forEach((doc) => {
            avisosData.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          avisosData.sort((a, b) => {
            const dateA = a.data?.toDate?.() || new Date(a.data || 0);
            const dateB = b.data?.toDate?.() || new Date(b.data || 0);
            return dateB - dateA;
          });
          setAvisos(avisosData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error("Erro ao escutar avisos:", err);
          setError("Erro ao carregar avisos. Verifique sua conexão.");
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error("Erro ao configurar listener:", err);
      setError("Erro ao inicializar. Recarregue a página.");
      setLoading(false);
    }
  }, []);
  const createAviso = async (aviso) => {
    setError(null);
    const result = await avisosService.createAviso(aviso, currentUser?.uid);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  const updateAviso = async (id, aviso) => {
    setError(null);
    const result = await avisosService.updateAviso(id, aviso, currentUser?.uid);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  const deleteAviso = async (id) => {
    setError(null);
    const result = await avisosService.deleteAviso(id);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  return {
    avisos,
    loading,
    error,
    createAviso,
    updateAviso,
    deleteAviso,
  };
}
export function useAvisosPublicos() {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    let timeoutId = null;
    timeoutId = setTimeout(() => {
      console.log("⏱️ Timeout ao carregar avisos - assumindo que não há dados");
      setLoading(false);
      setAvisos([]);
      setError(null);
    }, 10000);
    try {
      const avisosRef = collection(db, COLLECTION_NAME);
      const unsubscribe = onSnapshot(
        avisosRef,
        (snapshot) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          const avisosData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.exibirNaHomepage === true) {
              avisosData.push({
                id: doc.id,
                ...data,
              });
            }
          });
          avisosData.sort((a, b) => {
            const dateA = a.data?.toDate?.() || new Date(a.data || 0);
            const dateB = b.data?.toDate?.() || new Date(b.data || 0);
            return dateB - dateA;
          });
          setAvisos(avisosData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
          console.error("Erro ao escutar avisos públicos:", err);
          if (err.code === "permission-denied") {
            console.log(
              "⚠️ Permissão negada (normal para usuário não autenticado)"
            );
            setAvisos([]);
            setError(null);
          } else if (err.code === "unavailable") {
            console.log("📡 Firestore offline ou sem conexão");
            setError(null);
            setAvisos([]);
          } else {
            setError("Erro ao carregar avisos");
          }
          setLoading(false);
        }
      );
      return () => {
        unsubscribe();
        if (timeoutId) clearTimeout(timeoutId);
      };
    } catch (err) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      console.error("Erro ao configurar listener:", err);
      setAvisos([]);
      setError(null);
      setLoading(false);
    }
  }, []);
  return {
    avisos,
    loading,
    error,
  };
}

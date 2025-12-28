import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../contexts/AuthContext";
import * as feedbacksService from "../services/feedbacksService";

const COLLECTION_NAME = "feedbacks";

export function useFeedbacks(filters = {}) {
  const { currentUser } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const feedbacksRef = collection(db, COLLECTION_NAME);
      let q = query(feedbacksRef);

      if (filters.tipo && filters.tipo !== "todos") {
        q = query(q, where("tipo", "==", filters.tipo));
      }

      if (filters.status && filters.status !== "todos") {
        q = query(q, where("status", "==", filters.status));
      }

      q = query(q, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const feedbacksData = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            let feedback = {
              id: doc.id,
              ...data,
            };

            if (filters.busca) {
              const buscaLower = filters.busca.toLowerCase();
              const nomeMatch = feedback.nome?.toLowerCase().includes(buscaLower);
              const emailMatch = feedback.email?.toLowerCase().includes(buscaLower);
              if (!nomeMatch && !emailMatch) {
                return;
              }
            }

            feedbacksData.push(feedback);
          });

          setFeedbacks(feedbacksData);
          setLoading(false);
          setError(null);
        },
        (err) => {
          setError("Erro ao carregar feedbacks. Verifique sua conexão.");
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError("Erro ao inicializar. Recarregue a página.");
      setLoading(false);
    }
  }, [filters.tipo, filters.status, filters.busca]);

  const createFeedback = async (feedbackData) => {
    setError(null);
    const result = await feedbacksService.createFeedback(feedbackData);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const updateFeedback = async (id, updates) => {
    setError(null);
    const result = await feedbacksService.updateFeedback(
      id,
      updates,
      currentUser?.uid
    );
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const getFeedbackById = async (id) => {
    setError(null);
    const result = await feedbacksService.getFeedbackById(id);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  const deleteFeedback = async (id) => {
    setError(null);
    const result = await feedbacksService.deleteFeedback(id);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };

  return {
    feedbacks,
    loading,
    error,
    createFeedback,
    updateFeedback,
    getFeedbackById,
    deleteFeedback,
  };
}


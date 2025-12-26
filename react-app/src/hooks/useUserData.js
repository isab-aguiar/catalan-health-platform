import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
const COLLECTION_NAME = "users";
export function useUserData(uid) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!uid) {
      setUserData(null);
      setLoading(false);
      setError(null);
      return;
    }
    if (!db) {
      setUserData(null);
      setLoading(false);
      setError("Firebase não configurado. Configure as variáveis de ambiente.");
      return;
    }
    setLoading(true);
    setError(null);
    const userRef = doc(db, COLLECTION_NAME, uid);
    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = {
            uid: docSnapshot.id,
            ...docSnapshot.data(),
          };
          setUserData(data);
          setError(null);
        } else {
          setUserData(null);
          setError(
            "Dados do usuário não encontrados. Acesse /admin/corrigir-permissoes para criar."
          );
        }
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setUserData(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [uid]);
  return {
    userData,
    loading,
    error,
  };
}

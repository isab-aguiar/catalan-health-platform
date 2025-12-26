import { useState, useEffect } from "react";
import { onSnapshot, query, collection } from "firebase/firestore";
import { db } from "../config/firebase";
export function useAllCampanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const q = query(collection(db, "campanhas"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const campanhasFirebase = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          dataInicio: doc.data().dataInicio?.toDate(),
          dataFim: doc.data().dataFim?.toDate(),
        }));
        setCampanhas(campanhasFirebase);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setCampanhas([]);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);
  return {
    campanhas,
    loading,
    error,
  };
}
export default useAllCampanhas;

import { useState, useEffect } from "react";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../config/firebase";
export function useAvisosPagina(paginaNome) {
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const q = query(
      collection(db, "avisos"),
      where("exibirNaHomepage", "==", false),
      where("paginaDestino", "==", paginaNome)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const avisosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(
          `📊 Avisos para página "${paginaNome}":`,
          avisosData.length
        );
        setAvisos(avisosData);
        setLoading(false);
      },
      (err) => {
        console.error(`Erro ao buscar avisos da página ${paginaNome}:`, err);
        setError(err.message);
        setAvisos([]);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [paginaNome]);
  return { avisos, loading, error };
}
export default useAvisosPagina;

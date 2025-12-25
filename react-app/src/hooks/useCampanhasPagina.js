import { useState, useEffect } from "react";
import { campanhasLocais } from "../data/campanhasLocais";
import { onSnapshot, query, collection, where } from "firebase/firestore";
import { db } from "../config/firebase";
export function useCampanhasPagina(paginaNome) {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const q = query(
      collection(db, "campanhas"),
      where("ativo", "==", true),
      where("paginaDestino", "==", paginaNome)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const campanhasFirebase = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          dataInicio: doc.data().dataInicio?.toDate(),
          dataFim: doc.data().dataFim?.toDate(),
        }));
        console.log(
          `📊 Campanhas Firebase (${paginaNome}):`,
          campanhasFirebase.length
        );
        const locaisFiltradas = campanhasLocais.filter(
          (c) =>
            c.paginaDestino === paginaNome && c.ativo && !c.exibirNaHomepage
        );
        const todasCampanhas = [...campanhasFirebase, ...locaisFiltradas];
        console.log(
          `✅ Total Campanhas (${paginaNome}):`,
          todasCampanhas.length
        );
        setCampanhas(todasCampanhas);
        setLoading(false);
      },
      (err) => {
        console.error(`Erro ao buscar campanhas da página ${paginaNome}:`, err);
        setError(err.message);
        const locaisFiltradas = campanhasLocais.filter(
          (c) =>
            c.paginaDestino === paginaNome && c.ativo && !c.exibirNaHomepage
        );
        setCampanhas(locaisFiltradas);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [paginaNome]);
  return { campanhas, loading, error };
}
export default useCampanhasPagina;

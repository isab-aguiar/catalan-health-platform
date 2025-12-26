import { useState, useEffect, useRef } from "react";
import { buscarCampanhasHome } from "../services/campanhasService";
import { campanhasLocais } from "../data/campanhasLocais";
let campanhasCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000;
export function useCampanhas() {
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    carregarCampanhas();
    return () => {
      isMounted.current = false;
    };
  }, []);
  const carregarCampanhas = async () => {
    try {
      setLoading(true);
      setError(null);
      const agora = Date.now();
      const cacheValido =
        campanhasCache &&
        cacheTimestamp &&
        agora - cacheTimestamp < CACHE_DURATION;
      let campanhasFirebase;
      if (cacheValido) {
        campanhasFirebase = campanhasCache;
      } else {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("TIMEOUT")), 10000);
        });
        try {
          campanhasFirebase = await Promise.race([
            buscarCampanhasHome(),
            timeoutPromise,
          ]);
          campanhasCache = campanhasFirebase;
          cacheTimestamp = agora;
        } catch (err) {
          if (err.message === "TIMEOUT") {
            campanhasFirebase = [];
          } else if (err.code === "permission-denied") {
            campanhasFirebase = [];
          } else if (err.code === "unavailable") {
            campanhasFirebase = [];
          } else {
            throw err;
          }
        }
      }
      const locaisFiltradas = campanhasLocais.filter(
        (c) => c.exibirNaHomepage && c.ativo
      );
      const todasCampanhas = [...campanhasFirebase, ...locaisFiltradas];
      if (isMounted.current) {
        setCampanhas(todasCampanhas);
        setLoading(false);
      }
    } catch (err) {
      if (isMounted.current) {
        if (err.code === "permission-denied" || err.code === "unavailable") {
          setError(null);
        } else {
          setError(err.message);
        }
        const locaisFiltradas = campanhasLocais.filter(
          (c) => c.exibirNaHomepage && c.ativo
        );
        setCampanhas(locaisFiltradas);
        setLoading(false);
      }
    }
  };
  const refetch = () => {
    campanhasCache = null;
    cacheTimestamp = null;
    carregarCampanhas();
  };
  return {
    campanhas,
    loading,
    error,
    refetch,
  };
}
export default useCampanhas;

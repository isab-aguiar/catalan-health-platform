// =========================================
// HOOK useUserData
// =========================================
// Hook para buscar dados do usuário logado do Firestore com real-time updates

import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

const COLLECTION_NAME = 'users';

/**
 * Hook para buscar e monitorar dados do usuário logado
 * @param {string} uid - UID do usuário do Firebase Auth
 * @returns {Object} { userData, loading, error }
 */
export function useUserData(uid) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:22',message:'useUserData effect triggered',data:{uid:uid,hasDb:!!db},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    
    // Se não houver UID, resetar estado
    if (!uid) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:24',message:'No UID provided',data:{uid:uid},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
      setUserData(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Se o Firebase não foi inicializado, retornar erro
    if (!db) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:32',message:'Firebase DB not initialized',data:{db:db,envVars:{apiKey:!!import.meta.env.VITE_FIREBASE_API_KEY,projectId:!!import.meta.env.VITE_FIREBASE_PROJECT_ID}},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
      // #endregion
      console.warn('⚠️ Firestore não disponível - variáveis de ambiente não configuradas');
      setUserData(null);
      setLoading(false);
      setError('Firebase não configurado. Configure as variáveis de ambiente.');
      return;
    }

    setLoading(true);
    setError(null);

    const userRef = doc(db, COLLECTION_NAME, uid);
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:43',message:'Setting up Firestore listener',data:{uid:uid,collection:COLLECTION_NAME},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion

    // Real-time listener para o documento do usuário
    const unsubscribe = onSnapshot(
      userRef,
      (docSnapshot) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:48',message:'Firestore snapshot received',data:{exists:docSnapshot.exists(),uid:uid},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
        // #endregion
        
        if (docSnapshot.exists()) {
          const data = {
            uid: docSnapshot.id,
            ...docSnapshot.data()
          };
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:54',message:'User data loaded successfully',data:{uid:data.uid,role:data.role,active:data.active,email:data.email,displayName:data.displayName},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H2,H4'})}).catch(()=>{});
          // #endregion
          console.log('✅ Dados do usuário carregados:', data);
          setUserData(data);
          setError(null);
        } else {
          // Documento não existe
          // #region agent log
          fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:59',message:'User document NOT FOUND in Firestore',data:{uid:uid,collection:COLLECTION_NAME},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H5'})}).catch(()=>{});
          // #endregion
          console.warn('⚠️ Documento do usuário não encontrado no Firestore');
          console.warn('   UID:', uid);
          console.warn('   Coleção: users');
          setUserData(null);
          setError('Dados do usuário não encontrados. Acesse /admin/corrigir-permissoes para criar.');
        }
        setLoading(false);
      },
      (err) => {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/fc0d6d5a-42f3-44ff-9ec4-159e190f7ca3',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useUserData.js:67',message:'Firestore listener ERROR',data:{code:err.code,message:err.message,uid:uid},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H5'})}).catch(()=>{});
        // #endregion
        console.error('❌ Erro ao escutar dados do usuário:', err);
        console.error('   Código:', err.code);
        console.error('   Mensagem:', err.message);
        setError(err.message);
        setUserData(null);
        setLoading(false);
      }
    );

    // Cleanup: cancelar subscription quando componente desmontar ou uid mudar
    return () => unsubscribe();
  }, [uid]);

  return {
    userData,
    loading,
    error
  };
}


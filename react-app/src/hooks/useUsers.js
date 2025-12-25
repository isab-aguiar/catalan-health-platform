import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import * as usersService from "../services/usersService";
const COLLECTION_NAME = "users";
export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    const usersRef = collection(db, COLLECTION_NAME);
    const q = query(usersRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const usersData = [];
        snapshot.forEach((doc) => {
          usersData.push({
            uid: doc.id,
            ...doc.data(),
          });
        });
        setUsers(usersData);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Erro ao escutar usuários:", err);
        setError(err.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);
  const createUser = async (userData, password, createdByUid) => {
    setError(null);
    const result = await usersService.createUser(
      userData,
      password,
      createdByUid
    );
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  const updateUserRole = async (uid, role) => {
    setError(null);
    const result = await usersService.updateUserRole(uid, role);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  const toggleUserActive = async (uid, active) => {
    setError(null);
    const result = await usersService.toggleUserActive(uid, active);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  const updateUser = async (uid, updates) => {
    setError(null);
    const result = await usersService.updateUser(uid, updates);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  const deleteUser = async (uid) => {
    setError(null);
    const result = await usersService.deleteUser(uid);
    if (!result.success) {
      setError(result.error);
    }
    return result;
  };
  return {
    users,
    loading,
    error,
    createUser,
    updateUserRole,
    toggleUserActive,
    updateUser,
    deleteUser,
  };
}

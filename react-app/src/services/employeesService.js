import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const COLLECTION_NAME = "employees";

/**
 * Busca todos os funcionários do Firestore
 */
export async function getAllEmployees() {
  try {
    console.log('👥 [getAllEmployees] Buscando todos os funcionários...');
    const employeesRef = collection(db, COLLECTION_NAME);

    // Tentar com ordenação primeiro
    let querySnapshot;
    try {
      const q = query(employeesRef, orderBy("displayName", "asc"));
      querySnapshot = await getDocs(q);
      console.log('✅ [getAllEmployees] Query com orderBy executada com sucesso');
    } catch (orderError) {
      // Se falhar, buscar sem ordenação
      console.log('⚠️ [getAllEmployees] orderBy falhou, buscando sem ordenação:', orderError.message);
      querySnapshot = await getDocs(employeesRef);
    }

    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Ordenar no cliente por displayName
    employees.sort((a, b) => {
      const nomeA = (a.displayName || '').toLowerCase();
      const nomeB = (b.displayName || '').toLowerCase();
      return nomeA.localeCompare(nomeB);
    });

    console.log(`✅ [getAllEmployees] ${employees.length} funcionários encontrados`);
    return { success: true, data: employees };
  } catch (error) {
    console.error("❌ [getAllEmployees] Erro ao buscar funcionários:", error);
    return { success: false, error: error.message, data: [] };
  }
}

/**
 * Busca um funcionário específico pelo ID
 */
export async function getEmployeeById(employeeId) {
  try {
    if (!employeeId) {
      return { success: false, error: "ID do funcionário é obrigatório" };
    }

    const employeeRef = doc(db, COLLECTION_NAME, employeeId);
    const employeeDoc = await getDoc(employeeRef);

    if (!employeeDoc.exists()) {
      return {
        success: false,
        error: "Funcionário não encontrado",
        notFound: true,
      };
    }

    return {
      success: true,
      data: {
        id: employeeDoc.id,
        ...employeeDoc.data(),
      },
    };
  } catch (error) {
    console.error("Erro ao buscar funcionário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca funcionários por ESF
 */
export async function getEmployeesByEsf(esfCode) {
  try {
    const employeesRef = collection(db, COLLECTION_NAME);
    const q = query(employeesRef, where("esf", "==", esfCode));
    const querySnapshot = await getDocs(q);

    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: employees };
  } catch (error) {
    console.error("Erro ao buscar funcionários por ESF:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Busca funcionários por departamento
 */
export async function getEmployeesByDepartment(department) {
  try {
    const employeesRef = collection(db, COLLECTION_NAME);
    const q = query(employeesRef, where("department", "==", department));
    const querySnapshot = await getDocs(q);

    const employees = [];
    querySnapshot.forEach((doc) => {
      employees.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return { success: true, data: employees };
  } catch (error) {
    console.error("Erro ao buscar funcionários por departamento:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Cria ou atualiza um funcionário
 */
export async function saveEmployee(employeeId, employeeData) {
  try {
    if (!employeeId) {
      return { success: false, error: "ID do funcionário é obrigatório" };
    }

    const employeeRef = doc(db, COLLECTION_NAME, employeeId);
    const now = Timestamp.now();

    // Verifica se já existe
    const existingDoc = await getDoc(employeeRef);

    const dataToSave = {
      ...employeeData,
      metadata: {
        ...employeeData.metadata,
        updatedAt: now.toDate().toISOString().split('T')[0],
        ...(existingDoc.exists() ? {} : { createdAt: now.toDate().toISOString().split('T')[0] })
      }
    };

    await setDoc(employeeRef, dataToSave);

    return {
      success: true,
      message: existingDoc.exists() ? "Funcionário atualizado com sucesso" : "Funcionário criado com sucesso",
      data: { id: employeeId, ...dataToSave }
    };
  } catch (error) {
    console.error("Erro ao salvar funcionário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Atualiza um funcionário existente
 */
export async function updateEmployee(employeeId, updates) {
  try {
    if (!employeeId) {
      return { success: false, error: "ID do funcionário é obrigatório" };
    }

    const employeeRef = doc(db, COLLECTION_NAME, employeeId);
    const existingDoc = await getDoc(employeeRef);

    if (!existingDoc.exists()) {
      return { success: false, error: "Funcionário não encontrado" };
    }

    const now = Timestamp.now();
    const updateData = {
      ...updates,
      "metadata.updatedAt": now.toDate().toISOString().split('T')[0]
    };

    await updateDoc(employeeRef, updateData);

    return {
      success: true,
      message: "Funcionário atualizado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao atualizar funcionário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Deleta um funcionário (não recomendado - use inativação)
 */
export async function deleteEmployee(employeeId) {
  try {
    if (!employeeId) {
      return { success: false, error: "ID do funcionário é obrigatório" };
    }

    const employeeRef = doc(db, COLLECTION_NAME, employeeId);
    await deleteDoc(employeeRef);

    return {
      success: true,
      message: "Funcionário deletado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao deletar funcionário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Inativa um funcionário (recomendado em vez de deletar)
 */
export async function inactivateEmployee(employeeId) {
  try {
    if (!employeeId) {
      return { success: false, error: "ID do funcionário é obrigatório" };
    }

    const now = Timestamp.now();
    const updates = {
      active: false,
      "metadata.updatedAt": now.toDate().toISOString().split('T')[0],
      "metadata.inactivatedAt": now.toDate().toISOString().split('T')[0]
    };

    return await updateEmployee(employeeId, updates);
  } catch (error) {
    console.error("Erro ao inativar funcionário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Reativa um funcionário
 */
export async function reactivateEmployee(employeeId) {
  try {
    if (!employeeId) {
      return { success: false, error: "ID do funcionário é obrigatório" };
    }

    const now = Timestamp.now();
    const employeeRef = doc(db, COLLECTION_NAME, employeeId);

    await updateDoc(employeeRef, {
      active: true,
      "metadata.updatedAt": now.toDate().toISOString().split('T')[0],
      "metadata.reactivatedAt": now.toDate().toISOString().split('T')[0]
    });

    return {
      success: true,
      message: "Funcionário reativado com sucesso"
    };
  } catch (error) {
    console.error("Erro ao reativar funcionário:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Importa múltiplos funcionários de uma vez (usado para migração)
 */
export async function bulkImportEmployees(employeesData) {
  try {
    const results = {
      success: 0,
      failed: 0,
      errors: []
    };

    for (const employee of employeesData) {
      const result = await saveEmployee(employee.id, employee);

      if (result.success) {
        results.success++;
      } else {
        results.failed++;
        results.errors.push({
          id: employee.id,
          error: result.error
        });
      }
    }

    return {
      success: true,
      message: `Importação concluída: ${results.success} sucesso, ${results.failed} falhas`,
      results
    };
  } catch (error) {
    console.error("Erro na importação em lote:", error);
    return { success: false, error: error.message };
  }
}

import { agendasSemanais } from "../data/agendasSemanais";
import { migrarDadosMockados } from "../services/agendasService";

export async function executarMigracao() {
  try {
    console.log("🚀 Iniciando migração de agendas semanais...");
    console.log("📊 Dados a migrar:", agendasSemanais);

    await migrarDadosMockados(agendasSemanais);

    console.log("✅ Migração concluída com sucesso!");
    console.log("ℹ️ As agendas agora estão salvas no Firestore");

    return true;
  } catch (error) {
    console.error("❌ Erro na migração:", error);
    throw error;
  }
}

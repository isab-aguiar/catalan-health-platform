import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { setUserData } from "../../services/usersService";
import { Alert } from "../../components/common/Alert";
import { Button } from "../../components/common/Button";
import { Shield, CheckCircle, XCircle, Loader } from "lucide-react";
export default function CorrigirPermissoes() {
  const { currentUser, userData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const corrigirPermissoes = async () => {
    if (!currentUser) {
      setResult({
        success: false,
        message: "Você precisa estar logado para corrigir permissões",
      });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const result = await setUserData(currentUser.uid, {
        email: currentUser.email || userData?.email || "",
        displayName:
          userData?.displayName || currentUser.displayName || "Administrador",
        role: "admin",
        active: true,
      });
      if (result.success) {
        setResult({
          success: true,
          message:
            "Permissões corrigidas com sucesso! Os dados serão atualizados automaticamente em alguns segundos. Se não aparecer, faça logout e login novamente.",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("❌ Erro ao corrigir:", result.error);
        setResult({
          success: false,
          message: result.error || "Erro ao corrigir permissões",
        });
      }
    } catch (error) {
      console.error("❌ Erro ao corrigir permissões:", error);
      setResult({
        success: false,
        message: error.message || "Erro desconhecido ao corrigir permissões",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container-custom py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-neutral-900">
              Corrigir Permissões de Admin
            </h1>
          </div>
          <div className="space-y-4 mb-6">
            <Alert type="info">
              Esta ferramenta corrige suas permissões de administrador no banco
              de dados. Use se você perdeu acesso ao painel administrativo.
            </Alert>
            {currentUser && (
              <div className="bg-neutral-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-neutral-700">
                  Usuário atual:
                </p>
                <p className="text-sm text-neutral-600">
                  <strong>UID:</strong> {currentUser.uid}
                </p>
                <p className="text-sm text-neutral-600">
                  <strong>Email:</strong>{" "}
                  {currentUser.email || userData?.email || "Não informado"}
                </p>
                <p className="text-sm text-neutral-600">
                  <strong>Role atual:</strong>{" "}
                  {userData?.role || "não definido"}
                </p>
                <p className="text-sm text-neutral-600">
                  <strong>Status:</strong>{" "}
                  {userData?.active !== false ? "Ativo" : "Inativo"}
                </p>
              </div>
            )}
            {result && (
              <Alert type={result.success ? "success" : "error"}>
                <div className="flex items-start gap-2">
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  )}
                  <p>{result.message}</p>
                </div>
              </Alert>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              onClick={corrigirPermissoes}
              disabled={loading || !currentUser}
              className="flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Corrigindo...
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Corrigir Permissões
                </>
              )}
            </Button>
          </div>
          <div className="mt-6 pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-600">
              <strong>O que este botão faz:</strong>
            </p>
            <ul className="text-sm text-neutral-600 mt-2 space-y-1 list-disc list-inside">
              <li>Define seu role como "admin"</li>
              <li>Ativa sua conta (active: true)</li>
              <li>Atualiza seus dados no Firestore</li>
            </ul>
            <p className="text-sm text-neutral-600 mt-4">
              <strong>Importante:</strong> Após corrigir, faça logout e login
              novamente para que as mudanças tenham efeito.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

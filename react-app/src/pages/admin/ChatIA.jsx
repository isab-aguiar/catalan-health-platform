import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useAvisos } from "../../hooks/useAvisos";
import AdminLayout from "../../layouts/AdminLayout";
import ChatBot from "../../components/chatbot/ChatBot";
import Alert from "../../components/common/Alert";
import { X, Save, Sparkles, MessageSquare, HelpCircle } from "lucide-react";
export default function ChatIA() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createAviso } = useAvisos();
  const [showModal, setShowModal] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [editingAviso, setEditingAviso] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    categoria: "campanha",
    data: "",
    exibirNaHomepage: false,
  });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  // Criar aviso diretamente (sem editar)
  const handleCreateAviso = async (avisoData) => {
    if (!window.confirm("Deseja criar este aviso agora?")) {
      return;
    }
    try {
      // Adicionar data atual
      const avisoComData = {
        ...avisoData,
        data: new Date().toISOString().split("T")[0],
      };
      const result = await createAviso(avisoComData);
      if (result.success) {
        alert("Aviso criado com sucesso.");
        if (window.confirm("Deseja ver todos os avisos?")) {
          navigate("/admin/avisos");
        }
      } else {
        alert("Erro ao criar aviso: " + (result.error || "Erro desconhecido"));
      }
    } catch (err) {
      alert("Erro inesperado ao criar aviso");
    }
  };
  const handleEditAviso = (avisoData) => {
    setEditingAviso(avisoData);
    setFormData({
      titulo: avisoData.titulo || "",
      descricao: avisoData.descricao || "",
      categoria: avisoData.categoria || "campanha",
      data: new Date().toISOString().split("T")[0],
      exibirNaHomepage: avisoData.exibirNaHomepage || false,
    });
    setFormError("");
    setShowModal(true);
  };
  // Fechar modal
  const handleFecharModal = () => {
    setShowModal(false);
    setEditingAviso(null);
    setFormData({
      titulo: "",
      descricao: "",
      categoria: "campanha",
      data: "",
      exibirNaHomepage: false,
    });
    setFormError("");
  };
  // Validar formulário
  const validarFormulario = () => {
    if (!formData.titulo.trim() || formData.titulo.trim().length < 3) {
      return "Título deve ter no mínimo 3 caracteres";
    }
    if (!formData.descricao.trim() || formData.descricao.trim().length < 10) {
      return "Descrição deve ter no mínimo 10 caracteres";
    }
    if (!formData.categoria) {
      return "Categoria é obrigatória";
    }
    if (!formData.data) {
      return "Data é obrigatória";
    }
    return null;
  };
  const handleSalvar = async () => {
    setFormError("");
    const erro = validarFormulario();
    if (erro) {
      setFormError(erro);
      return;
    }
    setFormLoading(true);
    try {
      const result = await createAviso(formData);
      if (result.success) {
        handleFecharModal();
        alert("✅ Aviso criado com sucesso!");
        if (window.confirm("Deseja ver todos os avisos?")) {
          navigate("/admin/avisos");
        }
      } else {
        setFormError(result.error || "Erro ao criar aviso");
      }
    } catch (err) {
      setFormError("Erro inesperado. Tente novamente.");
    } finally {
      setFormLoading(false);
    }
  };
  return (
    <AdminLayout currentPage="chat-ia">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Assistente Inteligente
              </h1>
              <p className="text-xs text-slate-600">
                Geração automatizada de avisos e campanhas
              </p>
            </div>
          </div>
          {}
          <div className="relative">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Orientações de uso"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            {}
            {showHelp && (
              <>
                {}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowHelp(false)}
                />
                {}
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-xl z-20 p-4">
                  <div className="flex items-start gap-2 mb-3">
                    <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Orientações de Uso
                    </h3>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                    <li>Descreva de forma clara o aviso ou anexe uma imagem</li>
                    <li>Especifique material, vacina ou campanha</li>
                    <li>
                      O sistema gera comunicado profissional automaticamente
                    </li>
                    <li>Revise antes de publicar</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
        {}
        <div
          className="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden"
          style={{ height: "600px" }}
        >
          <ChatBot
            onCreateAviso={handleCreateAviso}
            onEditAviso={handleEditAviso}
            userId={currentUser?.uid}
          />
        </div>
        {}
        <div className="text-center text-xs text-neutral-400 mt-3">
          Powered by Gemini 2.5 Flash
        </div>
      </div>
      {}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {}
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                Editar Aviso antes de Salvar
              </h3>
              <button
                onClick={handleFecharModal}
                className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {}
            <div className="p-6 space-y-4">
              {formError && <Alert type="error">{formError}</Alert>}
              {}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Ex: Campanha de Vacinação"
                  maxLength={100}
                />
              </div>
              {}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Descrição <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.descricao}
                  onChange={(e) =>
                    setFormData({ ...formData, descricao: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Descreva o aviso em detalhes..."
                  rows={5}
                  maxLength={500}
                />
                <p className="text-xs text-neutral-500 mt-1">
                  {formData.descricao.length}/500 caracteres
                </p>
              </div>
              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Categoria <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoria}
                    onChange={(e) =>
                      setFormData({ ...formData, categoria: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="vacina">Vacina</option>
                    <option value="material">Material</option>
                    <option value="campanha">Campanha</option>
                  </select>
                </div>
                {}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Data <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.data}
                    onChange={(e) =>
                      setFormData({ ...formData, data: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              {}
              <div className="flex items-center gap-2 p-4 bg-neutral-50 rounded-lg">
                <input
                  type="checkbox"
                  id="exibirNaHomepage"
                  checked={formData.exibirNaHomepage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      exibirNaHomepage: e.target.checked,
                    })
                  }
                  className="w-4 h-4 text-teal-600 border-neutral-300 rounded focus:ring-teal-500"
                />
                <label
                  htmlFor="exibirNaHomepage"
                  className="text-sm font-medium text-neutral-700 cursor-pointer"
                >
                  Exibir na homepage (público)
                </label>
              </div>
            </div>
            {}
            <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={handleFecharModal}
                className="px-4 py-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvar}
                disabled={formLoading}
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
              >
                {formLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Criar Aviso
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

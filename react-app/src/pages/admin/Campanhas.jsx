import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { usePermissions } from "../../hooks/usePermissions";
import AdminLayout from "../../layouts/AdminLayout";
import {
  buscarCampanhas,
  buscarCampanhasPorCriador,
  deletarCampanha,
  ativarCampanha,
  desativarCampanha,
  atualizarCampanha,
  criarCampanha,
} from "../../services/campanhasService";
import { uploadArquivo } from "../../services/uploadService";
import { allPages } from "../../data/services";
import {
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Calendar,
  MapPin,
  Users,
  Phone,
  AlertTriangle,
  Star,
  FileText,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Upload,
  Image,
  X as XIcon,
} from "lucide-react";
export default function Campanhas() {
  const { currentUser, userData, isAdmin, isProfissional, isDiretoria } =
    useAuth();
  const { showModal } = useModal();
  const permissions = usePermissions();
  const [campanhas, setCampanhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategoria, setFilterCategoria] = useState("todas");
  const [filterStatus, setFilterStatus] = useState("todas");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [uploadingImage, setUploadingImage] = useState(false);
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    titulo: "",
    subtitulo: "",
    descricao: "",
    categoria: "campanha",
    urgente: false,
    destaque: false,
    exibirNaHomepage: false,
    local: "",
    horario: "",
    publicoAlvo: "",
    contato: "",
    cta: "Saiba Mais",
    paginaDestino: "home",
    dataInicio: "",
    dataFim: "",
    imagemURL: null,
  });
  const [createImageFile, setCreateImageFile] = useState(null);
  const [createImagePreview, setCreateImagePreview] = useState(null);
  const [creatingCampanha, setCreatingCampanha] = useState(false);
  const [createImageFiles, setCreateImageFiles] = useState([]);
  const [createImagePreviews, setCreateImagePreviews] = useState([]);
  useEffect(() => {
    loadCampanhas();
  }, []);
  const loadCampanhas = async () => {
    try {
      setLoading(true);
      setError(null);
      let data = [];
      if (isAdmin) {
        data = await buscarCampanhas({});
        console.log("👑 Admin - Carregando TODAS as campanhas:", data.length);
      } else if (isProfissional && currentUser?.uid) {
        data = await buscarCampanhasPorCriador(currentUser.uid);
        console.log(
          "👨‍⚕️ Profissional - Carregando campanhas próprias:",
          data.length
        );
      } else if (isDiretoria) {
        data = await buscarCampanhas({});
        console.log(
          "👁️ Diretoria - Carregando TODAS as campanhas (visualização):",
          data.length
        );
      }
      setCampanhas(data);
    } catch (err) {
      setError(err.message);
      console.error("Erro ao carregar campanhas:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!permissions.isAdmin()) {
      await showModal({
        type: 'error',
        title: 'Sem Permissão',
        message: 'Apenas administradores podem deletar campanhas.',
        confirmText: 'OK',
      });
      return;
    }

    const confirmed = await showModal({
      type: 'warning',
      title: 'Confirmar Exclusão',
      message: 'Tem certeza que deseja deletar esta campanha PERMANENTEMENTE do Firebase?',
      confirmText: 'Deletar',
      cancelText: 'Cancelar',
    });

    if (!confirmed) return;

    try {
      await deletarCampanha(id);
      setCampanhas((prev) => prev.filter((c) => c.id !== id));
      await loadCampanhas();

      await showModal({
        type: 'success',
        title: 'Campanha Deletada',
        message: 'A campanha foi removida permanentemente do Firebase.',
        confirmText: 'OK',
      });
    } catch (err) {
      console.error("Erro ao deletar campanha:", err);
      await showModal({
        type: 'error',
        title: 'Erro ao Deletar',
        message: `Não foi possível deletar a campanha: ${err.message}`,
        confirmText: 'OK',
      });
      await loadCampanhas();
    }
  };
  const handleToggleAtivo = async (id, ativo) => {
    try {
      if (ativo) {
        await desativarCampanha(id);
      } else {
        await ativarCampanha(id);
      }
      setCampanhas((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ativo: !ativo } : c))
      );
    } catch (err) {
      await showModal({
        type: 'error',
        title: 'Erro',
        message: err.message,
        confirmText: 'OK',
      });
    }
  };
  const handleEdit = (campanha) => {
    setEditingId(campanha.id);
    setNewImageFile(null);
    setNewImagePreview(null);
    setEditForm({
      titulo: campanha.titulo,
      subtitulo: campanha.subtitulo || "",
      descricao: campanha.descricao,
      categoria: campanha.categoria,
      urgente: campanha.urgente,
      destaque: campanha.destaque,
      exibirNaHomepage: campanha.exibirNaHomepage,
      local: campanha.local || "",
      horario: campanha.horario || "",
      publicoAlvo: campanha.publicoAlvo || "",
      contato: campanha.contato || "",
      cta: campanha.cta || "Saiba Mais",
      paginaDestino: campanha.paginaDestino || "home",
      dataInicio: campanha.dataInicio
        ? campanha.dataInicio.toISOString().split("T")[0]
        : "",
      dataFim: campanha.dataFim
        ? campanha.dataFim.toISOString().split("T")[0]
        : "",
      imagemURL: campanha.imagemURL || null,
    });
  };
  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setNewImageFile(null);
    setNewImagePreview(null);
  };
  // Lidar com seleção de arquivo
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Validar tipo
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      await showModal({
        type: 'warning',
        title: 'Tipo de Arquivo Inválido',
        message: 'Tipo de arquivo não suportado. Use: JPG, PNG, WebP ou PDF',
        confirmText: 'OK',
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      await showModal({
        type: 'warning',
        title: 'Arquivo Muito Grande',
        message: 'O arquivo excede o tamanho máximo de 10MB',
        confirmText: 'OK',
      });
      return;
    }
    setNewImageFile(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setNewImagePreview(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setNewImagePreview("PDF");
    }
  };
  const handleRemoveNewImage = () => {
    setNewImageFile(null);
    setNewImagePreview(null);
  };
  const handleSaveEdit = async (id) => {
    try {
      setUploadingImage(true);
      let updatedData = { ...editForm };
      if (!currentUser?.uid && !userData?.uid) {
        await showModal({
          type: 'error',
          title: 'Erro de Autenticação',
          message: 'Usuário não autenticado. Faça login novamente.',
          confirmText: 'OK',
        });
        return;
      }
      if (newImageFile) {
        const userId = currentUser?.uid || userData?.uid;
        const uploadResult = await uploadArquivo(newImageFile, userId);
        updatedData.imagemURL = uploadResult.url;
        updatedData.imagemCaminho = uploadResult.caminho;
      }
      await atualizarCampanha(id, updatedData);
      setCampanhas((prev) =>
        prev.map((c) =>
          c.id === id
            ? {
                ...c,
                ...updatedData,
                dataInicio: updatedData.dataInicio
                  ? new Date(updatedData.dataInicio)
                  : null,
                dataFim: updatedData.dataFim
                  ? new Date(updatedData.dataFim)
                  : null,
              }
            : c
        )
      );
      setEditingId(null);
      setEditForm({});
      setNewImageFile(null);
      setNewImagePreview(null);

      await showModal({
        type: 'success',
        title: 'Campanha Atualizada',
        message: 'As alterações foram salvas com sucesso.',
        confirmText: 'OK',
      });
    } catch (err) {
      console.error("Erro ao atualizar campanha:", err);
      await showModal({
        type: 'error',
        title: 'Erro ao Atualizar',
        message: `Não foi possível atualizar a campanha: ${err.message}`,
        confirmText: 'OK',
      });
    } finally {
      setUploadingImage(false);
    }
  };
  // Funções para criação manual
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
    setCreateForm({
      titulo: "",
      subtitulo: "",
      descricao: "",
      categoria: "campanha",
      urgente: false,
      destaque: false,
      exibirNaHomepage: false,
      local: "",
      horario: "",
      publicoAlvo: "",
      contato: "",
      cta: "Saiba Mais",
      paginaDestino: "home",
      dataInicio: "",
      dataFim: "",
      imagemURL: null,
    });
    setCreateImageFile(null);
    setCreateImagePreview(null);
    setCreateImageFiles([]);
    setCreateImagePreviews([]);
  };
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setCreateForm({});
    setCreateImageFile(null);
    setCreateImagePreview(null);
    setCreateImageFiles([]);
    setCreateImagePreviews([]);
  };
  const handleCreateFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    const validFiles = [];
    const newPreviews = [];
    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        alert(`Arquivo ${file.name} não suportado. Use: JPG, PNG, WebP ou PDF`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(`Arquivo ${file.name} muito grande. Máximo: 10MB`);
        continue;
      }
      validFiles.push(file);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCreateImagePreviews((prev) => [...prev, e.target.result]);
        };
        reader.readAsDataURL(file);
      } else {
        newPreviews.push("PDF");
      }
    }
    setCreateImageFiles((prev) => [...prev, ...validFiles]);
    if (newPreviews.length > 0) {
      setCreateImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };
  const handleRemoveCreateImage = (index) => {
    setCreateImageFiles((prev) => prev.filter((_, i) => i !== index));
    setCreateImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };
  const handleCreateCampanha = async () => {
    if (
      createImageFiles.length === 0 &&
      !createForm.titulo &&
      !createForm.descricao
    ) {
      await showModal({
        type: 'warning',
        title: 'Campos Obrigatórios',
        message: 'Por favor, adicione pelo menos uma imagem OU preencha título/descrição.',
        confirmText: 'OK',
      });
      return;
    }
    try {
      setCreatingCampanha(true);
      let campanhaData = { ...createForm };
      if (createImageFiles.length > 0) {
        const userId = currentUser?.uid || userData?.uid;

        if (!userId) {
          throw new Error('Usuário não autenticado');
        }

        const uploadedImages = [];

        for (let i = 0; i < createImageFiles.length; i++) {
          const file = createImageFiles[i];
          try {
            const uploadResult = await uploadArquivo(file, userId);
            uploadedImages.push({
              url: uploadResult.url,
              caminho: uploadResult.caminho,
            });
          } catch (uploadError) {
            throw new Error(`Erro ao enviar ${file.name}: ${uploadError.message}`);
          }
        }

        if (uploadedImages.length === 1) {
          campanhaData.imagemURL = uploadedImages[0].url;
          campanhaData.imagemCaminho = uploadedImages[0].caminho;
        } else {
          campanhaData.imagemURL = uploadedImages[0].url;
          campanhaData.imagemCaminho = uploadedImages[0].caminho;
          campanhaData.imagens = uploadedImages;
        }
      }
      campanhaData.dataInicio = campanhaData.dataInicio
        ? new Date(campanhaData.dataInicio)
        : null;
      campanhaData.dataFim = campanhaData.dataFim
        ? new Date(campanhaData.dataFim)
        : null;
      campanhaData.criadoPor = currentUser?.uid || userData?.uid;
      campanhaData.criadoEm = new Date();
      campanhaData.ativo = true;
      await criarCampanha(campanhaData);

      await showModal({
        type: 'success',
        title: 'Campanha Criada',
        message: 'A campanha foi criada e publicada com sucesso!',
        confirmText: 'OK',
      });

      handleCloseCreateModal();
      await loadCampanhas();
    } catch (err) {
      console.error("Erro ao criar campanha:", err);
      await showModal({
        type: 'error',
        title: 'Erro ao Criar Campanha',
        message: `Não foi possível criar a campanha: ${err.message}`,
        confirmText: 'OK',
      });
    } finally {
      setCreatingCampanha(false);
    }
  };
  const campanhasFiltradas = campanhas.filter((campanha) => {
    const matchSearch =
      searchTerm === "" ||
      campanha.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campanha.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    // Filtro de categoria
    const matchCategoria =
      filterCategoria === "todas" || campanha.categoria === filterCategoria;
    const matchStatus =
      filterStatus === "todas" ||
      (filterStatus === "ativas" && campanha.ativo) ||
      (filterStatus === "inativas" && !campanha.ativo);
    return matchSearch && matchCategoria && matchStatus;
  });
  return (
    <AdminLayout>
      <div className="min-h-screen bg-neutral-50">
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-neutral-900">
                  Gerenciar Campanhas
                </h1>
                <p className="text-neutral-600 text-sm">
                  Edite, ative/desative ou exclua campanhas
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleOpenCreateModal}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Nova Campanha
                </button>
              </div>
            </div>
            {}
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Buscar por título ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {}
                <div>
                  <select
                    value={filterCategoria}
                    onChange={(e) => setFilterCategoria(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="todas">Todas Categorias</option>
                    <option value="vacina">Vacina</option>
                    <option value="material">Material</option>
                    <option value="campanha">Campanha</option>
                  </select>
                </div>
                {}
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="todas">Todos Status</option>
                    <option value="ativas">Ativas</option>
                    <option value="inativas">Inativas</option>
                  </select>
                </div>
              </div>
            </div>
            {}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                <p className="text-sm text-neutral-600 mb-1">
                  Total de Campanhas
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {campanhas.length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                <p className="text-sm text-neutral-600 mb-1">Ativas</p>
                <p className="text-2xl font-bold text-success">
                  {campanhas.filter((c) => c.ativo).length}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-4">
                <p className="text-sm text-neutral-600 mb-1">Inativas</p>
                <p className="text-2xl font-bold text-error">
                  {campanhas.filter((c) => !c.ativo).length}
                </p>
              </div>
            </div>
            {}
            {loading && (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-info border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-neutral-600">Carregando campanhas...</p>
              </div>
            )}
            {error && (
              <div className="bg-error/10 border border-red-200 rounded-lg p-4 text-red-700">
                <strong>Erro:</strong> {error}
              </div>
            )}
            {}
            {!loading && !error && (
              <div className="space-y-4">
                {campanhasFiltradas.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-12 text-center">
                    <FileText className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                    <p className="text-neutral-600">
                      Nenhuma campanha encontrada
                    </p>
                  </div>
                ) : (
                  campanhasFiltradas.map((campanha) => (
                    <div
                      key={campanha.id}
                      className={`bg-white rounded-xl shadow-sm border ${
                        campanha.ativo
                          ? "border-green-200"
                          : "border-neutral-200"
                      } overflow-hidden`}
                    >
                      {editingId === campanha.id ? (
                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-neutral-900">
                              Editando Campanha
                            </h3>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveEdit(campanha.id)}
                                disabled={uploadingImage}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm disabled:bg-green-400 disabled:cursor-not-allowed flex items-center gap-2"
                              >
                                {uploadingImage ? (
                                  <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Salvando...
                                  </>
                                ) : (
                                  "Salvar"
                                )}
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                disabled={uploadingImage}
                                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Cancelar
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {}
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Imagem ou PDF da Campanha
                              </label>
                              {}
                              <div className="space-y-3">
                                {}
                                {!newImagePreview && editForm.imagemURL && (
                                  <div className="relative">
                                    <img
                                      src={editForm.imagemURL}
                                      alt="Imagem atual"
                                      className="w-full max-w-md h-48 object-cover rounded-lg border border-neutral-300"
                                    />
                                    <p className="text-xs text-neutral-500 mt-1">
                                      Imagem atual
                                    </p>
                                  </div>
                                )}
                                {}
                                {newImagePreview &&
                                  newImagePreview !== "PDF" && (
                                    <div className="relative">
                                      <img
                                        src={newImagePreview}
                                        alt="Nova imagem"
                                        className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-blue-500"
                                      />
                                      <button
                                        onClick={handleRemoveNewImage}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                        type="button"
                                      >
                                        <XIcon className="w-4 h-4" />
                                      </button>
                                      <p className="text-xs text-info font-medium mt-1">
                                        Nova imagem (será salva ao clicar em
                                        Salvar)
                                      </p>
                                    </div>
                                  )}
                                {}
                                {newImagePreview === "PDF" && (
                                  <div className="relative p-4 border-2 border-blue-500 rounded-lg bg-info/10">
                                    <div className="flex items-center gap-3">
                                      <FileText className="w-10 h-10 text-info" />
                                      <div className="flex-1">
                                        <p className="text-sm font-medium text-info">
                                          {newImageFile?.name}
                                        </p>
                                        <p className="text-xs text-info">
                                          PDF selecionado (será salvo ao clicar
                                          em Salvar)
                                        </p>
                                      </div>
                                      <button
                                        onClick={handleRemoveNewImage}
                                        className="p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                                        type="button"
                                      >
                                        <XIcon className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                                {}
                                <div>
                                  <input
                                    type="file"
                                    id="file-upload"
                                    accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor="file-upload"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-info-700 transition-colors cursor-pointer text-sm"
                                  >
                                    <Upload className="w-4 h-4" />
                                    {newImageFile
                                      ? "Trocar Arquivo"
                                      : "Anexar Nova Imagem/PDF"}
                                  </label>
                                  <p className="text-xs text-neutral-500 mt-1">
                                    Formatos: JPG, PNG, WebP, PDF (máx 10MB)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Título *
                              </label>
                              <input
                                type="text"
                                value={editForm.titulo}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    titulo: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Subtítulo
                              </label>
                              <input
                                type="text"
                                value={editForm.subtitulo}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    subtitulo: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Descrição *
                              </label>
                              <textarea
                                value={editForm.descricao}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    descricao: e.target.value,
                                  })
                                }
                                rows={4}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Categoria
                              </label>
                              <select
                                value={editForm.categoria}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    categoria: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="vacina">Vacina</option>
                                <option value="material">Material</option>
                                <option value="campanha">Campanha</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Página Destino
                              </label>
                              <select
                                value={editForm.paginaDestino}
                                onChange={(e) => {
                                  const novaPagina = e.target.value;
                                  setEditForm({
                                    ...editForm,
                                    paginaDestino: novaPagina,
                                    exibirNaHomepage: novaPagina === "home",
                                  });
                                }}
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="home">Homepage</option>
                                <optgroup label="Serviços">
                                  {allPages
                                    .filter((p) => p.category === "services")
                                    .map((page) => (
                                      <option key={page.id} value={page.id}>
                                        {page.title}
                                      </option>
                                    ))}
                                </optgroup>
                              </select>
                              <p className="text-xs text-neutral-500 mt-1">
                                Escolha onde esta campanha será exibida
                              </p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Local
                              </label>
                              <input
                                type="text"
                                value={editForm.local}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    local: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Horário
                              </label>
                              <input
                                type="text"
                                value={editForm.horario}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    horario: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Público-Alvo
                              </label>
                              <input
                                type="text"
                                value={editForm.publicoAlvo}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    publicoAlvo: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Contato
                              </label>
                              <input
                                type="text"
                                value={editForm.contato}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    contato: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Data Início
                              </label>
                              <input
                                type="date"
                                value={editForm.dataInicio}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    dataInicio: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Data Fim
                              </label>
                              <input
                                type="date"
                                value={editForm.dataFim}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    dataFim: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-neutral-700 mb-1">
                                Texto do Botão
                              </label>
                              <input
                                type="text"
                                value={editForm.cta}
                                onChange={(e) =>
                                  setEditForm({
                                    ...editForm,
                                    cta: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={editForm.urgente}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      urgente: e.target.checked,
                                    })
                                  }
                                  className="w-4 h-4 text-info"
                                />
                                <span className="text-sm font-medium text-neutral-700">
                                  Marcar como urgente
                                </span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={editForm.destaque}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      destaque: e.target.checked,
                                    })
                                  }
                                  className="w-4 h-4 text-info"
                                />
                                <span className="text-sm font-medium text-neutral-700">
                                  Destacar campanha
                                </span>
                              </label>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={editForm.exibirNaHomepage}
                                  onChange={(e) =>
                                    setEditForm({
                                      ...editForm,
                                      exibirNaHomepage: e.target.checked,
                                    })
                                  }
                                  className="w-4 h-4 text-info"
                                />
                                <span className="text-sm font-medium text-neutral-700">
                                  Exibir na homepage
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col md:flex-row">
                          {}
                          {campanha.imagemURL && (
                            <div className="md:w-1/3 bg-neutral-100">
                              <img
                                src={campanha.imagemURL}
                                alt={campanha.titulo}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                          )}
                          {}
                          <div
                            className={`flex-1 p-6 ${campanha.imagemURL ? "md:w-2/3" : "w-full"}`}
                          >
                            {}
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span
                                    className={`text-xs font-semibold px-2 py-1 rounded ${
                                      campanha.categoria === "vacina"
                                        ? "bg-info/10 text-primary-700"
                                        : campanha.categoria === "material"
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-success/10 text-green-700"
                                    }`}
                                  >
                                    {campanha.categoria}
                                  </span>
                                  {campanha.urgente && (
                                    <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded flex items-center gap-1">
                                      <AlertTriangle className="w-3 h-3" />
                                      Urgente
                                    </span>
                                  )}
                                  {campanha.destaque && (
                                    <span className="text-xs font-semibold px-2 py-1 bg-yellow-100 text-yellow-700 rounded flex items-center gap-1">
                                      <Star className="w-3 h-3" />
                                      Destaque
                                    </span>
                                  )}
                                  <span
                                    className={`text-xs font-semibold px-2 py-1 rounded ${
                                      campanha.ativo
                                        ? "bg-success/10 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {campanha.ativo ? "Ativa" : "Inativa"}
                                  </span>
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-1">
                                  {campanha.titulo}
                                </h3>
                                {campanha.subtitulo && (
                                  <p className="text-sm text-neutral-600 italic mb-2">
                                    {campanha.subtitulo}
                                  </p>
                                )}
                                <p className="text-sm text-neutral-700 mb-3">
                                  {campanha.descricao}
                                </p>
                                {}
                                <div className="space-y-1 text-xs text-neutral-600">
                                  {campanha.dataInicio && (
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-3 h-3" />
                                      <span>
                                        {campanha.dataInicio.toLocaleDateString(
                                          "pt-BR"
                                        )}
                                        {campanha.dataFim &&
                                          ` até ${campanha.dataFim.toLocaleDateString("pt-BR")}`}
                                      </span>
                                    </div>
                                  )}
                                  {campanha.local && (
                                    <div className="flex items-center gap-2">
                                      <MapPin className="w-3 h-3" />
                                      <span>{campanha.local}</span>
                                    </div>
                                  )}
                                  {campanha.publicoAlvo && (
                                    <div className="flex items-center gap-2">
                                      <Users className="w-3 h-3" />
                                      <span>{campanha.publicoAlvo}</span>
                                    </div>
                                  )}
                                  {campanha.contato && (
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-3 h-3" />
                                      <span>{campanha.contato}</span>
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2">
                                    <ExternalLink className="w-3 h-3" />
                                    <span>
                                      Página: {campanha.paginaDestino || "home"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {}
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200">
                              {}
                              {(isAdmin ||
                                (isProfissional &&
                                  campanha.criadoPor === currentUser?.uid)) && (
                                <button
                                  onClick={() => handleEdit(campanha)}
                                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-info-700 transition-colors text-sm"
                                >
                                  <Edit className="w-4 h-4" />
                                  Editar
                                </button>
                              )}
                              {(isAdmin ||
                                (isProfissional &&
                                  campanha.criadoPor === currentUser?.uid)) && (
                                <button
                                  onClick={() =>
                                    handleToggleAtivo(
                                      campanha.id,
                                      campanha.ativo
                                    )
                                  }
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm ${
                                    campanha.ativo
                                      ? "bg-yellow-600 text-white hover:bg-yellow-700"
                                      : "bg-green-600 text-white hover:bg-green-700"
                                  }`}
                                >
                                  {campanha.ativo ? (
                                    <>
                                      <EyeOff className="w-4 h-4" />
                                      Desativar
                                    </>
                                  ) : (
                                    <>
                                      <Eye className="w-4 h-4" />
                                      Ativar
                                    </>
                                  )}
                                </button>
                              )}
                              {(isAdmin ||
                                (isProfissional &&
                                  campanha.criadoPor === currentUser?.uid)) && (
                                <button
                                  onClick={() => handleDelete(campanha.id)}
                                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                  title="Deletar permanentemente"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Deletar
                                </button>
                              )}
                              {}
                              {isDiretoria && (
                                <div className="text-sm text-neutral-500 italic py-2">
                                  👁️ Diretoria: Você pode visualizar todas as
                                  campanhas, mas não pode editar ou deletar
                                </div>
                              )}
                              {}
                              {isProfissional &&
                                campanha.criadoPor !== currentUser?.uid && (
                                  <div className="text-sm text-neutral-400 italic py-2">
                                    🔒 Esta campanha foi criada por outro
                                    profissional
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal de Criação Manual */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-neutral-900">
                Criar Nova Campanha Manualmente
              </h2>
              <button
                onClick={handleCloseCreateModal}
                disabled={creatingCampanha}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Upload de Múltiplas Imagens */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Imagens ou PDFs da Campanha (Múltiplas)
                </label>
                <div className="space-y-3">
                  {/* Grid de Previews */}
                  {createImagePreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {createImagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          {preview !== "PDF" ? (
                            <>
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg border-2 border-blue-500"
                              />
                              <button
                                onClick={() => handleRemoveCreateImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                                type="button"
                              >
                                <XIcon className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <div className="relative p-3 border-2 border-blue-500 rounded-lg bg-info/10 h-32 flex flex-col items-center justify-center">
                              <FileText className="w-8 h-8 text-info mb-1" />
                              <p className="text-xs text-info text-center">
                                {createImageFiles[index]?.name}
                              </p>
                              <button
                                onClick={() => handleRemoveCreateImage(index)}
                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                                type="button"
                              >
                                <XIcon className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      id="create-file-upload"
                      accept="image/jpeg,image/jpg,image/png,image/webp,application/pdf"
                      onChange={handleCreateFileSelect}
                      className="hidden"
                      multiple
                    />
                    <label
                      htmlFor="create-file-upload"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-info-700 transition-colors cursor-pointer text-sm"
                    >
                      <Upload className="w-4 h-4" />
                      {createImageFiles.length > 0
                        ? `Adicionar Mais (${createImageFiles.length} selecionadas)`
                        : "Selecionar Imagens/PDFs"}
                    </label>
                    <p className="text-xs text-neutral-500 mt-1">
                      Formatos: JPG, PNG, WebP, PDF (máx 10MB cada) - Selecione múltiplos arquivos
                    </p>
                  </div>
                </div>
              </div>
              {/* Formulário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={createForm.titulo}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, titulo: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o título da campanha (opcional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    value={createForm.subtitulo}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        subtitulo: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Subtítulo (opcional)"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    value={createForm.descricao}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        descricao: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Descreva a campanha (opcional)..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={createForm.categoria}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        categoria: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vacina">Vacina</option>
                    <option value="material">Material</option>
                    <option value="campanha">Campanha</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Página Destino
                  </label>
                  <select
                    value={createForm.paginaDestino}
                    onChange={(e) => {
                      const novaPagina = e.target.value;
                      setCreateForm({
                        ...createForm,
                        paginaDestino: novaPagina,
                        exibirNaHomepage: novaPagina === "home",
                      });
                    }}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="home">Homepage</option>
                    <optgroup label="Serviços">
                      {allPages
                        .filter((p) => p.category === "services")
                        .map((page) => (
                          <option key={page.id} value={page.id}>
                            {page.title}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Local
                  </label>
                  <input
                    type="text"
                    value={createForm.local}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, local: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: UBS Catalão"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Horário
                  </label>
                  <input
                    type="text"
                    value={createForm.horario}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, horario: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: 08h às 12h"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Público-Alvo
                  </label>
                  <input
                    type="text"
                    value={createForm.publicoAlvo}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        publicoAlvo: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Gestantes, Idosos"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Contato
                  </label>
                  <input
                    type="text"
                    value={createForm.contato}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, contato: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: (35) 3333-3333"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Data Início
                  </label>
                  <input
                    type="date"
                    value={createForm.dataInicio}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        dataInicio: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Data Fim
                  </label>
                  <input
                    type="date"
                    value={createForm.dataFim}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, dataFim: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={createForm.cta}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, cta: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ex: Saiba Mais"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={createForm.urgente}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          urgente: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-info"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Marcar como urgente
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={createForm.destaque}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          destaque: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-info"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Destacar campanha
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={createForm.exibirNaHomepage}
                      onChange={(e) =>
                        setCreateForm({
                          ...createForm,
                          exibirNaHomepage: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-info"
                    />
                    <span className="text-sm font-medium text-neutral-700">
                      Exibir na homepage
                    </span>
                  </label>
                </div>
              </div>
              {/* Botões */}
              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                <button
                  onClick={handleCreateCampanha}
                  disabled={creatingCampanha}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {creatingCampanha ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Criando...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Criar Campanha
                    </>
                  )}
                </button>
                <button
                  onClick={handleCloseCreateModal}
                  disabled={creatingCampanha}
                  className="px-4 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

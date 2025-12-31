import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import BackButton from "../../components/common/BackButton";
import { useFeedbacks } from "../../hooks/useFeedbacks";
import { useModal } from "../../contexts/ModalContext";
import { Lightbulb, Send } from "lucide-react";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function Sugestoes() {
  const navigate = useNavigate();
  const { createFeedback } = useFeedbacks();
  const { showModal } = useModal();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
    categoria: "",
    anonimo: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    if (!email) return true;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateTelefone = (telefone) => {
    if (!telefone) return true;
    const re = /^[\d\s\(\)\-]+$/;
    return re.test(telefone) && telefone.replace(/\D/g, "").length >= 10;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.anonimo && !formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório";
    } else if (!formData.anonimo && formData.nome.trim().length < 3) {
      newErrors.nome = "Nome deve ter pelo menos 3 caracteres";
    }

    if (!formData.categoria) {
      newErrors.categoria = "Categoria é obrigatória";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (formData.telefone && !validateTelefone(formData.telefone)) {
      newErrors.telefone = "Telefone inválido";
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = "Mensagem é obrigatória";
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await createFeedback({
        tipo: "sugestao",
        nome: formData.anonimo ? "" : formData.nome.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone.trim(),
        mensagem: formData.mensagem.trim(),
        categoria: formData.categoria,
        anonimo: formData.anonimo,
      });

      if (result.success) {
        await showModal({
          type: "success",
          title: "Sugestão Enviada!",
          message: "Obrigado! Sua sugestão foi enviada com sucesso. Analisaremos sua ideia e consideraremos para melhorias!",
          confirmText: "Entendi",
        });

        setFormData({
          nome: "",
          email: "",
          telefone: "",
          mensagem: "",
          categoria: "",
          anonimo: false,
        });

        navigate("/ouvidoria");
      } else {
        await showModal({
          type: "error",
          title: "Erro ao Enviar",
          message: result.error || "Ocorreu um erro ao enviar sua sugestão. Tente novamente.",
          confirmText: "Fechar",
        });
      }
    } catch (error) {
      await showModal({
        type: "error",
        title: "Erro ao Enviar",
        message: "Ocorreu um erro inesperado. Tente novamente.",
        confirmText: "Fechar",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-6">
        <BackButton />
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Lightbulb size={32} className="text-yellow-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Enviar Sugestão
          </h1>
          <p className="text-lg text-neutral-600">
            Compartilhe ideias para melhorias em grupos, serviços ou processos.
            Sua contribuição é valiosa!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Nome <span className="text-error">*</span>
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              disabled={formData.anonimo}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.nome ? "border-error" : "border-neutral-300"
              } ${formData.anonimo ? "bg-neutral-100" : ""}`}
              placeholder="Seu nome completo"
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-error">{errors.nome}</p>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                name="anonimo"
                checked={formData.anonimo}
                onChange={handleChange}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-semibold text-neutral-900">
                Enviar anonimamente
              </span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Categoria <span className="text-error">*</span>
            </label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.categoria ? "border-error" : "border-neutral-300"
              }`}
            >
              <option value="">Selecione uma categoria</option>
              <option value="grupo">Grupo</option>
              <option value="melhoria">Melhoria</option>
              <option value="outro">Outro</option>
            </select>
            {errors.categoria && (
              <p className="mt-1 text-sm text-error">{errors.categoria}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.email ? "border-error" : "border-neutral-300"
              }`}
              placeholder="seu@email.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Telefone
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.telefone ? "border-error" : "border-neutral-300"
              }`}
              placeholder="(37) 99999-9999"
            />
            {errors.telefone && (
              <p className="mt-1 text-sm text-error">{errors.telefone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              Mensagem <span className="text-error">*</span>
            </label>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                errors.mensagem ? "border-error" : "border-neutral-300"
              }`}
              placeholder="Descreva sua sugestão aqui..."
            />
            {errors.mensagem && (
              <p className="mt-1 text-sm text-error">{errors.mensagem}</p>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              Mínimo de 10 caracteres
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Enviar Sugestão</span>
              </>
            )}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}














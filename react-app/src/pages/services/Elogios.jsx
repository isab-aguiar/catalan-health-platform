import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../../components/layout";
import { BackButton, LoadingSpinner } from "../../components/common";
import { useFeedbacks } from "../../hooks/useFeedbacks";
import { useModal } from "../../contexts/ModalContext";
import { Smile, Send } from "lucide-react";

export default function Elogios() {
  const navigate = useNavigate();
  const { createFeedback } = useFeedbacks();
  const { showModal } = useModal();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
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
        tipo: "elogio",
        nome: formData.anonimo ? "" : formData.nome.trim(),
        email: formData.email.trim(),
        telefone: formData.telefone.trim(),
        mensagem: formData.mensagem.trim(),
        anonimo: formData.anonimo,
      });

      if (result.success) {
        await showModal({
          type: "success",
          title: "Elogio Enviado!",
          message: "Obrigado! Seu elogio foi enviado com sucesso. Sua opinião é muito importante para nós!",
          confirmText: "Entendi",
        });

        setFormData({
          nome: "",
          email: "",
          telefone: "",
          mensagem: "",
          anonimo: false,
        });

        navigate("/ouvidoria");
      } else {
        await showModal({
          type: "error",
          title: "Erro ao Enviar",
          message: result.error || "Ocorreu um erro ao enviar seu elogio. Tente novamente.",
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
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Smile size={32} className="text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Enviar Elogio
          </h1>
          <p className="text-lg text-neutral-600">
            Compartilhe experiências positivas e reconheça o trabalho da nossa
            equipe. Seu feedback é muito importante!
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
              placeholder="Compartilhe seu elogio aqui..."
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Enviar Elogio</span>
              </>
            )}
          </button>
        </form>
      </div>
    </PageContainer>
  );
}



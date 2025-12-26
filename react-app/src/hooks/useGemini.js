import { useState, useCallback, useRef } from "react";
import {
  sendMessageToGemini,
  analyzeImageForCampanha,
  reformulateToFormal,
  refineCompanhaWithNLP,
} from "../services/geminiService";
import { prepararParaIA } from "../services/uploadService";
import { uploadArquivo } from "../services/uploadService";
import { criarCampanha } from "../services/campanhasService";
import { useInteractiveForm } from "./useInteractiveForm";
export function useGemini() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastGeneratedAviso, setLastGeneratedAviso] = useState(null);
  const [draftCampanha, setDraftCampanha] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [refinementHistory, setRefinementHistory] = useState([]);
  const abortControllerRef = useRef(null);
  const interactiveForm = useInteractiveForm();
  const cancelProcessing = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      const cancelMsg = {
        id: Date.now(),
        role: "assistant",
        content: "Processamento cancelado pelo usuário.",
        isError: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, cancelMsg]);
      setLoading(false);
      setError("Cancelado");
    }
  }, []);
  const sendMessage = useCallback(
    async (userMessage, userId = null) => {
      console.log("🟣 useGemini sendMessage recebeu:", userMessage);
      console.log("🟣 userId:", userId);
      const isObject =
        typeof userMessage === "object" &&
        userMessage !== null &&
        !Array.isArray(userMessage);
      const texto = isObject ? userMessage.texto || "" : userMessage || "";
      const arquivo = isObject ? userMessage.arquivo : null;
      console.log("📝 Texto extraído:", texto);
      console.log("📎 Arquivo extraído:", arquivo);
      // Se já está carregando, cancelar
      if (loading && abortControllerRef.current) {
        console.log("⚠️ Já está carregando, cancelando...");
        cancelProcessing();
        return null;
      }
      // Se o fluxo interativo estiver ativo, processar resposta
      if (interactiveForm.isActive) {
        console.log("📝 Fluxo interativo ativo, processando resposta...");
        const result = interactiveForm.processAnswer(texto);
        // Adicionar mensagem do usuário
        const userMsg = {
          id: Date.now(),
          role: "user",
          content: texto,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        if (result.error) {
          const errorMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content: `❌ ${result.error}\n\n${result.question}`,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMsg]);
          return null;
        }
        if (result.completed) {
          const completedMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content:
              "✅ Informações coletadas com sucesso!\n\n**Resumo:**\n" +
              `📍 Página: ${result.data.paginaDestino === "home" ? "Homepage" : result.data.paginaDestino}\n` +
              `📌 Título: ${result.data.titulo}\n` +
              `📄 Descrição: ${result.data.descricao.substring(0, 100)}...\n` +
              `🏷️ Categoria: ${result.data.categoria}\n\n` +
              'Deseja criar este conteúdo agora? (Digite "sim" para confirmar)',
            avisoData: result.data,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, completedMsg]);
          setLastGeneratedAviso(result.data);
          return result.data;
        }
        const nextMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: `**Passo ${result.step}/${result.total}**\n\n${result.question}${result.isOptional ? "\n\n_(Opcional - deixe em branco para pular)_" : ""}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, nextMsg]);
        return null;
      }
      const lowerMsg = texto.trim().toLowerCase();
      if (
        lowerMsg === "criar aviso" ||
        lowerMsg === "novo aviso" ||
        lowerMsg === "criar campanha"
      ) {
        console.log("🆕 Comando detectado: iniciar fluxo interativo");
        const userMsg = {
          id: Date.now(),
          role: "user",
          content: texto,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        const flow = interactiveForm.startFlow();
        const aiMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: `✨ Ótimo! Vou fazer algumas perguntas para criar seu ${lowerMsg.includes("campanha") ? "campanha" : "aviso"} profissional.\n\n**Passo ${flow.step}/${flow.total}**\n\n${flow.question}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        return null;
      }
      abortControllerRef.current = new AbortController();
      if (arquivo) {
        console.log("📸 Detectado arquivo, chamando sendCampanha...");
        console.log("📸 Arquivo:", arquivo);
        return await sendCampanha({ arquivo, texto }, userId);
      }
      console.log("💬 Processando como mensagem de texto...");
      if (!texto.trim()) {
        console.error("❌ Mensagem vazia");
        setError("Mensagem não pode estar vazia");
        return null;
      }
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: texto,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);
      setLastGeneratedAviso(null);
      try {
        const result = await sendMessageToGemini(texto);
        if (result.success) {
          if (result.isConversation) {
            const aiMsg = {
              id: Date.now() + 1,
              role: "assistant",
              content: result.message,
              timestamp: new Date(),
            };
            setMessages((prev) => [...prev, aiMsg]);
            return null;
          }
          const aiMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content: "Aviso gerado com sucesso! Confira abaixo:",
            avisoData: result.data,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMsg]);
          setLastGeneratedAviso(result.data);
          return result.data;
        } else {
          const errorMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content: `Erro: ${result.error}`,
            isError: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMsg]);
          setError(result.error);
          return null;
        }
      } catch (err) {
        if (err.name === "AbortError" || err.message.includes("cancelado")) {
          return null;
        }
        const errorMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: "Erro inesperado ao processar sua mensagem.",
          isError: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
        setError("Erro inesperado");
        return null;
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [loading, cancelProcessing]
  );
  const sendCampanha = useCallback(
    async (data, userId) => {
      const { arquivo, texto } = data;
      if (!arquivo) {
        setError("Nenhum arquivo fornecido");
        return null;
      }
      const userMsg = {
        id: Date.now(),
        role: "user",
        content: texto || "Enviei uma imagem para análise",
        hasFile: true,
        fileName: arquivo.name,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);
      setLastGeneratedAviso(null);
      try {
        const arquivoPreparado = await prepararParaIA(arquivo);
        const uploadResult = await uploadArquivo(arquivo, userId);
        if (!uploadResult.sucesso) {
          throw new Error("Falha no upload do arquivo");
        }
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Timeout: A API demorou muito para responder. Tente uma imagem menor ou mais simples."
                )
              ),
            30000
          )
        );
        const result = await Promise.race([
          analyzeImageForCampanha(
            arquivoPreparado.base64,
            arquivoPreparado.mimeType,
            texto || ""
          ),
          timeoutPromise,
        ]);
        if (result.success) {
          // NÃO criar campanha ainda - apenas mostrar SUGESTÃO para refinamento
          const campanhaData = {
            ...result.data,
            imagemURL: uploadResult.url,
            imagemCaminho: uploadResult.caminho, // Adicionar caminho do Storage
          };
          // Salvar como rascunho para edição colaborativa
          setDraftCampanha(campanhaData);
          setUploadedFile(uploadResult);
          // Criar mensagem da IA com SUGESTÃO
          const aiMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content:
              '📋 Análise concluída! Criei uma sugestão profissional de campanha.\n\n✏️ COMANDOS DE REFINAMENTO:\n\n📝 Conteúdo:\n• "Mude o título para: [novo título]"\n• "Encurte a descrição"\n• "Adicione que é gratuito"\n\n📍 Local e Horário:\n• "Local: ESF Catalão - Sala de Vacinas"\n• "Horário: 8h às 17h, segunda a sexta"\n\n👥 Público e Datas:\n• "Público-alvo: gestantes"\n• "De 15 a 20 de janeiro de 2025"\n\n⚙️ Configurações:\n• "Marcar como urgente"\n• "Exibir na página de vacinas"\n• "Botão com texto: Agende Agora"\n• "Adicionar telefone (35) 3333-3333"\n\n✅ Quando estiver satisfeito, clique em "Publicar Campanha"',
            campanhaData: campanhaData,
            isDraft: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMsg]);
          return campanhaData;
        } else {
          const isDev = import.meta.env.DEV;
          const debugInfo =
            isDev && result.rawResponse
              ? `\n\n🔍 Debug (apenas em desenvolvimento):\n${result.rawResponse.substring(0, 500)}${result.rawResponse.length > 500 ? "..." : ""}`
              : "";
          const errorMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content: `Erro: ${result.error}${debugInfo}`,
            isError: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMsg]);
          setError(result.error);
          return null;
        }
      } catch (err) {
        if (err.name === "AbortError" || err.message.includes("cancelado")) {
          return null;
        }
        console.error("❌ Erro ao processar campanha:", err);
        let errorMessage = err.message;
        if (err.message.includes("Firebase Storage não configurado")) {
          errorMessage =
            "⚠️ Firebase Storage não está configurado!\n\n" +
            "Configure as regras de segurança primeiro:\n" +
            "1. Acesse: https://console.firebase.google.com/\n" +
            "2. Vá em Storage > Rules\n" +
            "3. Veja o arquivo: docs/CONFIGURAR-FIREBASE-STORAGE.md\n\n" +
            "Após configurar, tente novamente.";
        }
        const errorMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: errorMessage,
          isError: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    },
    [loading, cancelProcessing]
  );
  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setLastGeneratedAviso(null);
  }, []);
  const clearLastAviso = useCallback(() => {
    setLastGeneratedAviso(null);
  }, []);
  const refineCampanha = useCallback(
    async (feedback) => {
      if (!draftCampanha) {
        setError("Nenhuma campanha em edição");
        return null;
      }

      const userMsg = {
        id: Date.now(),
        role: "user",
        content: feedback,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);

      try {
        const history = refinementHistory.slice(-5).map((item) => ({
          instruction: item.instruction,
          changes: item.changes,
          timestamp: item.timestamp,
        }));

        const result = await refineCompanhaWithNLP(
          draftCampanha,
          feedback,
          history
        );

        if (result.clarification_needed) {
          const clarificationMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content:
              `🤔 ${result.question}\n\n` +
              `**Sugestões:**\n` +
              result.suggestions.map((s) => `• ${s}`).join("\n"),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, clarificationMsg]);
          return null;
        }

        if (result.success && result.data) {
          const campanhaAtualizada = {
            ...draftCampanha,
            ...result.data,
          };
          setDraftCampanha(campanhaAtualizada);

          setRefinementHistory((prev) => [
            ...prev,
            {
              instruction: feedback,
              changes: result.changes || [],
              timestamp: Date.now(),
            },
          ]);

          const aiMsg = {
            id: Date.now() + 1,
            role: "assistant",
            content:
              `✅ Campanha atualizada!\n\n` +
              `📝 **Mudanças aplicadas:** ${result.changes?.join(", ") || "nenhuma"}\n` +
              `💡 ${result.reasoning}\n` +
              `🎯 **Confiança:** ${result.confidence}%\n\n` +
              `Pode pedir mais ajustes ou clicar em "Publicar Campanha".`,
            campanhaData: campanhaAtualizada,
            isDraft: true,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMsg]);
          return campanhaAtualizada;
        }

        throw new Error(result.error || "Resposta inesperada da IA");
      } catch (err) {
        const errorMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: `❌ Erro ao refinar: ${err.message}. Tente reformular seu pedido.`,
          isError: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [draftCampanha, refinementHistory]
  );
  const publishCampanha = useCallback(
    async (userId) => {
      if (!draftCampanha) {
        setError("Nenhuma campanha para publicar");
        return null;
      }
      setLoading(true);
      setError(null);
      try {
        const campanhaResult = await criarCampanha(
          draftCampanha,
          userId,
          draftCampanha.imagemURL
        );
        const successMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: "🎉 Campanha publicada com sucesso na página inicial!",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMsg]);
        setDraftCampanha(null);
        setUploadedFile(null);
        setRefinementHistory([]);
        return {
          ...draftCampanha,
          id: campanhaResult.id,
        };
      } catch (err) {
        const errorMsg = {
          id: Date.now() + 1,
          role: "assistant",
          content: `Erro ao publicar campanha: ${err.message}`,
          isError: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
        setError(err.message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [draftCampanha]
  );
  return {
    messages,
    loading,
    error,
    lastGeneratedAviso,
    draftCampanha,
    sendMessage,
    clearMessages,
    clearLastAviso,
    cancelProcessing,
    refineCampanha,
    publishCampanha,
  };
}

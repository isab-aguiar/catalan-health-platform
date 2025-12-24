// =========================================
// HOOK useCampanhaFlow
// =========================================
// Gerencia o fluxo interativo de criação de campanhas com botões

import { useState, useCallback } from 'react';
import { allPages } from '../data/services';

/**
 * Definição das etapas do fluxo de criação de campanha
 */
const CAMPAIGN_STEPS = {
  page_selection: {
    id: 'page_selection',
    message: '📍 **Selecione a página de destino da campanha:**',
    type: 'buttons',
    field: 'paginaDestino',
    buttons: [
      { id: 'home', label: '🏠 Homepage', value: 'home' },
      { id: 'vacinas', label: '💉 Vacinas', value: 'vacinas' },
      ...allPages
        .filter(p => p.category === 'services' && p.id !== 'vacinas')
        .slice(0, 8)
        .map(p => ({
          id: p.id,
          label: `${p.icon || '📋'} ${p.title}`,
          value: p.id
        }))
    ],
    nextStep: 'date_start',
    required: true
  },

  date_start: {
    id: 'date_start',
    message: '📅 **Data de início da campanha:**',
    hint: 'Deixe em branco se não houver data específica',
    type: 'date',
    field: 'dataInicio',
    nextStep: 'date_end',
    required: false
  },

  date_end: {
    id: 'date_end',
    message: '📅 **Data de término da campanha (opcional):**',
    hint: 'Deixe em branco se for campanha contínua',
    type: 'date',
    field: 'dataFim',
    nextStep: 'title',
    required: false
  },

  title: {
    id: 'title',
    message: '📝 **Digite o título da campanha:**',
    hint: 'Escreva naturalmente. Vou reformular para linguagem profissional.',
    type: 'text',
    field: 'titulo',
    maxLength: 80,
    placeholder: 'Ex: vem tomar vacina da gripe',
    nextStep: 'title_approval',
    required: true,
    needsReformulation: true
  },

  title_approval: {
    id: 'title_approval',
    message: '✅ **Título reformulado:**',
    type: 'approval',
    field: 'titulo',
    buttons: [
      { id: 'accept', label: '✅ Aceitar', value: 'accept', variant: 'success' },
      { id: 'edit', label: '✏️ Editar novamente', value: 'edit', variant: 'secondary' }
    ],
    nextStep: 'subtitle',
    backStep: 'title'
  },

  subtitle: {
    id: 'subtitle',
    message: '📝 **Subtítulo (opcional):**',
    hint: 'Complemente o título com informações adicionais',
    type: 'text',
    field: 'subtitulo',
    maxLength: 100,
    placeholder: 'Ex: proteja você e sua família',
    nextStep: 'subtitle_approval',
    required: false,
    needsReformulation: true,
    canSkip: true
  },

  subtitle_approval: {
    id: 'subtitle_approval',
    message: '✅ **Subtítulo reformulado:**',
    type: 'approval',
    field: 'subtitulo',
    buttons: [
      { id: 'accept', label: '✅ Aceitar', value: 'accept', variant: 'success' },
      { id: 'edit', label: '✏️ Editar novamente', value: 'edit', variant: 'secondary' }
    ],
    nextStep: 'description',
    backStep: 'subtitle'
  },

  description: {
    id: 'description',
    message: '📄 **Descrição completa da campanha:**',
    hint: 'Explique detalhadamente. Vou reformular para linguagem profissional.',
    type: 'textarea',
    field: 'descricao',
    maxLength: 500,
    rows: 4,
    placeholder: 'Ex: a vacina da gripe tá disponível pra todo mundo. é de graça e tem pra toda idade',
    nextStep: 'description_approval',
    required: true,
    needsReformulation: true
  },

  description_approval: {
    id: 'description_approval',
    message: '✅ **Descrição reformulada:**',
    type: 'approval',
    field: 'descricao',
    buttons: [
      { id: 'accept', label: '✅ Aceitar', value: 'accept', variant: 'success' },
      { id: 'edit', label: '✏️ Editar novamente', value: 'edit', variant: 'secondary' }
    ],
    nextStep: 'extra_info',
    backStep: 'description'
  },

  extra_info: {
    id: 'extra_info',
    message: 'ℹ️ **Informações adicionais (opcional):**',
    hint: 'Ex: contato, horários, observações',
    type: 'textarea',
    field: 'informacoesExtras',
    maxLength: 300,
    rows: 3,
    placeholder: 'Ex: dúvidas? fala com a gente na ESF',
    nextStep: 'extra_info_approval',
    required: false,
    needsReformulation: true,
    canSkip: true
  },

  extra_info_approval: {
    id: 'extra_info_approval',
    message: '✅ **Informações adicionais reformuladas:**',
    type: 'approval',
    field: 'informacoesExtras',
    buttons: [
      { id: 'accept', label: '✅ Aceitar', value: 'accept', variant: 'success' },
      { id: 'edit', label: '✏️ Editar novamente', value: 'edit', variant: 'secondary' }
    ],
    nextStep: 'image_adjust',
    backStep: 'extra_info'
  },

  image_adjust: {
    id: 'image_adjust',
    message: '🖼️ **Deseja ajustar as imagens?**',
    type: 'buttons',
    field: 'imageAction',
    buttons: [
      { id: 'keep', label: '✓ Manter como está', value: 'keep', variant: 'success' },
      { id: 'add_more', label: '📷 Adicionar mais imagens', value: 'add_more', variant: 'secondary' },
      { id: 'reorder', label: '↻ Reordenar imagens', value: 'reorder', variant: 'secondary' }
    ],
    nextStep: 'preview',
    required: true
  },

  preview: {
    id: 'preview',
    message: '🎉 **Confira o preview da sua campanha:**',
    type: 'preview',
    buttons: [
      { id: 'publish', label: '✅ Publicar Campanha', value: 'publish', variant: 'success' },
      { id: 'refine', label: '✏️ Refinar', value: 'refine', variant: 'secondary' },
      { id: 'cancel', label: '❌ Cancelar', value: 'cancel', variant: 'danger' }
    ],
    nextStep: null // Final step
  },

  refine_menu: {
    id: 'refine_menu',
    message: '✏️ **O que deseja editar?**',
    type: 'buttons',
    buttons: [
      { id: 'edit_page', label: '📍 Editar Página', value: 'page_selection' },
      { id: 'edit_dates', label: '📅 Editar Datas', value: 'date_start' },
      { id: 'edit_title', label: '📝 Editar Título', value: 'title' },
      { id: 'edit_subtitle', label: '📝 Editar Subtítulo', value: 'subtitle' },
      { id: 'edit_description', label: '📄 Editar Descrição', value: 'description' },
      { id: 'edit_extra', label: 'ℹ️ Editar Informações Extras', value: 'extra_info' },
      { id: 'edit_images', label: '🖼️ Editar Imagens', value: 'image_adjust' },
      { id: 'back_preview', label: '« Voltar ao Preview', value: 'preview' }
    ],
    nextStep: null // Dinâmico baseado na escolha
  }
};

/**
 * Hook para gerenciar o fluxo de criação de campanha
 */
export function useCampanhaFlow() {
  const [isActive, setIsActive] = useState(false);
  const [currentStepId, setCurrentStepId] = useState('page_selection');
  const [campanhaData, setCampanhaData] = useState({});
  const [pendingReformulation, setPendingReformulation] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  /**
   * Inicia o fluxo de criação
   */
  const startFlow = useCallback((initialImage = null) => {
    setIsActive(true);
    setCurrentStepId('page_selection');
    setCampanhaData({});
    setPendingReformulation(null);

    // Se houver imagem inicial, adicionar ao array
    if (initialImage) {
      setUploadedImages([initialImage]);
    }

    return {
      step: CAMPAIGN_STEPS.page_selection,
      isFirstStep: true
    };
  }, []);

  /**
   * Processa a escolha do usuário em uma etapa
   */
  const processStep = useCallback((stepId, userInput) => {
    const step = CAMPAIGN_STEPS[stepId];

    if (!step) {
      console.error('Etapa não encontrada:', stepId);
      return null;
    }

    // Atualizar dados da campanha com o input do usuário
    if (step.field && userInput !== null && userInput !== undefined) {
      setCampanhaData(prev => ({
        ...prev,
        [step.field]: userInput
      }));
    }

    // Determinar próxima etapa
    let nextStepId = step.nextStep;

    // Se for etapa de approval e usuário escolheu editar
    if (step.type === 'approval' && userInput === 'edit') {
      nextStepId = step.backStep;
    }

    // Se chegou no final do fluxo
    if (!nextStepId) {
      return {
        step: null,
        completed: true,
        data: campanhaData
      };
    }

    const nextStep = CAMPAIGN_STEPS[nextStepId];
    setCurrentStepId(nextStepId);

    return {
      step: nextStep,
      isFirstStep: false,
      completed: false
    };
  }, [campanhaData]);

  /**
   * Salta uma etapa opcional
   */
  const skipStep = useCallback((stepId) => {
    const step = CAMPAIGN_STEPS[stepId];

    if (!step || !step.canSkip) {
      return null;
    }

    const nextStepId = step.nextStep;
    if (!nextStepId) return null;

    const nextStep = CAMPAIGN_STEPS[nextStepId];
    setCurrentStepId(nextStepId);

    return {
      step: nextStep,
      skipped: true
    };
  }, []);

  /**
   * Navega para uma etapa específica (usado no menu de refinamento)
   */
  const goToStep = useCallback((stepId) => {
    const step = CAMPAIGN_STEPS[stepId];

    if (!step) {
      console.error('Etapa não encontrada:', stepId);
      return null;
    }

    setCurrentStepId(stepId);

    return {
      step: step,
      isEdit: true
    };
  }, []);

  /**
   * Salva uma reformulação pendente
   */
  const saveReformulation = useCallback((field, reformulatedText) => {
    setPendingReformulation({ field, text: reformulatedText });
  }, []);

  /**
   * Aceita a reformulação e avança
   */
  const acceptReformulation = useCallback(() => {
    if (!pendingReformulation) return null;

    setCampanhaData(prev => ({
      ...prev,
      [pendingReformulation.field]: pendingReformulation.text
    }));

    setPendingReformulation(null);

    // Avançar para próxima etapa
    const currentStep = CAMPAIGN_STEPS[currentStepId];
    const nextStepId = currentStep.nextStep;

    if (!nextStepId) return null;

    const nextStep = CAMPAIGN_STEPS[nextStepId];
    setCurrentStepId(nextStepId);

    return {
      step: nextStep
    };
  }, [pendingReformulation, currentStepId]);

  /**
   * Adiciona mais imagens
   */
  const addImages = useCallback((newImages) => {
    setUploadedImages(prev => [...prev, ...newImages]);
  }, []);

  /**
   * Reordena imagens
   */
  const reorderImages = useCallback((newOrder) => {
    setUploadedImages(newOrder);
  }, []);

  /**
   * Remove uma imagem
   */
  const removeImage = useCallback((index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  /**
   * Reseta o fluxo
   */
  const resetFlow = useCallback(() => {
    setIsActive(false);
    setCurrentStepId('page_selection');
    setCampanhaData({});
    setPendingReformulation(null);
    setUploadedImages([]);
  }, []);

  /**
   * Obtém o step atual
   */
  const getCurrentStep = useCallback(() => {
    return CAMPAIGN_STEPS[currentStepId];
  }, [currentStepId]);

  return {
    // Estado
    isActive,
    currentStepId,
    currentStep: getCurrentStep(),
    campanhaData,
    pendingReformulation,
    uploadedImages,

    // Ações
    startFlow,
    processStep,
    skipStep,
    goToStep,
    saveReformulation,
    acceptReformulation,
    addImages,
    reorderImages,
    removeImage,
    resetFlow,

    // Constantes
    STEPS: CAMPAIGN_STEPS
  };
}

export default useCampanhaFlow;

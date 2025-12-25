// =========================================
// HOOK useInteractiveForm
// =========================================
// Sistema de perguntas interativas para criar avisos/campanhas

import { useState, useCallback } from 'react';
import { allPages } from '../data/services';

/**
 * Fluxo de perguntas para criar aviso sem imagem
 */
const AVISO_FLOW = [
  {
    id: 'tipo',
    question: '**Tipo de conteúdo:**\n\n1️⃣ Aviso simples (apenas texto)\n2️⃣ Campanha (com mais detalhes)\n\nDigite 1 ou 2:',
    field: 'tipo',
    validate: (value) => ['1', '2'].includes(value),
    errorMsg: 'Digite 1 para aviso ou 2 para campanha'
  },
  {
    id: 'pagina',
    question: '**Onde exibir?**\n\nDigite o número:\n\n' +
      '0️⃣ Homepage (página inicial)\n' +
      allPages.filter(p => p.category === 'services')
        .map((p, i) => `${i + 1}️⃣ ${p.title}`)
        .join('\n'),
    field: 'paginaDestino',
    validate: (value) => {
      const num = parseInt(value);
      return num >= 0 && num <= allPages.filter(p => p.category === 'services').length;
    },
    errorMsg: 'Digite um número válido',
    transform: (value) => {
      const num = parseInt(value);
      if (num === 0) return 'home';
      const services = allPages.filter(p => p.category === 'services');
      return services[num - 1]?.id || 'home';
    }
  },
  {
    id: 'titulo',
    question: '**Título do aviso:**\n\n(Máximo 80 caracteres, seja claro e objetivo)',
    field: 'titulo',
    validate: (value) => value.trim().length >= 3 && value.trim().length <= 80,
    errorMsg: 'O título deve ter entre 3 e 80 caracteres'
  },
  {
    id: 'descricao',
    question: '**Descrição completa:**\n\n(Explique detalhadamente, máximo 500 caracteres)',
    field: 'descricao',
    validate: (value) => value.trim().length >= 10 && value.trim().length <= 500,
    errorMsg: 'A descrição deve ter entre 10 e 500 caracteres'
  },
  {
    id: 'categoria',
    question: '**Categoria:**\n\n1️⃣ Vacina\n2️⃣ Material\n3️⃣ Campanha\n\nDigite 1, 2 ou 3:',
    field: 'categoria',
    validate: (value) => ['1', '2', '3'].includes(value),
    errorMsg: 'Digite 1, 2 ou 3',
    transform: (value) => {
      const map = { '1': 'vacina', '2': 'material', '3': 'campanha' };
      return map[value];
    }
  },
  {
    id: 'homepage',
    question: '**Exibir na homepage também?**\n\n1️⃣ Sim\n2️⃣ Não\n\nDigite 1 ou 2:',
    field: 'exibirNaHomepage',
    validate: (value) => ['1', '2'].includes(value),
    errorMsg: 'Digite 1 para Sim ou 2 para Não',
    transform: (value) => value === '1',
    skip: (formData) => formData.paginaDestino === 'home' // Pula se já for homepage
  }
];

/**
 * Fluxo de perguntas adicional para campanhas (após o fluxo de aviso)
 */
const CAMPANHA_EXTRA_FLOW = [
  {
    id: 'subtitulo',
    question: '**Subtítulo (opcional):**\n\n(Deixe em branco para pular ou digite o subtítulo)',
    field: 'subtitulo',
    validate: () => true, // Sempre válido
    optional: true
  },
  {
    id: 'dataInicio',
    question: '**Data de início (opcional):**\n\n(Formato: DD/MM/AAAA ou deixe em branco)',
    field: 'dataInicio',
    validate: (value) => {
      if (!value.trim()) return true;
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(value);
    },
    errorMsg: 'Use o formato DD/MM/AAAA ou deixe em branco',
    optional: true,
    transform: (value) => {
      if (!value.trim()) return null;
      const [dia, mes, ano] = value.split('/');
      return `${ano}-${mes}-${dia}`;
    }
  },
  {
    id: 'dataFim',
    question: '**Data de término (opcional):**\n\n(Formato: DD/MM/AAAA ou deixe em branco)',
    field: 'dataFim',
    validate: (value) => {
      if (!value.trim()) return true;
      const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      return regex.test(value);
    },
    errorMsg: 'Use o formato DD/MM/AAAA ou deixe em branco',
    optional: true,
    transform: (value) => {
      if (!value.trim()) return null;
      const [dia, mes, ano] = value.split('/');
      return `${ano}-${mes}-${dia}`;
    }
  },
  {
    id: 'horario',
    question: '**Horário de funcionamento (opcional):**\n\n(Ex: 8h às 17h, segunda a sexta)',
    field: 'horario',
    validate: () => true,
    optional: true
  },
  {
    id: 'publicoAlvo',
    question: '**Público-alvo (opcional):**\n\n(Ex: Gestantes, Idosos, Crianças)',
    field: 'publicoAlvo',
    validate: () => true,
    optional: true
  },
  {
    id: 'contato',
    question: '**Contato para mais informações (opcional):**\n\n(Ex: (35) 3333-3333)',
    field: 'contato',
    validate: () => true,
    optional: true
  }
];

/**
 * Hook para formulário interativo
 */
export function useInteractiveForm() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [flowType, setFlowType] = useState(null); // 'aviso' ou 'campanha'

  /**
   * Inicia o fluxo de perguntas
   */
  const startFlow = useCallback((type = 'aviso') => {
    setIsActive(true);
    setCurrentStep(0);
    setFormData({});
    setFlowType(type);
    
    return {
      question: AVISO_FLOW[0].question,
      step: 1,
      total: AVISO_FLOW.length
    };
  }, []);

  /**
   * Processa a resposta do usuário
   */
  const processAnswer = useCallback((answer) => {
    if (!isActive) return null;

    const baseFlow = AVISO_FLOW;
    const currentQuestion = baseFlow[currentStep];

    // Validar resposta
    if (!currentQuestion.validate(answer)) {
      return {
        error: currentQuestion.errorMsg,
        question: currentQuestion.question,
        step: currentStep + 1,
        total: baseFlow.length
      };
    }

    // Transformar valor se necessário
    const value = currentQuestion.transform 
      ? currentQuestion.transform(answer)
      : answer.trim();

    // Atualizar formData
    const newFormData = {
      ...formData,
      [currentQuestion.field]: value
    };
    setFormData(newFormData);

    // Verificar se é o último passo do fluxo básico
    if (currentStep === baseFlow.length - 1) {
      // Se for campanha (tipo = '2'), continuar com perguntas extras
      if (newFormData.tipo === '2') {
        const extraFlow = CAMPANHA_EXTRA_FLOW;
        const nextQuestion = extraFlow[0];
        
        setCurrentStep(baseFlow.length); // Avança para o fluxo extra
        
        return {
          question: nextQuestion.question,
          step: baseFlow.length + 1,
          total: baseFlow.length + extraFlow.length,
          isOptional: nextQuestion.optional
        };
      } else {
        // Aviso simples - finalizar
        setIsActive(false);
        return {
          completed: true,
          data: newFormData
        };
      }
    }

    // Se estiver no fluxo extra (campanhas)
    if (currentStep >= baseFlow.length) {
      const extraStep = currentStep - baseFlow.length;
      const extraFlow = CAMPANHA_EXTRA_FLOW;
      
      if (extraStep === extraFlow.length - 1) {
        // Último passo do fluxo extra
        setIsActive(false);
        return {
          completed: true,
          data: newFormData
        };
      } else {
        // Próxima pergunta extra
        const nextQuestion = extraFlow[extraStep + 1];
        setCurrentStep(currentStep + 1);
        
        return {
          question: nextQuestion.question,
          step: currentStep + 2,
          total: baseFlow.length + extraFlow.length,
          isOptional: nextQuestion.optional
        };
      }
    }

    // Próxima pergunta do fluxo básico
    let nextStep = currentStep + 1;
    let nextQuestion = baseFlow[nextStep];
    
    // Pular perguntas se necessário
    while (nextQuestion && nextQuestion.skip && nextQuestion.skip(newFormData)) {
      nextStep++;
      nextQuestion = baseFlow[nextStep];
    }

    setCurrentStep(nextStep);

    return {
      question: nextQuestion.question,
      step: nextStep + 1,
      total: newFormData.tipo === '2' ? baseFlow.length + CAMPANHA_EXTRA_FLOW.length : baseFlow.length,
      isOptional: nextQuestion.optional
    };
  }, [isActive, currentStep, formData]);

  /**
   * Cancela o fluxo
   */
  const cancelFlow = useCallback(() => {
    setIsActive(false);
    setCurrentStep(0);
    setFormData({});
    setFlowType(null);
  }, []);

  return {
    isActive,
    currentStep,
    formData,
    flowType,
    startFlow,
    processAnswer,
    cancelFlow
  };
}

export default useInteractiveForm;




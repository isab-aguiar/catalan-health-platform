// ============================================
// ARQUIVO: recommendedReading.js
// Sistema de recomendações de leitura baseado em contexto
// ============================================

export const readingRecommendations = {
  // Serviços
  "procedimentos": {
    title: "Continue Explorando",
    subtitle: "Outros serviços que podem te interessar",
    recommendations: [
      {
        id: "sala-4",
        title: "Sala de Agendamento",
        description: "Agende consultas, exames e procedimentos",
        reason: "Para agendar os procedimentos mencionados",
        path: "/servicos/sala-4",
        category: "Próximo Passo",
        icon: "Calendar",
        color: "primary"
      },
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retire seus medicamentos prescritos",
        reason: "Para retirar medicações após consultas",
        path: "/servicos/farmacia",
        category: "Relacionado",
        icon: "PillBottle",
        color: "accent"
      },
      {
        id: "triagem",
        title: "Triagem de Enfermagem",
        description: "Atendimento de demanda espontânea",
        reason: "Para atendimento sem agendamento",
        path: "/servicos/triagem",
        category: "Alternativa",
        icon: "Stethoscope",
        color: "secondary"
      }
    ]
  },

  "sala-4": {
    title: "Continue Explorando",
    subtitle: "Serviços que você pode agendar",
    recommendations: [
      {
        id: "sala-9",
        title: "Sala de Atendimento Administrativo",
        description: "Atendimento administrativo e documentação",
        reason: "Para serviços administrativos relacionados ao agendamento",
        path: "/servicos/sala-9",
        category: "Relacionado",
        icon: "Users",
        color: "primary"
      },
      {
        id: "ecg",
        title: "Eletrocardiograma (ECG)",
        description: "Exame do coração mediante agendamento",
        reason: "Exame frequentemente solicitado",
        path: "/servicos/ecg",
        category: "Exame",
        icon: "Activity",
        color: "secondary"
      },
      {
        id: "ginecologista",
        title: "Ginecologia",
        description: "Atendimento especializado para mulheres",
        reason: "Especialidade disponível para agendamento",
        path: "/equipe/ginecologista",
        category: "Especialidade",
        icon: "Heart",
        color: "accent"
      }
    ]
  },

  "sala-9": {
    title: "Continue Explorando",
    subtitle: "Serviços relacionados ao atendimento",
    recommendations: [
      {
        id: "recepcao",
        title: "Recepção",
        description: "Primeiro atendimento e direcionamento",
        reason: "Para informações sobre fichas e documentação",
        path: "/servicos/recepcao",
        category: "Relacionado",
        icon: "Users",
        color: "primary"
      },
      {
        id: "renovacao",
        title: "Renovação de Receitas",
        description: "Renovação de receitas de uso contínuo",
        reason: "Serviço frequentemente solicitado",
        path: "/servicos/renovacao",
        category: "Serviço",
        icon: "FileText",
        color: "secondary"
      },
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retirada de medicamentos prescritos",
        reason: "Para retirar medicamentos após atendimento",
        path: "/servicos/farmacia",
        category: "Próximo Passo",
        icon: "PillBottle",
        color: "accent"
      }
    ]
  },

  "triagem": {
    title: "Continue Explorando",
    subtitle: "Outros serviços de saúde disponíveis",
    recommendations: [
      {
        id: "procedimentos",
        title: "Sala de Procedimentos",
        description: "Administração de medicamentos e procedimentos",
        reason: "Para procedimentos após triagem",
        path: "/servicos/procedimentos",
        category: "Próximo Passo",
        icon: "Pill",
        color: "green"
      },
      {
        id: "sala-4",
        title: "Sala de Agendamento",
        description: "Agende consultas e exames",
        reason: "Para marcar consulta de retorno",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "primary"
      },
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retire medicamentos prescritos",
        reason: "Para retirar medicações prescritas",
        path: "/servicos/farmacia",
        category: "Medicação",
        icon: "PillBottle",
        color: "accent"
      }
    ]
  },

  "vacinas": {
    title: "Continue Explorando",
    subtitle: "Serviços relacionados à saúde preventiva",
    recommendations: [
      {
        id: "puericultura",
        title: "Puericultura",
        description: "Acompanhamento do crescimento infantil",
        reason: "Para acompanhamento após vacinação",
        path: "/servicos/sala-4#puericultura",
        category: "Acompanhamento",
        icon: "Baby",
        color: "primary"
      },
      {
        id: "procedimentos",
        title: "Testes Rápidos",
        description: "HIV, Sífilis, Hepatites e Gravidez",
        reason: "Prevenção e detecção precoce",
        path: "/servicos/procedimentos#testes-rapidos",
        category: "Prevenção",
        icon: "TestTube2",
        color: "green"
      }
    ]
  },

  "farmacia": {
    title: "Continue Explorando",
    subtitle: "Serviços complementares à medicação",
    recommendations: [
      {
        id: "renovacao",
        title: "Renovação de Receitas",
        description: "Renove receitas de uso contínuo",
        reason: "Para renovar suas receitas",
        path: "/servicos/renovacao",
        category: "Medicação Contínua",
        icon: "FileText",
        color: "primary"
      },
      {
        id: "farmaceutica",
        title: "Consulta Farmacêutica",
        description: "Orientação sobre medicamentos",
        reason: "Para tirar dúvidas sobre medicações",
        path: "/equipe/farmaceutica",
        category: "Orientação",
        icon: "UserCircle",
        color: "accent"
      },
      {
        id: "hiperdia",
        title: "Grupo HIPERDIA",
        description: "Para hipertensos e diabéticos",
        reason: "Acompanhamento de doenças crônicas",
        path: "/grupos/hiperdia",
        category: "Grupo",
        icon: "Users",
        color: "secondary"
      }
    ]
  },

  "curativos": {
    title: "Continue Explorando",
    subtitle: "Outros cuidados de enfermagem",
    recommendations: [
      {
        id: "procedimentos",
        title: "Sala de Procedimentos",
        description: "Outros procedimentos de enfermagem",
        reason: "Para procedimentos complementares",
        path: "/servicos/procedimentos",
        category: "Procedimentos",
        icon: "Pill",
        color: "green"
      },
      {
        id: "enfermeiras",
        title: "Equipe de Enfermagem",
        description: "Conheça nossas enfermeiras",
        reason: "Profissionais responsáveis pelos curativos",
        path: "/equipe/enfermeiras",
        category: "Equipe",
        icon: "UserCircle",
        color: "primary"
      },
      {
        id: "sala-4",
        title: "Agende Retorno",
        description: "Marque avaliação de curativo",
        reason: "Para acompanhamento do tratamento",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "accent"
      }
    ]
  },

  "ecg": {
    title: "Continue Explorando",
    subtitle: "Cuidados com a saúde cardiovascular",
    recommendations: [
      {
        id: "hiperdia",
        title: "Grupo HIPERDIA",
        description: "Para hipertensos e diabéticos",
        reason: "Acompanhamento de saúde cardiovascular",
        path: "/grupos/hiperdia",
        category: "Grupo",
        icon: "Users",
        color: "secondary"
      },
      {
        id: "medicos",
        title: "Consultas Médicas",
        description: "Avaliação médica dos resultados",
        reason: "Para avaliar resultados do ECG",
        path: "/equipe/medicos",
        category: "Consulta",
        icon: "UserCircle",
        color: "primary"
      },
      {
        id: "sala-4",
        title: "Agende Consulta",
        description: "Marque retorno médico",
        reason: "Para discutir resultados",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "accent"
      }
    ]
  },

  "renovacao": {
    title: "Continue Explorando",
    subtitle: "Gestão da sua saúde contínua",
    recommendations: [
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retire seus medicamentos renovados",
        reason: "Próximo passo após renovação",
        path: "/servicos/farmacia",
        category: "Próximo Passo",
        icon: "PillBottle",
        color: "accent"
      },
      {
        id: "hiperdia",
        title: "Grupo HIPERDIA",
        description: "Acompanhamento de doenças crônicas",
        reason: "Suporte para tratamento contínuo",
        path: "/grupos/hiperdia",
        category: "Grupo",
        icon: "Users",
        color: "secondary"
      },
      {
        id: "farmaceutica",
        title: "Consulta Farmacêutica",
        description: "Orientação sobre medicamentos",
        reason: "Para otimizar seu tratamento",
        path: "/equipe/farmaceutica",
        category: "Orientação",
        icon: "UserCircle",
        color: "primary"
      }
    ]
  },

  // Equipe E-multi
  "medicos": {
    title: "Continue Explorando",
    subtitle: "Serviços médicos disponíveis",
    recommendations: [
      {
        id: "sala-4",
        title: "Agende Consulta",
        description: "Marque sua consulta médica",
        reason: "Para agendar atendimento",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "primary"
      },
      {
        id: "triagem",
        title: "Triagem de Enfermagem",
        description: "Atendimento sem agendamento",
        reason: "Para casos urgentes",
        path: "/servicos/triagem",
        category: "Urgência",
        icon: "Stethoscope",
        color: "secondary"
      },
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retire medicamentos prescritos",
        reason: "Após consulta médica",
        path: "/servicos/farmacia",
        category: "Medicação",
        icon: "PillBottle",
        color: "accent"
      }
    ]
  },

  "enfermeiras": {
    title: "Continue Explorando",
    subtitle: "Serviços de enfermagem",
    recommendations: [
      {
        id: "procedimentos",
        title: "Sala de Procedimentos",
        description: "Procedimentos realizados pela enfermagem",
        reason: "Conheça os procedimentos disponíveis",
        path: "/servicos/procedimentos",
        category: "Serviços",
        icon: "Pill",
        color: "green"
      },
      {
        id: "curativos",
        title: "Sala de Curativos",
        description: "Curativos e troca de materiais",
        reason: "Cuidados realizados pela enfermagem",
        path: "/servicos/curativos",
        category: "Cuidados",
        icon: "Bandage",
        color: "secondary"
      },
      {
        id: "vacinas",
        title: "Vacinação",
        description: "Imunização para todas as idades",
        reason: "Serviço da equipe de enfermagem",
        path: "/servicos/vacinas",
        category: "Prevenção",
        icon: "Syringe",
        color: "accent"
      }
    ]
  },

  "psicologa": {
    title: "Continue Explorando",
    subtitle: "Cuidados com a saúde mental",
    recommendations: [
      {
        id: "sala-4",
        title: "Agende Atendimento",
        description: "Marque consulta psicológica",
        reason: "Para iniciar acompanhamento",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "primary"
      },
      {
        id: "assistente-social",
        title: "Assistência Social",
        description: "Apoio social e orientações",
        reason: "Atendimento complementar",
        path: "/equipe/assistente-social",
        category: "Apoio",
        icon: "UserCircle",
        color: "accent"
      }
    ]
  },

  "ginecologista": {
    title: "Continue Explorando",
    subtitle: "Saúde da mulher",
    recommendations: [
      {
        id: "sala-4",
        title: "Agende Consulta",
        description: "Marque consulta ginecológica",
        reason: "Para atendimento especializado",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "primary"
      },
      {
        id: "procedimentos",
        title: "Teste de Gravidez",
        description: "Teste rápido disponível",
        reason: "Detecção rápida de gravidez",
        path: "/servicos/procedimentos#testes-rapidos",
        category: "Exame",
        icon: "TestTube2",
        color: "green"
      },
      {
        id: "enfermeiras",
        title: "Enfermagem",
        description: "Preventivo e orientações",
        reason: "Cuidados complementares",
        path: "/equipe/enfermeiras",
        category: "Cuidados",
        icon: "UserCircle",
        color: "accent"
      }
    ]
  },

  "farmaceutica": {
    title: "Continue Explorando",
    subtitle: "Gestão de medicamentos",
    recommendations: [
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retire seus medicamentos",
        reason: "Serviço complementar",
        path: "/servicos/farmacia",
        category: "Medicação",
        icon: "PillBottle",
        color: "accent"
      },
      {
        id: "renovacao",
        title: "Renovação de Receitas",
        description: "Renove receitas de uso contínuo",
        reason: "Para medicação contínua",
        path: "/servicos/renovacao",
        category: "Receita",
        icon: "FileText",
        color: "primary"
      },
      {
        id: "hiperdia",
        title: "Grupo HIPERDIA",
        description: "Acompanhamento farmacoterapêutico",
        reason: "Gestão de medicamentos crônicos",
        path: "/grupos/hiperdia",
        category: "Grupo",
        icon: "Users",
        color: "secondary"
      }
    ]
  },

  "dentistas": {
    title: "Continue Explorando",
    subtitle: "Cuidados com a saúde bucal",
    recommendations: [
      {
        id: "pediatra",
        title: "Pediatria",
        description: "Atendimento pediátrico e puericultura",
        reason: "Saúde bucal também é importante para crianças",
        path: "/equipe/pediatra",
        category: "Saúde Infantil",
        icon: "Baby",
        color: "primary"
      },
      {
        id: "ginecologista",
        title: "Ginecologia",
        description: "Saúde da mulher e pré-natal",
        reason: "Pré-natal odontológico e cuidados durante gestação",
        path: "/equipe/ginecologista",
        category: "Saúde da Mulher",
        icon: "Heart",
        color: "accent"
      },
      {
        id: "procedimentos",
        title: "Sala de Procedimentos",
        description: "Outros procedimentos de saúde",
        reason: "Conheça outros serviços disponíveis",
        path: "/servicos/procedimentos",
        category: "Serviços",
        icon: "Pill",
        color: "secondary"
      }
    ]
  },

  "pediatra": {
    title: "Continue Explorando",
    subtitle: "Cuidados com a saúde infantil",
    recommendations: [
      {
        id: "vacinas",
        title: "Vacinação",
        description: "Proteção através da imunização",
        reason: "Fundamental para a saúde da criança",
        path: "/servicos/vacinas",
        category: "Prevenção",
        icon: "Syringe",
        color: "primary"
      },
      {
        id: "dentistas",
        title: "Consultório Odontológico",
        description: "Saúde bucal da criança",
        reason: "Odontopediatria disponível",
        path: "/equipe/dentistas",
        category: "Saúde Bucal",
        icon: "Smile",
        color: "accent"
      },
      {
        id: "enfermeiras",
        title: "Enfermagem",
        description: "Puericultura e cuidados",
        reason: "Acompanhamento do crescimento",
        path: "/equipe/enfermeiras",
        category: "Cuidados",
        icon: "UserCircle",
        color: "secondary"
      }
    ]
  },

  "fisioterapeuta": {
    title: "Continue Explorando",
    subtitle: "Reabilitação e cuidados físicos",
    recommendations: [
      {
        id: "dores-cronicas",
        title: "Grupo de Dores Crônicas",
        description: "Apoio para pessoas com dores crônicas",
        reason: "Complementa o tratamento fisioterapêutico",
        path: "/grupos/dores-cronicas",
        category: "Grupo",
        icon: "Users",
        color: "primary"
      },
      {
        id: "medicos",
        title: "Consultas Médicas",
        description: "Avaliação e prescrição médica",
        reason: "Para avaliação e encaminhamento",
        path: "/equipe/medicos",
        category: "Consulta",
        icon: "Stethoscope",
        color: "accent"
      },
      {
        id: "sala-4",
        title: "Agende Consulta",
        description: "Marque sua consulta de fisioterapia",
        reason: "Para iniciar tratamento",
        path: "/servicos/sala-4",
        category: "Agendamento",
        icon: "Calendar",
        color: "secondary"
      }
    ]
  },

  "assistente-social": {
    title: "Continue Explorando",
    subtitle: "Apoio e orientações sociais",
    recommendations: [
      {
        id: "psicologa",
        title: "Psicologia",
        description: "Atendimento psicológico",
        reason: "Apoio emocional complementar",
        path: "/equipe/psicologa",
        category: "Apoio",
        icon: "UserCircle",
        color: "primary"
      },
      {
        id: "sala-9",
        title: "Sala de Atendimento Administrativo",
        description: "Informações sobre encaminhamentos",
        reason: "Para orientações sobre SUS",
        path: "/servicos/sala-9",
        category: "Informações",
        icon: "Users",
        color: "accent"
      }
    ]
  },

  // Grupos
  "hiperdia": {
    title: "Continue Explorando",
    subtitle: "Cuidados com doenças crônicas",
    recommendations: [
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Retire medicamentos para hipertensão/diabetes",
        reason: "Acesso a medicações essenciais",
        path: "/servicos/farmacia",
        category: "Medicação",
        icon: "PillBottle",
        color: "accent"
      },
      {
        id: "renovacao",
        title: "Renovação de Receitas",
        description: "Renove suas receitas de uso contínuo",
        reason: "Para continuidade do tratamento",
        path: "/servicos/renovacao",
        category: "Receita",
        icon: "FileText",
        color: "primary"
      },
      {
        id: "ecg",
        title: "Eletrocardiograma",
        description: "Monitore sua saúde cardiovascular",
        reason: "Exame importante para hipertensos",
        path: "/servicos/ecg",
        category: "Exame",
        icon: "Activity",
        color: "secondary"
      }
    ]
  },

  "tabagismo": {
    title: "Continue Explorando",
    subtitle: "Apoio para cessar o tabagismo",
    recommendations: [
      {
        id: "psicologa",
        title: "Psicologia",
        description: "Apoio psicológico para parar de fumar",
        reason: "Suporte emocional no processo",
        path: "/equipe/psicologa",
        category: "Apoio",
        icon: "UserCircle",
        color: "primary"
      },
      {
        id: "medicos",
        title: "Consultas Médicas",
        description: "Acompanhamento médico especializado",
        reason: "Avaliação e tratamento médico",
        path: "/equipe/medicos",
        category: "Consulta",
        icon: "Stethoscope",
        color: "secondary"
      },
      {
        id: "farmacia",
        title: "Farmácia",
        description: "Acesso a medicamentos de apoio",
        reason: "Tratamento farmacológico",
        path: "/servicos/farmacia",
        category: "Medicação",
        icon: "PillBottle",
        color: "accent"
      }
    ]
  },

  "dores-cronicas": {
    title: "Continue Explorando",
    subtitle: "Gestão da dor crônica",
    recommendations: [
      {
        id: "fisioterapeuta",
        title: "Fisioterapia",
        description: "Tratamento e reabilitação",
        reason: "Alívio e tratamento da dor",
        path: "/equipe/fisioterapeuta",
        category: "Tratamento",
        icon: "UserCircle",
        color: "primary"
      },
      {
        id: "medicos",
        title: "Consultas Médicas",
        description: "Avaliação e prescrição",
        reason: "Diagnóstico e tratamento médico",
        path: "/equipe/medicos",
        category: "Consulta",
        icon: "Stethoscope",
        color: "secondary"
      },
      {
        id: "psicologa",
        title: "Psicologia",
        description: "Gestão emocional da dor",
        reason: "Apoio psicológico",
        path: "/equipe/psicologa",
        category: "Apoio",
        icon: "Heart",
        color: "accent"
      }
    ]
  },

  // ACS e REMSA
  "acs": {
    title: "Continue Explorando",
    subtitle: "Serviços da unidade",
    recommendations: [
      {
        id: "servicos",
        title: "Todos os Serviços",
        description: "Conheça todos os serviços disponíveis",
        reason: "Explore nossa estrutura completa",
        path: "/servicos",
        category: "Serviços",
        icon: "Hospital",
        color: "primary"
      },
      {
        id: "equipe",
        title: "Equipe E-multi",
        description: "Conheça toda a equipe",
        reason: "Profissionais ao seu dispor",
        path: "/equipe",
        category: "Equipe",
        icon: "Users",
        color: "accent"
      }
    ]
  },

  "remsa": {
    title: "Continue Explorando",
    subtitle: "Serviços para adolescentes",
    recommendations: [
      {
        id: "psicologa",
        title: "Psicologia",
        description: "Atendimento psicológico para adolescentes",
        reason: "Apoio emocional especializado",
        path: "/equipe/psicologa",
        category: "Apoio",
        icon: "UserCircle",
        color: "primary"
      },
      {
        id: "assistente-social",
        title: "Assistência Social",
        description: "Orientação social para famílias",
        reason: "Suporte social",
        path: "/equipe/assistente-social",
        category: "Assistência",
        icon: "Heart",
        color: "accent"
      },
      {
        id: "educacao",
        title: "Educação em Saúde",
        description: "Palestras para adolescentes",
        reason: "Informação e prevenção",
        path: "/educacao",
        category: "Aprenda Mais",
        icon: "GraduationCap",
        color: "secondary"
      }
    ]
  },

  "prevencao-hiv": {
    title: "Continue Explorando",
    subtitle: "Outros serviços de saúde preventiva",
    recommendations: [
      {
        id: "procedimentos",
        title: "Testes Rápidos",
        description: "HIV, Sífilis, Hepatites e Gravidez",
        reason: "Testagem rápida e gratuita disponível",
        path: "/servicos/procedimentos#testes-rapidos",
        category: "Testagem",
        icon: "TestTube2",
        color: "green"
      },
      {
        id: "sala-9",
        title: "Sala de Atendimento Administrativo",
        description: "Atendimento administrativo e documentação",
        reason: "Para informações e encaminhamentos",
        path: "/servicos/sala-9",
        category: "Atendimento",
        icon: "Users",
        color: "primary"
      },
      {
        id: "psicologa",
        title: "Psicologia",
        description: "Apoio emocional e orientação",
        reason: "Suporte psicológico disponível",
        path: "/equipe/psicologa",
        category: "Apoio",
        icon: "Heart",
        color: "accent"
      }
    ]
  }
};

export function getRecommendations(pageId) {
  return readingRecommendations[pageId] || null;
}

// ============================================
// ARQUIVO: escalasTrabalho.js
// Dados das escalas de trabalho dos profissionais
// ============================================

/**
 * Estrutura de dados para escalas de trabalho
 * Cada chave representa uma estação/sala de trabalho ou agenda profissional
 */
export const escalasTrabalho = {
  // ============================================
  // ENFERMAGEM - ESCALAS DE TRABALHO
  // ============================================

  "triagem": {
    nome: "Acolhimento / Triagem",
    categoria: "Enfermagem",
    descricao: "Avaliação inicial de pacientes para classificação de risco e direcionamento adequado",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tec-enf-darlei-camargos",
        nome: "Darlei Pereira Camargos",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  "curativos": {
    nome: "Sala de Curativos",
    categoria: "Enfermagem",
    descricao: "Realização de curativos simples e complexos",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tec-enf-cristiane-assis",
        nome: "Cristiane Aparecida Silva de Assis",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-valeria-costa",
        nome: "Valeria Aparecida da Costa",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  "medicacao": {
    nome: "Sala de Medicação",
    categoria: "Enfermagem",
    descricao: "Administração de medicações, coleta de exames e outros procedimentos",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "12h00",
        fim: "16h00",
        display: "12h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tec-enf-valeria-costa",
        nome: "Valeria Aparecida da Costa",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-darlei-camargos",
        nome: "Darlei Pereira Camargos",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  "vacinas": {
    nome: "Sala de Vacinação",
    categoria: "Enfermagem",
    descricao: "Aplicação de vacinas do calendário nacional de imunização",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "12h00",
        fim: "17h00",
        display: "12h00 às 17h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tec-enf-thaciane-souza",
        nome: "Thaciane Aparecida de Souza",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-tatiana-pichitelli",
        nome: "Tatiana Costa Pichitelli",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  "agendamentos": {
    nome: "Sala de Agendamentos",
    categoria: "Administrativo",
    descricao: "Agendamento de consultas, exames e procedimentos",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tec-enf-isabela-aguiar",
        nome: "Isabela Botelho Aguiar",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-thaciane-souza",
        nome: "Thaciane Aparecida de Souza",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  "ecg": {
    nome: "Eletrocardiograma (ECG)",
    categoria: "Exames",
    descricao: "Realização de exames de eletrocardiograma",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "13h00",
        fim: "17h00",
        display: "13h00 às 17h00",
        ativo: false
      },
      tarde: {
        inicio: "13h00",
        fim: "17h00",
        display: "13h00 às 17h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tec-enf-isabela-aguiar",
        nome: "Isabela Botelho Aguiar",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Atendimento às Segundas, Terças, Quintas e Sextas-feiras"]
  },

  // ============================================
  // FARMÁCIA
  // ============================================

  "farmacia": {
    nome: "Farmácia",
    categoria: "Farmácia",
    descricao: "Dispensação de medicamentos e orientação farmacêutica",
    department: "farmaceutico",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "farmaceutico-marcella-melo",
        nome: "Marcella Oliveira Gama de Melo",
        funcao: "Farmacêutica",
        turno: "manha"
      },
      {
        id: "aux-serv-marinete-silva",
        nome: "Marinete Maria Silva",
        funcao: "Auxiliar de Serviços",
        turno: "manha"
      },
      {
        id: "tec-enf-fadeslaine-monteiro",
        nome: "Fadeslaine Cristina de Oliveira Monteiro",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "farmaceutico-mariana-freitas",
        nome: "Mariana Ribas Freitas",
        funcao: "Farmacêutica",
        turno: "tarde"
      },
      {
        id: "tec-enf-zulmira-moura",
        nome: "Zulmira Moura",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  // ============================================
  // ADMINISTRATIVO
  // ============================================

  "sala-administrativa": {
    nome: "Sala de Atendimento Administrativo",
    categoria: "Administrativo",
    descricao: "Consulta de posição na fila do SUS, retirada de encaminhamentos e guias",
    department: "auxiliarServicosII",
    horarios: {
      manha: {
        inicio: "08h00",
        fim: "11h00",
        display: "08h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h30",
        display: "13h00 às 16h30",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tec-enf-priscila-silva",
        nome: "Priscila Fernandes Silva",
        funcao: "Técnico de Enfermagem",
        turno: "both"
      },
      {
        id: "aux-serv-rosana-marcal",
        nome: "Rosana da Silva Marçal",
        funcao: "Auxiliar de Serviços II",
        turno: "both"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  // ============================================
  // AGENDAS MÉDICAS DETALHADAS
  // ============================================

  "agenda-medico-frederico": {
    nome: "Agenda - Dr. Frederico Pereira",
    categoria: "Médico",
    descricao: "Agenda semanal do Dr. Frederico Mendes Silva Pereira - ESF Catalão",
    department: "medicoGeneralistaPsf",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "medico-frederico-pereira",
        nome: "Dr. Frederico Mendes Silva Pereira",
        funcao: "Médico Generalista P.S.F.",
        turno: "both"
      }
    ],
    exibirNoPublico: false,
    observacoes: [
      "Segunda: Manhã e Tarde - Consulta médica",
      "Terça: Manhã e Tarde - Consulta médica",
      "Quarta: Manhã - Consulta médica / Tarde - Visita domiciliar",
      "Quinta: Manhã e Tarde - Consulta médica",
      "Sexta: Manhã - Consulta médica / Tarde - Pré-natal"
    ]
  },

  "agenda-medico-gustavo": {
    nome: "Agenda - Dr. Gustavo Trindade",
    categoria: "Médico",
    descricao: "Agenda semanal do Dr. Gustavo Cambraia Trindade - ESF Bela Vista",
    department: "medicoGeneralistaPsf",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "12h00",
        fim: "16h00",
        display: "12h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "medico-gustavo-trindade",
        nome: "Dr. Gustavo Cambraia Trindade",
        funcao: "Médico Generalista P.S.F.",
        turno: "both"
      }
    ],
    exibirNoPublico: false,
    observacoes: [
      "Segunda: Manhã e Tarde - Consulta médica",
      "Terça: Manhã - Consulta médica / Tarde - Visita domiciliar",
      "Quarta: Manhã e Tarde - Consulta médica",
      "Quinta: Manhã e Tarde - Consulta médica",
      "Sexta: Manhã e Tarde - Consulta médica"
    ]
  },

  "agenda-medico-joao": {
    nome: "Agenda - Dr. João Sousa",
    categoria: "Médico",
    descricao: "Agenda semanal do Dr. João Alves de Sousa Junior - ESF São José",
    department: "medicoGeneralistaPsf",
    horarios: {
      manha: {
        inicio: "08h00",
        fim: "12h00",
        display: "08h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "17h00",
        display: "13h00 às 17h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "medico-joao-sousa",
        nome: "Dr. João Alves de Sousa Junior",
        funcao: "Médico Generalista P.S.F.",
        turno: "both"
      }
    ],
    exibirNoPublico: false,
    observacoes: [
      "Segunda: Manhã - Consulta médica / Tarde - Pré-natal",
      "Terça: Manhã e Tarde - Consulta médica",
      "Quarta: Manhã - Consulta médica / Tarde - Pré-natal",
      "Quinta: Manhã e Tarde - Consulta médica",
      "Sexta: Manhã - Consulta médica / Tarde - Visita domiciliar"
    ]
  },

  // ============================================
  // AGENDAS DAS ENFERMEIRAS
  // ============================================

  "agenda-enfermeira-aline": {
    nome: "Agenda - Enf. Aline Rodrigues",
    categoria: "Enfermagem",
    descricao: "Agenda semanal da Enfermeira Aline Macedo Rodrigues",
    department: "enfermeiro",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "enfermeiro-aline-rodrigues",
        nome: "Aline Macedo Rodrigues",
        funcao: "Enfermeiro",
        turno: "both"
      }
    ],
    exibirNoPublico: false,
    observacoes: [
      "Segunda: Manhã - Demanda / Tarde - Preventivo",
      "Terça: Manhã - Demanda / Tarde - Pré-natal",
      "Quarta: Manhã - Demanda / Tarde - Visita domiciliar",
      "Quinta: Manhã - Demanda / Tarde - Puericultura",
      "Sexta: Manhã - Demanda / Tarde - Reunião de equipe"
    ]
  },

  "agenda-enfermeira-naiara": {
    nome: "Agenda - Enf. Naiara Simões",
    categoria: "Enfermagem",
    descricao: "Agenda semanal da Enfermeira Naiara Cristina Silva Simões",
    department: "enfermeiro",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "enfermeiro-naiara-simoes",
        nome: "Naiara Cristina Silva Simões",
        funcao: "Enfermeiro",
        turno: "both"
      }
    ],
    exibirNoPublico: false,
    observacoes: [
      "Segunda: Manhã - Demanda espontânea / Tarde - Puericultura",
      "Terça: Manhã - Demanda espontânea / Tarde - Visita domiciliar",
      "Quarta: Manhã - Demanda espontânea / Tarde - Preventivo",
      "Quinta: Manhã - Demanda espontânea / Tarde - Pré-natal + Puerperal",
      "Sexta: Manhã - Demanda espontânea / Tarde - Reunião de equipe"
    ]
  },

  "agenda-enfermeira-fabiola": {
    nome: "Agenda - Enf. Fabiola Oliveira",
    categoria: "Enfermagem",
    descricao: "Agenda semanal da Enfermeira Fabiola Cristina da Silva Oliveira",
    department: "enfermeiro",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "enfermeiro-fabiola-oliveira",
        nome: "Fabiola Cristina da Silva Oliveira",
        funcao: "Enfermeiro",
        turno: "both"
      }
    ],
    exibirNoPublico: false,
    observacoes: [
      "Segunda: Manhã - Demanda espontânea / Tarde - Pré-natal",
      "Terça: Manhã - Demanda espontânea / Tarde - Preventivo",
      "Quarta: Manhã - Demanda espontânea / Tarde - Puericultura",
      "Quinta: Manhã - Demanda espontânea / Tarde - Primeiro pré-natal / puerperal",
      "Sexta: Manhã - Demanda espontânea / Tarde - Visita domiciliar"
    ]
  },

  // ============================================
  // ODONTOLOGIA
  // ============================================

  "odonto-equipe-1": {
    nome: "Odontologia - Equipe 1",
    categoria: "Odontologia",
    descricao: "Atendimento odontológico - Equipe Dr. Helena Campos e Maycon Teixeira",
    department: "dentista",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "dentista-helena-campos",
        nome: "Dra. Helena Dias de Campos",
        funcao: "Dentista",
        turno: "both"
      },
      {
        id: "acd-maycon-teixeira",
        nome: "Maycon Alves Teixeira",
        funcao: "Atendente de Consultório Dentário",
        turno: "both"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Horário de atendimento: 07:00 às 16:00"]
  },

  "odonto-equipe-2": {
    nome: "Odontologia - Equipe 2",
    categoria: "Odontologia",
    descricao: "Atendimento odontológico - Equipe Dra. Mayra Gama e Cibele Dias",
    department: "dentista",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "dentista-mayra-gama",
        nome: "Dra. Mayra Paula Morais Gama",
        funcao: "Dentista",
        turno: "both"
      },
      {
        id: "acd-cibele-dias",
        nome: "Cibele Ribeiro Coimbra Dias",
        funcao: "Atendente de Consultório Dentário",
        turno: "both"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Horário de atendimento: 07:00 às 16:00"]
  },

  "odonto-saude-na-hora": {
    nome: "Odontologia - Saúde na Hora",
    categoria: "Odontologia",
    descricao: "Atendimento odontológico - Saúde na Hora",
    department: "dentista",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "dentista-gabriel-assuncao",
        nome: "Dr. Gabriel Couto Assunção",
        funcao: "Dentista",
        turno: "both"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["ASB a ser definido"]
  },

  // ============================================
  // SAÚDE NA HORA - TURNO NOITE
  // ============================================

  "saude-na-hora-noite": {
    nome: "Saúde na Hora - Atendimento Noturno",
    categoria: "Médico",
    descricao: "Equipe de atendimento noturno do programa Saúde na Hora",
    department: "medicoGeneralista",
    horarios: {
      manha: {
        inicio: "18h00",
        fim: "22h00",
        display: "18h00 às 22h00",
        ativo: true
      },
      tarde: {
        inicio: "18h00",
        fim: "22h00",
        display: "18h00 às 22h00",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "medico-beatriz-freitas",
        nome: "Dra. Beatriz Rodrigues de Freitas",
        funcao: "Médica",
        turno: "manha"
      },
      {
        id: "enfermeiro-talita-silva",
        nome: "Talita Ingrid Magalhães Silva",
        funcao: "Enfermeiro",
        turno: "manha"
      },
      {
        id: "tec-enf-ellen-venancio",
        nome: "Ellen Fernanda Venancio",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-alexsandra-cantinho",
        nome: "Alexsandra Gambogi Cantinho",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Atendimento de urgência e emergência no período noturno"]
  },

  "triagem-noturna": {
    nome: "Triagem - Turno Noite",
    categoria: "Enfermagem",
    descricao: "Triagem e acolhimento no período noturno (Saúde na Hora)",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "18h00",
        fim: "19h00",
        display: "18h00 às 19h00",
        ativo: true
      },
      tarde: {
        inicio: "18h00",
        fim: "19h00",
        display: "18h00 às 19h00",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tec-enf-ellen-venancio",
        nome: "Ellen Fernanda Venancio",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-alexsandra-cantinho",
        nome: "Alexsandra Gambogi Cantinho",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      }
    ],
    exibirNoPublico: true,
    observacoes: []
  },

  "vacinacao-noturna": {
    nome: "Vacinação - Turno Noite",
    categoria: "Enfermagem",
    descricao: "Sala de vacinação no período noturno (Saúde na Hora)",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "19h00",
        fim: "21h00",
        display: "19h00 às 21h00",
        ativo: true
      },
      tarde: {
        inicio: "19h00",
        fim: "21h00",
        display: "19h00 às 21h00",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tec-enf-ellen-venancio",
        nome: "Ellen Fernanda Venancio",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tec-enf-alexsandra-cantinho",
        nome: "Alexsandra Gambogi Cantinho",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Vacinação disponível no período noturno"]
  },

  // ============================================
  // ESPECIALISTAS
  // ============================================

  "ginecologista-luana": {
    nome: "Ginecologia - Dra. Luana Godoi",
    categoria: "Médico",
    descricao: "Consultas ginecológicas com Dra. Luana Nogueira Godoi",
    department: "medicoGinecologista",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: true
      },
      tarde: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "medico-gineco-luana-godoi",
        nome: "Dra. Luana Nogueira Godoi",
        funcao: "Médico Ginecologista",
        turno: "manha"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Atendimento: Segunda e Quarta-feira - 07:00 às 13:00"]
  },

  "pediatra-antonio": {
    nome: "Pediatria - Dr. Antonio Filho",
    categoria: "Médico",
    descricao: "Consultas pediátricas com Dr. Antonio Fernando Bolina Batista Filho",
    department: "medicoPediatra",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: true
      },
      tarde: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "medico-pediatra-antonio-filho",
        nome: "Dr. Antonio Fernando Bolina Batista Filho",
        funcao: "Médico Pediatra",
        turno: "manha"
      }
    ],
    exibirNoPublico: true,
    observacoes: ["Atendimento: Terça, Quarta e Quinta-feira - 07:00 às 13:00"]
  }
};

// Helper functions
export const getEscalaByKey = (key) => {
  return escalasTrabalho[key] || null;
};

export const getEscalasPublicas = () => {
  return Object.entries(escalasTrabalho)
    .filter(([_, escala]) => escala.exibirNoPublico)
    .reduce((acc, [key, escala]) => {
      acc[key] = escala;
      return acc;
    }, {});
};

export const getEscalasByDepartment = (department) => {
  return Object.entries(escalasTrabalho)
    .filter(([_, escala]) => escala.department === department)
    .reduce((acc, [key, escala]) => {
      acc[key] = escala;
      return acc;
    }, {});
};

export const getEscalasByCategoria = (categoria) => {
  return Object.entries(escalasTrabalho)
    .filter(([_, escala]) => escala.categoria === categoria)
    .reduce((acc, [key, escala]) => {
      acc[key] = escala;
      return acc;
    }, {});
};

export const getAllEscalas = () => {
  return escalasTrabalho;
};

// Categorias disponíveis
export const categorias = [
  "Enfermagem",
  "Administrativo",
  "Farmácia",
  "Médico",
  "Odontologia",
  "Exames"
];

// ============================================
// ARQUIVO: escalasTrabalhoNovo.js
// Dados atualizados das escalas de trabalho dos profissionais
// Estrutura expandida com suporte a 3 turnos e escala semanal
// ============================================

/**
 * Estrutura de dados para escalas de trabalho
 * Cada chave representa uma estação/sala de trabalho
 *
 * ORGANIZAÇÃO POR CATEGORIA:
 * 1. ENFERMAGEM - Salas de procedimentos, triagem, vacinação, curativos, etc
 * 2. MÉDICO - Atendimento médico geral, ginecologia, pediatria
 * 3. ENFERMAGEM (CONSULTÓRIOS) - Sala de atendimento de enfermagem
 * 4. ODONTOLOGIA - Atendimento odontológico
 * 5. PSICOLOGIA - Atendimento psicológico
 * 6. FARMÁCIA - Dispensação de medicamentos
 * 7. ADMINISTRATIVO - Recepção, sala administrativa, agendamentos
 * 8. EXAMES - ECG
 */
export const escalasTrabalho = {
  // ==========================================
  // CATEGORIA: ENFERMAGEM
  // ==========================================

  "sala-procedimentos": {
    nome: "Sala de Procedimentos",
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
      },
      saudeNaHora: {
        inicio: "17h00",
        fim: "22h00",
        display: "17h00 às 22h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-valeria-costa",
        nome: "Valéria Costa",
        funcao: "Técnica de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-darley-camargos",
        nome: "Darley Camargos",
        funcao: "Técnico de Enfermagem",
        turno: "tarde"
      },
      {
        id: "tecnico-enfermagem-ellen-venancio",
        nome: "Ellen Venâncio",
        funcao: "Técnica de Enfermagem",
        turno: "saudeNaHora"
      },
      {
        id: "tecnico-enfermagem-alexsandra-gambogi",
        nome: "Alexsandra Gambogi",
        funcao: "Técnica de Enfermagem",
        turno: "saudeNaHora"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Horário geral: 07:00 às 16:00", "Saúde na Hora: 17:00 às 22:00", "Segunda a sexta-feira"]
  },

  "sala-agendamentos": {
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
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-isabela-aguiar",
        nome: "Isabela Aguiar",
        funcao: "Técnica de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-thaciane-souza",
        nome: "Thaciane Souza",
        funcao: "Técnica de Enfermagem",
        turno: "tarde"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Segunda a sexta-feira"]
  },

  "triagem": {
    nome: "Acolhimento e Triagem",
    categoria: "Enfermagem",
    descricao: "Avaliação inicial de pacientes para classificação de risco e direcionamento adequado",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "08h00",
        display: "07h00 às 08h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "18h00",
        fim: "19h00",
        display: "18h00 às 19h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-darley-camargos",
        nome: "Darley Camargos",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-ellen-venancio",
        nome: "Ellen Venâncio",
        funcao: "Técnica de Enfermagem",
        turno: "saudeNaHora"
      },
      {
        id: "tecnico-enfermagem-alexsandra-gambogi",
        nome: "Alexsandra Gambogi",
        funcao: "Técnica de Enfermagem",
        turno: "saudeNaHora"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Segunda a sexta-feira"]
  },

  "sala-vacinacao": {
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
        fim: "16h00",
        display: "12h00 às 16h00",
        ativo: true
      },
      saudeNaHora: {
        inicio: "19h00",
        fim: "21h00",
        display: "19h00 às 21h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-thaciane-souza",
        nome: "Thaciane Souza",
        funcao: "Técnica de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-tatiana-costa",
        nome: "Tatiana Costa",
        funcao: "Técnica de Enfermagem",
        turno: "tarde"
      },
      {
        id: "tecnico-enfermagem-ellen-venancio",
        nome: "Ellen Venâncio",
        funcao: "Técnica de Enfermagem",
        turno: "saudeNaHora"
      },
      {
        id: "tecnico-enfermagem-alexsandra-gambogi",
        nome: "Alexsandra Gambogi",
        funcao: "Técnica de Enfermagem",
        turno: "saudeNaHora"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Horário de Atendimento: Matutina 07:00 às 17:00", "Saúde na Hora: 19:00 às 21:00", "Segunda a sexta-feira"]
  },

  "renovacao-receitas": {
    nome: "Renovação de Receitas",
    categoria: "Enfermagem",
    descricao: "Renovação de receitas de medicamentos de uso contínuo",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "09h00",
        fim: "12h00",
        display: "09h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-tatiana-costa",
        nome: "Tatiana Costa",
        funcao: "Técnica de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-cristiane-aparecida",
        nome: "Cristiane Aparecida",
        funcao: "Técnica de Enfermagem",
        turno: "tarde"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Horário de Atendimento ao Público: Manhã 07:00 às 11:00, Tarde 13:00 às 16:00", "Segunda a sexta-feira"]
  },

  "sala-curativos": {
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
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-cristiane-aparecida",
        nome: "Cristiane Aparecida",
        funcao: "Técnica de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-valeria-costa",
        nome: "Valéria Costa",
        funcao: "Técnica de Enfermagem",
        turno: "tarde"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Horário de Atendimento: Matutina 07:00 às 17:00", "Segunda a sexta-feira"]
  },

  // ==========================================
  // CATEGORIA: ADMINISTRATIVO
  // ==========================================

  "sala-administrativa": {
    nome: "Sala de Atendimento Administrativo",
    categoria: "Administrativo",
    descricao: "Atendimento administrativo geral",
    department: "auxiliarServicosII",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "12h00",
        display: "07h00 às 12h00",
        ativo: true
      },
      tarde: {
        inicio: "13h00",
        fim: "17h00",
        display: "13h00 às 17h00",
        ativo: true
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "administrativo-rosana-marcal",
        nome: "Rosana Marçal",
        funcao: "Atendente Administrativo",
        turno: "both"
      },
      {
        id: "administrativo-priscila-silva",
        nome: "Priscila Silva",
        funcao: "Atendente Administrativo",
        turno: "both"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Atendimento apenas às Segundas, Quartas e Sextas-feiras"]
  },

  // ==========================================
  // FARMÁCIA
  // ==========================================

  "farmacia": {
    nome: "Farmácia",
    categoria: "Farmácia",
    descricao: "Dispensação de medicamentos e orientação farmacêutica",
    department: "farmaceutico",
    horarios: {
      manha: {
        inicio: "07h30",
        fim: "16h00",
        display: "07h30 às 16h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "farmaceutico-marcella-oliveira",
        nome: "Marcella Oliveira",
        funcao: "Farmacêutica",
        turno: "manha"
      },
      {
        id: "farmaceutico-mariana-ribas",
        nome: "Mariana Ribas",
        funcao: "Farmacêutica",
        turno: "manha"
      },
      {
        id: "auxiliar-servicos-marinete-silva",
        nome: "Marinete Silva",
        funcao: "Auxiliar de Serviços",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-fadeslaine-cristina",
        nome: "Fadeslaine Cristina",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "tecnico-enfermagem-zulmira-moura",
        nome: "Zulmira Moura",
        funcao: "Técnico de Enfermagem",
        turno: "manha"
      },
      {
        id: "auxiliar-enfermagem-angelita-lara",
        nome: "Angelita Lara",
        funcao: "Auxiliar de Enfermagem",
        turno: "manha"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Horário especial: 07h30 às 16h00", "Segunda a sexta-feira"]
  },

  "ecg": {
    nome: "Sala de Exames de Eletrocardiograma",
    categoria: "Exames",
    descricao: "Realização de exames de eletrocardiograma",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      tarde: {
        inicio: "13h00",
        fim: "17h00",
        display: "13h00 às 17h00",
        ativo: true
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-isabela-aguiar",
        nome: "Isabela Aguiar",
        funcao: "Técnica de Enfermagem",
        turno: "tarde"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Segunda, Quarta, Quinta e Sexta-feira"]
  },

  // ==========================================
  // CONSULTÓRIOS ESPECIALIZADOS
  // ==========================================

  "sala-atendimento-ginecologico": {
    nome: "Sala de Atendimento Ginecológico/Obstétrico",
    categoria: "Médico",
    descricao: "Consultas ginecológicas e obstétricas",
    department: "medicoGinecologista",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "medico-luana-nogueira",
        nome: "Dra. Luana Nogueira",
        funcao: "Médica Ginecologista",
        turno: "manha"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Atendimento apenas às Segundas e Quartas-feiras"]
  },

  "consultorio-psicologico": {
    nome: "Sala de Atendimento Psicológico",
    categoria: "Psicologia",
    descricao: "Atendimento psicológico individual",
    department: "psicologo",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "psicologo-sandra-penha",
        nome: "Sandra de Sousa Penha",
        funcao: "Psicóloga",
        turno: "manha"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Atendimento apenas às Quartas-feiras"]
  },

  "sala-atendimento-odontologico": {
    nome: "Sala de Atendimento Odontológico",
    categoria: "Odontologia",
    descricao: "Atendimento odontológico completo - Todas as equipes",
    department: "dentista",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "16h00",
        display: "07h00 às 16h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "17h00",
        fim: "22h00",
        display: "17h00 às 22h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "dentista-helena-dias",
        nome: "Helena Dias",
        funcao: "Dentista",
        turno: "both"
      },
      {
        id: "auxiliar-bucal-maycon-alves",
        nome: "Maycon Alves",
        funcao: "Auxiliar em Saúde Bucal",
        turno: "both"
      },
      {
        id: "dentista-mayra-paula",
        nome: "Mayra Paula",
        funcao: "Dentista",
        turno: "both"
      },
      {
        id: "auxiliar-bucal-cibele-ribeiro",
        nome: "Cibele Ribeiro",
        funcao: "Auxiliar em Saúde Bucal",
        turno: "both"
      },
      {
        id: "dentista-gabriel-couto",
        nome: "Gabriel Couto",
        funcao: "Dentista",
        turno: "saudeNaHora"
      },
      {
        id: "auxiliar-bucal-placeholder",
        nome: "A definir",
        funcao: "Auxiliar em Saúde Bucal",
        turno: "saudeNaHora"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: [
      "Equipe 1 (Helena + Maycon): 07:00 às 11:00 | 12:00 às 16:00",
      "Equipe 2 (Mayra + Cibele): 07:00 às 12:00 | 13:00 às 16:00",
      "Equipe Saúde na Hora (Gabriel): 17:00 às 22:00",
      "Segunda a sexta-feira"
    ]
  },

  // ==========================================
  // SALA DE ATENDIMENTO MÉDICO
  // ==========================================

  "sala-atendimento-medico": {
    nome: "Sala de Atendimento Médico",
    categoria: "Médico",
    descricao: "Consultas médicas gerais - Todos os turnos",
    department: "medicoGeneralistaPsf",
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
      },
      saudeNaHora: {
        inicio: "19h00",
        fim: "22h00",
        display: "19h00 às 22h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "medico-joao-alves",
        nome: "Dr. João Alves",
        funcao: "Médico Generalista - ESF São José",
        turno: "both"
      },
      {
        id: "medico-frederico-mendes",
        nome: "Dr. Frederico Mendes",
        funcao: "Médico Generalista - ESF Catalão",
        turno: "both"
      },
      {
        id: "medico-gustavo-cambraia",
        nome: "Dr. Gustavo Cambraia",
        funcao: "Médico Generalista - ESF Bela Vista",
        turno: "both"
      },
      {
        id: "medico-beatriz-rodrigues",
        nome: "Dra. Beatriz Rodrigues",
        funcao: "Médica Generalista",
        turno: "saudeNaHora"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: []
  },

  "sala-atendimento-enfermagem": {
    nome: "Sala de Atendimento de Enfermagem",
    categoria: "Enfermagem",
    descricao: "Consultas de enfermagem - Todos os turnos",
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
        fim: "17h00",
        display: "13h00 às 17h00",
        ativo: true
      },
      saudeNaHora: {
        inicio: "17h00",
        fim: "22h00",
        display: "17h00 às 22h00",
        ativo: true
      }
    },
    profissionais: [
      {
        id: "enfermeiro-aline-macedo",
        nome: "Aline Macedo",
        funcao: "Enfermeira",
        turno: "both"
      },
      {
        id: "enfermeiro-naiara-simoes",
        nome: "Naiara Simões",
        funcao: "Enfermeira",
        turno: "both"
      },
      {
        id: "enfermeiro-fabiola-oliveira",
        nome: "Fabíola Oliveira",
        funcao: "Enfermeira",
        turno: "both"
      },
      {
        id: "enfermeiro-talita-magalhaes",
        nome: "Talita Ingrid Magalhães Silva",
        funcao: "Enfermeira",
        turno: "saudeNaHora"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: [
      "Aline, Naiara e Fabíola: 07:00 às 11:00 | 13:00 às 17:00",
      "Talita Ingrid: Saúde na Hora 17:00 às 22:00",
      "Segunda a sexta-feira"
    ]
  },

  "consultorio-pediatrico": {
    nome: "Sala de Atendimento Pediátrico",
    categoria: "Médico",
    descricao: "Consultas pediátricas",
    department: "medicoPediatra",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "13h00",
        display: "07h00 às 13h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      }
    },
    profissionais: [
      {
        id: "medico-antonio-bolina",
        nome: "Dr. Antonio Fernando Bolina",
        funcao: "Médico Pediatra",
        turno: "manha"
      }
    ],
    escalaSemanal: {
      habilitado: false
    },
    exibirNoPublico: true,
    observacoes: ["Atendimento apenas às Terças, Quartas e Quintas-feiras"]
  },

  // ==========================================
  // RECEPÇÃO (ESCALA SEMANAL)
  // ==========================================

  "recepcao": {
    nome: "Recepção",
    categoria: "Administrativo",
    descricao: "Atendimento inicial, cadastro e direcionamento de pacientes",
    department: "auxiliarServicosII",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "17h00",
        display: "07h00 às 17h00",
        ativo: true
      },
      tarde: {
        inicio: "",
        fim: "",
        display: "",
        ativo: false
      },
      saudeNaHora: {
        inicio: "17h00",
        fim: "22h00",
        display: "17h00 às 22h00",
        ativo: true
      }
    },
    profissionais: [],
    escalaSemanal: {
      habilitado: true,
      dias: {
        segunda: {
          profissionais: [
            {
              id: "auxiliar-servicos-denivia-santos",
              nome: "Denívea Santos",
              funcao: "Auxiliar de Serviços",
              turno: "manha"
            },
            {
              id: "acs-enes-souza",
              nome: "Enes Souza",
              funcao: "Agente Comunitário de Saúde",
              turno: "manha"
            },
            {
              id: "tecnico-enfermagem-ellen-venancio",
              nome: "Ellen Venâncio",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            },
            {
              id: "tecnico-enfermagem-alexsandra-gambogi",
              nome: "Alexsandra Gambogi",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            }
          ]
        },
        terca: {
          profissionais: [
            {
              id: "acs-wasley-borges",
              nome: "Wasley Borges",
              funcao: "Agente Comunitário de Saúde",
              turno: "manha"
            },
            {
              id: "auxiliar-servicos-denivia-santos",
              nome: "Denívea Santos",
              funcao: "Auxiliar de Serviços",
              turno: "manha"
            },
            {
              id: "tecnico-enfermagem-ellen-venancio",
              nome: "Ellen Venâncio",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            },
            {
              id: "tecnico-enfermagem-alexsandra-gambogi",
              nome: "Alexsandra Gambogi",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            }
          ]
        },
        quarta: {
          profissionais: [
            {
              id: "acs-matheus-ferreira",
              nome: "Matheus José Ferreira",
              funcao: "Agente Comunitário de Saúde",
              turno: "manha"
            },
            {
              id: "acs-erika-roscoe",
              nome: "Erika Roscoe",
              funcao: "Agente Comunitária de Saúde",
              turno: "manha"
            },
            {
              id: "auxiliar-servicos-denivia-santos",
              nome: "Denívea Santos",
              funcao: "Auxiliar de Serviços",
              turno: "manha"
            },
            {
              id: "tecnico-enfermagem-ellen-venancio",
              nome: "Ellen Venâncio",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            },
            {
              id: "tecnico-enfermagem-alexsandra-gambogi",
              nome: "Alexsandra Gambogi",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            }
          ]
        },
        quinta: {
          profissionais: [
            {
              id: "acs-davi-castro",
              nome: "Davi de Castro",
              funcao: "Agente Comunitário de Saúde",
              turno: "manha"
            },
            {
              id: "auxiliar-servicos-denivia-santos",
              nome: "Denívea Santos",
              funcao: "Auxiliar de Serviços",
              turno: "manha"
            },
            {
              id: "tecnico-enfermagem-ellen-venancio",
              nome: "Ellen Venâncio",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            },
            {
              id: "tecnico-enfermagem-alexsandra-gambogi",
              nome: "Alexsandra Gambogi",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            }
          ]
        },
        sexta: {
          profissionais: [
            {
              id: "acs-renata-rodrigues",
              nome: "Renata Rodrigues",
              funcao: "Agente Comunitária de Saúde",
              turno: "manha"
            },
            {
              id: "auxiliar-servicos-denivia-santos",
              nome: "Denívea Santos",
              funcao: "Auxiliar de Serviços",
              turno: "manha"
            },
            {
              id: "tecnico-enfermagem-ellen-venancio",
              nome: "Ellen Venâncio",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            },
            {
              id: "tecnico-enfermagem-alexsandra-gambogi",
              nome: "Alexsandra Gambogi",
              funcao: "Técnica de Enfermagem",
              turno: "saudeNaHora"
            }
          ]
        }
      }
    },
    exibirNoPublico: true,
    observacoes: ["Horário de Atendimento: 07:00 às 22:00", "Segunda a sexta-feira"]
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
  "Exames",
  "Odontologia",
  "Psicologia"
];

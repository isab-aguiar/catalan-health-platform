// ============================================
// ARQUIVO: agendasSemanais.js
// Agendas semanais dos médicos e enfermeiras
// ============================================

export const agendasSemanais = {
  medicos: [
    {
      id: "dr-joao-alves",
      nome: "Dr. João Alves",
      horarioAtendimento: {
        manha: { inicio: "08:00", fim: "12:00", display: "08:00 às 12:00" },
        tarde: { inicio: "13:00", fim: "17:00", display: "13:00 às 17:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "08:00 às 12:00", atividade: "Consulta médica" },
          { horario: "13:00 às 17:00", atividade: "Pré-natal" }
        ],
        "Terça-feira": [
          { horario: "08:00 às 12:00", atividade: "Consulta médica" },
          { horario: "13:00 às 17:00", atividade: "Consulta médica" }
        ],
        "Quarta-feira": [
          { horario: "08:00 às 12:00", atividade: "Consulta médica" },
          { horario: "13:00 às 17:00", atividade: "Pré-natal" }
        ],
        "Quinta-feira": [
          { horario: "08:00 às 12:00", atividade: "Consulta médica" },
          { horario: "13:00 às 17:00", atividade: "Consulta médica" }
        ],
        "Sexta-feira": [
          { horario: "08:00 às 12:00", atividade: "Consulta médica" },
          { horario: "13:00 às 17:00", atividade: "Visita domiciliar" }
        ]
      }
    },
    {
      id: "dr-frederico-mendes",
      nome: "Dr. Frederico Mendes",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:00", display: "07:00 às 11:00" },
        tarde: { inicio: "12:00", fim: "16:00", display: "12:00 às 16:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "07:00 às 11:00", atividade: "Consulta médica" },
          { horario: "12:00 às 16:00", atividade: "Consulta médica" }
        ],
        "Terça-feira": [
          { horario: "07:00 às 11:00", atividade: "Consulta médica" },
          { horario: "12:00 às 16:00", atividade: "Consulta médica" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 11:00", atividade: "Consulta médica" },
          { horario: "12:00 às 16:00", atividade: "Visita domiciliar" }
        ],
        "Quinta-feira": [
          { horario: "07:00 às 11:00", atividade: "Consulta médica" },
          { horario: "12:00 às 16:00", atividade: "Consulta médica" }
        ],
        "Sexta-feira": [
          { horario: "07:00 às 11:00", atividade: "Consulta médica" },
          { horario: "12:00 às 16:00", atividade: "Pré-natal" }
        ]
      }
    },
    {
      id: "dr-gustavo-cambraia",
      nome: "Dr. Gustavo Cambraia",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:30", display: "07:00 às 11:30" },
        tarde: { inicio: "12:30", fim: "16:00", display: "12:30 às 16:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "07:00 às 11:30", atividade: "Consulta médica" },
          { horario: "12:30 às 16:00", atividade: "Consulta médica" }
        ],
        "Terça-feira": [
          { horario: "07:00 às 11:30", atividade: "Consulta médica" },
          { horario: "12:30 às 16:00", atividade: "Visita domiciliar" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 11:30", atividade: "Consulta médica" },
          { horario: "12:30 às 16:00", atividade: "Consulta médica" }
        ],
        "Quinta-feira": [
          { horario: "07:00 às 11:30", atividade: "Consulta médica" },
          { horario: "12:30 às 16:00", atividade: "Consulta médica" }
        ],
        "Sexta-feira": [
          { horario: "07:00 às 11:30", atividade: "Consulta médica" },
          { horario: "12:30 às 16:00", atividade: "Consulta médica" }
        ]
      }
    }
  ],
  ginecologista: [
    {
      id: "ginecologista",
      nome: "Ginecologista",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "13:00", display: "07:00 às 13:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "07:00 às 13:00", atividade: "Atendimento" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 13:00", atividade: "Atendimento" }
        ]
      }
    }
  ],
  pediatra: [
    {
      id: "pediatra",
      nome: "Pediatra",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "13:00", display: "07:00 às 13:00" },
        tarde: { inicio: "13:00", fim: "17:00", display: "13:00 às 17:00" }
      },
      agendaSemanal: {
        "Terça-feira": [
          { horario: "07:00 às 13:00", atividade: "Atendimento" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 13:00", atividade: "Atendimento" }
        ],
        "Quinta-feira": [
          { horario: "13:00 às 17:00", atividade: "Consultas de Puericultura agendadas previamente" }
        ]
      }
    }
  ],
  fisioterapeuta: [
    {
      id: "fisioterapeuta",
      nome: "Fisioterapeuta",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:00", display: "07:00 às 11:00" }
      },
      agendaSemanal: {
        "Terça-feira": [
          { horario: "07:00 às 11:00", atividade: "Atendimento" }
        ],
        "Quinta-feira": [
          { horario: "07:00 às 11:00", atividade: "Atendimento" }
        ]
      }
    }
  ],
  psicologa: [
    {
      id: "psicologa",
      nome: "Psicóloga",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "13:00", display: "07:00 às 13:00" }
      },
      agendaSemanal: {
        "Quarta-feira": [
          { horario: "07:00 às 13:00", atividade: "Atendimento" }
        ]
      }
    }
  ],
  assistenteSocial: [
    {
      id: "assistente-social",
      nome: "Assistente Social",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:00", display: "07:00 às 11:00" }
      },
      agendaSemanal: {
        "Terça-feira": [
          { horario: "07:00 às 11:00", atividade: "Atendimento" }
        ]
      }
    }
  ],
  enfermeiras: [
    {
      id: "enf-aline-macedo",
      nome: "Enfª Aline Macedo",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:00", display: "07:00 às 11:00" },
        tarde: { inicio: "13:00", fim: "17:00", display: "13:00 às 17:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda" },
          { horario: "13:00 às 17:00", atividade: "Preventivo" }
        ],
        "Terça-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda" },
          { horario: "13:00 às 17:00", atividade: "Pré-natal" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda" },
          { horario: "13:00 às 17:00", atividade: "Visita domiciliar" }
        ],
        "Quinta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda" },
          { horario: "13:00 às 17:00", atividade: "Puericultura" }
        ],
        "Sexta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda" },
          { horario: "13:00 às 17:00", atividade: "Reunião de equipe" }
        ]
      }
    },
    {
      id: "enf-naiara-simoes",
      nome: "Enfª Naiara Simões",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:00", display: "07:00 às 11:00" },
        tarde: { inicio: "13:00", fim: "17:00", display: "13:00 às 17:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Puericultura" }
        ],
        "Terça-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Visita domiciliar" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Preventivo" }
        ],
        "Quinta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Pré-natal + Puerperal" }
        ],
        "Sexta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Reunião de equipe" }
        ]
      }
    },
    {
      id: "enf-fabiola-oliveira",
      nome: "Enfª Fabiola Oliveira",
      horarioAtendimento: {
        manha: { inicio: "07:00", fim: "11:00", display: "07:00 às 11:00" },
        tarde: { inicio: "13:00", fim: "17:00", display: "13:00 às 17:00" }
      },
      agendaSemanal: {
        "Segunda-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Pré-natal" }
        ],
        "Terça-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Preventivo" }
        ],
        "Quarta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Puericultura" }
        ],
        "Quinta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Primeiro pré-natal / puerperal" }
        ],
        "Sexta-feira": [
          { horario: "07:00 às 11:00", atividade: "Demanda espontânea" },
          { horario: "13:00 às 17:00", atividade: "Visita domiciliar" }
        ]
      }
    }
  ]
};


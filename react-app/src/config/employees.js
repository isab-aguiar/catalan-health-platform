/**
 * Configuração de Funcionários da PSF São José
 *
 * Este arquivo centraliza as informações de todos os funcionários da unidade,
 * organizados por departamento. Utilizado para exibição em páginas de equipe
 * e preparado para futura integração com Firebase Authentication.
 *
 * Estrutura:
 * - Organização por departamentos (16 departamentos, 45 funcionários)
 * - Cada funcionário possui: id, nome completo, nome de exibição, cargo, equipe ESF, horários
 * - Helper functions para busca e filtragem
 *
 * @see README.md para instruções de uso e atualização
 */

export const employees = {
  // 1. Agente Comunitário de Saúde (7 funcionários)
  agenteComunitario: {
    departmentName: 'Agente Comunitário de Saúde',
    departmentCode: 'ACS',
    employees: [
      {
        id: 'acs-daniel-ferreira',
        fullName: 'Daniel Henrique Ferreira Silva',
        displayName: 'Daniel Ferreira',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'sao-jose',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'acs-davi-faria',
        fullName: 'Davi de Castro Faria',
        displayName: 'Davi de Castro',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'sao-jose',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'acs-enes-sousa',
        fullName: 'Enes Lino Sousa Junior',
        displayName: 'Enes Souza',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'acs-erika-roscoe',
        fullName: 'Erika Roscoe',
        displayName: 'Erika Roscoe',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'sao-jose',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-31', updatedAt: '2025-12-31' }
      },
      {
        id: 'acs-matheus-ferreira',
        fullName: 'Matheus José Ferreira Alves',
        displayName: 'Matheus José Ferreira',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'acs-renata-coimbra',
        fullName: 'Renata Rodrigues Coimbra',
        displayName: 'Renata Rodrigues',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'bela-vista',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'acs-wasley-borges',
        fullName: 'Wasley Hudson Borges',
        displayName: 'Wasley Borges',
        role: 'Agente Comunitário de Saúde',
        roleBase: 'Agente Comunitário de Saúde',
        isPsf: false,
        department: 'agenteComunitario',
        esf: 'bela-vista',
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 2. Assistente Social (1 funcionário)
  assistenteSocial: {
    departmentName: 'Assistente Social',
    departmentCode: 'AS',
    employees: [
      {
        id: 'as-noelia-silva',
        fullName: 'Noelia Pereira da Silva',
        displayName: 'Noelia Pereira',
        role: 'Assistente Social',
        roleBase: 'Assistente Social',
        isPsf: false,
        department: 'assistenteSocial',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 3. Atendente de Consultório Dentário (2 funcionários)
  atendenteConsultorioDentario: {
    departmentName: 'Atendente de Consultório Dentário - P.S.F.',
    departmentCode: 'ACD',
    employees: [
      {
        id: 'acd-cibele-dias',
        fullName: 'Cibele Ribeiro Coimbra Dias',
        displayName: 'Cibele Ribeiro',
        role: 'Atendente de Consultório Dentário - P.S.F.',
        roleBase: 'Atendente de Consultório Dentário',
        isPsf: true,
        department: 'atendenteConsultorioDentario',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'acd-maycon-teixeira',
        fullName: 'Maycon Alves Teixeira',
        displayName: 'Maycon Alves',
        role: 'Atendente de Consultório Dentário - P.S.F.',
        roleBase: 'Atendente de Consultório Dentário',
        isPsf: true,
        department: 'atendenteConsultorioDentario',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '12h00', end: '16h00', display: '12h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 4. Auxiliar de Enfermagem (2 funcionários)
  auxiliarEnfermagem: {
    departmentName: 'Auxiliar de Enfermagem',
    departmentCode: 'AUX-ENF',
    employees: [
      {
        id: 'aux-enf-angelita-melo',
        fullName: 'Angelita Lara de Melo',
        displayName: 'Angelita Lara',
        role: 'Auxiliar de Enfermagem',
        roleBase: 'Auxiliar de Enfermagem',
        isPsf: false,
        department: 'auxiliarEnfermagem',
        esf: 'sao-jose',
        workStation: {
          location: 'Farmácia',
          shift: 'Manhã'
        },
        schedule: {
          morning: { start: '07h30', end: '16h00', display: '07h30 às 16h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'aux-enf-jose-lopes',
        fullName: 'Jose Ferreira Lopes',
        displayName: 'Jose Ferreira',
        role: 'Auxiliar de Enfermagem',
        roleBase: 'Auxiliar de Enfermagem',
        isPsf: false,
        department: 'auxiliarEnfermagem',
        esf: 'sao-jose',
        schedule: {
          morning: { start: '11h00', end: '17h00', display: '11h00 às 17h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 5. Auxiliar de Serviços I (1 funcionário)
  auxiliarServicosI: {
    departmentName: 'Auxiliar de Serviços I',
    departmentCode: 'AUX-SERV-1',
    employees: [
      {
        id: 'aux-serv-1-marinete-silva',
        fullName: 'Marinete Maria Silva',
        displayName: 'Marinete Silva',
        role: 'Auxiliar de Serviços I',
        roleBase: 'Auxiliar de Serviços I',
        isPsf: false,
        department: 'auxiliarServicosI',
        esf: null,
        workStation: {
          location: 'Farmácia',
          shift: 'Integral'
        },
        schedule: {
          morning: { start: '07h30', end: '16h00', display: '07h30 às 16h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 6. Auxiliar de Serviços II (2 funcionários)
  auxiliarServicosII: {
    departmentName: 'Auxiliar de Serviços II',
    departmentCode: 'AUX-SERV-2',
    employees: [
      {
        id: 'aux-serv-2-denivia-santos',
        fullName: 'Denivia Miranda Santos',
        displayName: 'Denivia Santos',
        role: 'Auxiliar de Serviços II',
        roleBase: 'Auxiliar de Serviços II',
        isPsf: false,
        department: 'auxiliarServicosII',
        esf: null,
        workStation: {
          location: 'Recepção',
          shift: 'Integral'
        },
        schedule: {
          morning: { start: '07h00', end: '17h00', display: '07h00 às 17h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'aux-serv-2-rosana-marcal',
        fullName: 'Rosana da Silva Marçal',
        displayName: 'Rosana Marçal',
        role: 'Auxiliar de Serviços II',
        roleBase: 'Auxiliar de Serviços II',
        isPsf: false,
        department: 'auxiliarServicosII',
        esf: null,
        workStation: {
          location: 'Atendimento Administrativo',
          days: ['Segunda', 'Quarta', 'Sexta']
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 7. Dentista (3 funcionários)
  dentista: {
    departmentName: 'Dentista',
    departmentCode: 'DENT',
    employees: [
      {
        id: 'dentista-gabriel-assuncao',
        fullName: 'Gabriel Couto Assunção',
        displayName: 'Dr. Gabriel Couto',
        role: 'Dentista - Saúde na Hora',
        roleBase: 'Dentista',
        isPsf: false,
        isSaudeNaHora: true,
        department: 'dentista',
        esf: null,
        schedule: {
          morning: { enabled: false },
          afternoon: { enabled: false },
          evening: { start: '17h00', end: '22h00', display: '17h00 às 22h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'dentista-helena-campos',
        fullName: 'Helena Dias de Campos',
        displayName: 'Dra. Helena Dias',
        role: 'Dentista - P.S.F.',
        roleBase: 'Dentista',
        isPsf: true,
        department: 'dentista',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '12h00', end: '16h00', display: '12h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'dentista-mayra-gama',
        fullName: 'Mayra Paula Morais Gama',
        displayName: 'Dra. Mayra Paula',
        role: 'Dentista - P.S.F.',
        roleBase: 'Dentista',
        isPsf: true,
        department: 'dentista',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 8. Enfermeiro (4 funcionários)
  enfermeiro: {
    departmentName: 'Enfermeiro',
    departmentCode: 'ENF',
    employees: [
      {
        id: 'enfermeiro-aline-rodrigues',
        fullName: 'Aline Macedo Rodrigues',
        displayName: 'Aline Macedo',
        role: 'Enfermeiro - P.S.F.',
        roleBase: 'Enfermeiro',
        isPsf: true,
        department: 'enfermeiro',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        weeklySchedule: {
          segunda: { morning: 'Demanda', afternoon: 'Preventivo' },
          terca: { morning: 'Demanda', afternoon: 'Pré-natal' },
          quarta: { morning: 'Demanda', afternoon: 'Visita domiciliar' },
          quinta: { morning: 'Demanda', afternoon: 'Puericultura' },
          sexta: { morning: 'Demanda', afternoon: 'Reunião de equipe' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'enfermeiro-fabiola-oliveira',
        fullName: 'Fabiola Cristina da Silva Oliveira',
        displayName: 'Fabiola Oliveira',
        role: 'Enfermeiro - P.S.F.',
        roleBase: 'Enfermeiro',
        isPsf: true,
        department: 'enfermeiro',
        esf: 'sao-jose',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        weeklySchedule: {
          segunda: { morning: 'Demanda espontânea', afternoon: 'Pré-natal' },
          terca: { morning: 'Demanda espontânea', afternoon: 'Preventivo' },
          quarta: { morning: 'Demanda espontânea', afternoon: 'Puericultura' },
          quinta: { morning: 'Demanda espontânea', afternoon: 'Primeiro pré-natal / puerperal' },
          sexta: { morning: 'Demanda espontânea', afternoon: 'Visita domiciliar' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'enfermeiro-naiara-simoes',
        fullName: 'Naiara Cristina Silva Simões',
        displayName: 'Naiara Simões',
        role: 'Enfermeiro - P.S.F.',
        roleBase: 'Enfermeiro',
        isPsf: true,
        department: 'enfermeiro',
        esf: 'bela-vista',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        weeklySchedule: {
          segunda: { morning: 'Demanda espontânea', afternoon: 'Puericultura' },
          terca: { morning: 'Demanda espontânea', afternoon: 'Visita domiciliar' },
          quarta: { morning: 'Demanda espontânea', afternoon: 'Preventivo' },
          quinta: { morning: 'Demanda espontânea', afternoon: 'Pré-natal + Puerperal' },
          sexta: { morning: 'Demanda espontânea', afternoon: 'Reunião de equipe' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'enfermeiro-talita-silva',
        fullName: 'Talita Ingrid Magalhães Silva',
        displayName: 'Talita Ingrid Magalhães',
        role: 'Enfermeiro - Saúde na Hora',
        roleBase: 'Enfermeiro',
        isPsf: false,
        isSaudeNaHora: true,
        department: 'enfermeiro',
        esf: null,
        schedule: {
          morning: { enabled: false },
          afternoon: { enabled: false },
          evening: { start: '17h00', end: '22h00', display: '17h00 às 22h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 9. Farmacêutico (3 funcionários)
  farmaceutico: {
    departmentName: 'Farmacêutico',
    departmentCode: 'FARM',
    employees: [
      {
        id: 'farmaceutico-marcella-melo',
        fullName: 'Marcella Oliveira Gama de Melo',
        displayName: 'Marcella Oliveira',
        role: 'Farmacêutico',
        roleBase: 'Farmacêutico',
        isPsf: false,
        department: 'farmaceutico',
        esf: null,
        schedule: {
          morning: { start: '07h30', end: '16h00', display: '07h30 às 16h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'farmaceutico-mariana-freitas',
        fullName: 'Mariana Ribas Freitas',
        displayName: 'Mariana Ribas',
        role: 'Farmacêutico',
        roleBase: 'Farmacêutico',
        isPsf: false,
        department: 'farmaceutico',
        esf: null,
        schedule: {
          morning: { start: '07h30', end: '16h00', display: '07h30 às 16h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'farmaceutico-tauany-santos',
        fullName: 'Tauany Cristyne Guerra Santos',
        displayName: 'Tauany Santos',
        role: 'Farmacêutico',
        roleBase: 'Farmacêutico',
        isPsf: false,
        department: 'farmaceutico',
        esf: null,
        schedule: {
          morning: { start: '07h30', end: '16h00', display: '07h30 às 16h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 10. Fisioterapeuta (1 funcionário)
  fisioterapeuta: {
    departmentName: 'Fisioterapeuta',
    departmentCode: 'FISIO',
    employees: [
      {
        id: 'fisioterapeuta-luana-paulo',
        fullName: 'Luana Rocha Paulo',
        displayName: 'Luana Rocha',
        role: 'Fisioterapeuta',
        roleBase: 'Fisioterapeuta',
        isPsf: false,
        department: 'fisioterapeuta',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 11. Médico Ginecologista (1 funcionário)
  medicoGinecologista: {
    departmentName: 'Médico Ginecologista',
    departmentCode: 'MED-GINECO',
    employees: [
      {
        id: 'medico-gineco-luana-godoi',
        fullName: 'Luana Nogueira Godoi',
        displayName: 'Dra. Luana Nogueira',
        role: 'Médico Ginecologista',
        roleBase: 'Médico Ginecologista',
        isPsf: false,
        department: 'medicoGinecologista',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '13h00', display: '07h00 às 13h00', enabled: true },
          afternoon: { enabled: false }
        },
        weeklySchedule: {
          segunda: { morning: 'Consulta ginecológica/obstétrica' },
          quarta: { morning: 'Consulta ginecológica/obstétrica' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 12. Médico Generalista P.S.F. (4 funcionários)
  medicoGeneralistaPsf: {
    departmentName: 'Médico Generalista - P.S.F.',
    departmentCode: 'MED-PSF',
    employees: [
      {
        id: 'medico-beatriz-freitas',
        fullName: 'Beatriz Rodrigues de Freitas',
        displayName: 'Dra. Beatriz Rodrigues',
        role: 'Médico Generalista - Saúde na Hora',
        roleBase: 'Médico Generalista',
        isPsf: true,
        isSaudeNaHora: true,
        department: 'medicoGeneralistaPsf',
        esf: null,
        schedule: {
          morning: { enabled: false },
          afternoon: { enabled: false },
          evening: { start: '19h00', end: '22h00', display: '19h00 às 22h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'medico-frederico-pereira',
        fullName: 'Frederico Mendes Silva Pereira',
        displayName: 'Dr. Frederico Mendes',
        role: 'Médico Generalista - P.S.F.',
        roleBase: 'Médico Generalista',
        isPsf: true,
        department: 'medicoGeneralistaPsf',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '12h00', end: '16h00', display: '12h00 às 16h00', enabled: true }
        },
        weeklySchedule: {
          segunda: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          terca: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          quarta: { morning: 'Consulta médica', afternoon: 'Visita domiciliar' },
          quinta: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          sexta: { morning: 'Consulta médica', afternoon: 'Pré-natal' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'medico-gustavo-trindade',
        fullName: 'Gustavo Cambraia Trindade',
        displayName: 'Dr. Gustavo Cambraia',
        role: 'Médico Generalista - P.S.F.',
        roleBase: 'Médico Generalista',
        isPsf: true,
        department: 'medicoGeneralistaPsf',
        esf: 'bela-vista',
        schedule: {
          morning: { start: '07h00', end: '11h30', display: '07h00 às 11h30', enabled: true },
          afternoon: { start: '12h30', end: '16h00', display: '12h30 às 16h00', enabled: true }
        },
        weeklySchedule: {
          segunda: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          terca: { morning: 'Consulta médica', afternoon: 'Visita domiciliar' },
          quarta: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          quinta: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          sexta: { morning: 'Consulta médica', afternoon: 'Consulta médica' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'medico-joao-sousa',
        fullName: 'João Alves de Sousa Junior',
        displayName: 'Dr. João Alves',
        role: 'Médico Generalista - P.S.F.',
        roleBase: 'Médico Generalista',
        isPsf: true,
        department: 'medicoGeneralistaPsf',
        esf: 'sao-jose',
        schedule: {
          morning: { start: '08h00', end: '12h00', display: '08h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        weeklySchedule: {
          segunda: { morning: 'Consulta médica', afternoon: 'Pré-natal' },
          terca: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          quarta: { morning: 'Consulta médica', afternoon: 'Pré-natal' },
          quinta: { morning: 'Consulta médica', afternoon: 'Consulta médica' },
          sexta: { morning: 'Consulta médica', afternoon: 'Visita domiciliar' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 13. Médico Pediatra (2 funcionários)
  medicoPediatra: {
    departmentName: 'Médico Pediatra',
    departmentCode: 'MED-PED',
    employees: [
      {
        id: 'medico-pediatra-antonio-filho',
        fullName: 'Antonio Fernando Bolina Batista Filho',
        displayName: 'Dr. Antonio Fernando Bolina',
        role: 'Médico Pediatra',
        roleBase: 'Médico Pediatra',
        isPsf: false,
        department: 'medicoPediatra',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'medico-pediatra-jessica-silva',
        fullName: 'Jéssica de Carvalho Antão da Silva',
        displayName: 'Dra. Jéssica Carvalho',
        role: 'Médico Pediatra',
        roleBase: 'Médico Pediatra',
        isPsf: false,
        department: 'medicoPediatra',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 14. Psicólogo (1 funcionário)
  psicologo: {
    departmentName: 'Psicólogo',
    departmentCode: 'PSI',
    employees: [
      {
        id: 'psicologo-sandra-menezes',
        fullName: 'Sandra de Sousa Penha Menezes',
        displayName: 'Sandra de Sousa Penha',
        role: 'Psicólogo',
        roleBase: 'Psicólogo',
        isPsf: false,
        department: 'psicologo',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '13h00', display: '07h00 às 13h00', enabled: true },
          afternoon: { enabled: false }
        },
        weeklySchedule: {
          quarta: { morning: 'Atendimento psicológico' }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 15. Técnico de Enfermagem (13 funcionários)
  tecnicoEnfermagem: {
    departmentName: 'Técnico de Enfermagem',
    departmentCode: 'TEC-ENF',
    employees: [
      {
        id: 'tec-enf-alexsandra-cantinho',
        fullName: 'Alexsandra Gambogi Cantinho',
        displayName: 'Alexsandra Gambogi',
        role: 'Técnico de Enfermagem - Saúde na Hora',
        roleBase: 'Técnico de Enfermagem',
        isPsf: false,
        isSaudeNaHora: true,
        department: 'tecnicoEnfermagem',
        esf: null,
        workStation: {
          location: 'Recepção / Triagem / Vacinação',
          shift: 'Noite'
        },
        schedule: {
          morning: { enabled: false },
          afternoon: { enabled: false },
          evening: { start: '17h00', end: '22h00', display: '17h00 às 22h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-cristiane-assis',
        fullName: 'Cristiane Aparecida Silva de Assis',
        displayName: 'Cristiane Aparecida',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'sao-jose',
        workStation: {
          morning: { location: 'Sala de Curativos' },
          afternoon: { location: 'Renovação de Receitas' }
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-darlei-camargos',
        fullName: 'Darlei Pereira Camargos',
        displayName: 'Darlei Camargos',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'sao-jose',
        workStation: {
          morning: { location: 'Triagem (07:00-08:00) / Sala de Procedimentos' },
          afternoon: { location: 'Sala de Procedimentos' }
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '12h00', end: '16h00', display: '12h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-ellen-venancio',
        fullName: 'Ellen Fernanda Venancio',
        displayName: 'Ellen Venâncio',
        role: 'Técnico de Enfermagem - Saúde na Hora',
        roleBase: 'Técnico de Enfermagem',
        isPsf: false,
        isSaudeNaHora: true,
        department: 'tecnicoEnfermagem',
        esf: null,
        workStation: {
          location: 'Recepção / Triagem / Vacinação',
          shift: 'Noite'
        },
        schedule: {
          morning: { enabled: false },
          afternoon: { enabled: false },
          evening: { start: '17h00', end: '22h00', display: '17h00 às 22h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-fadeslaine-monteiro',
        fullName: 'Fadeslaine Cristina de Oliveira Monteiro',
        displayName: 'Fadeslaine Cristina',
        role: 'Técnico de Enfermagem',
        roleBase: 'Técnico de Enfermagem',
        isPsf: false,
        department: 'tecnicoEnfermagem',
        esf: null,
        workStation: {
          location: 'Farmácia',
          shift: 'Integral'
        },
        schedule: {
          morning: { start: '07h30', end: '16h00', display: '07h30 às 16h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-isabela-aguiar',
        fullName: 'Isabela Botelho Aguiar',
        displayName: 'Isabela Aguiar',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'catalao',
        workStation: {
          morning: { location: 'Sala de Agendamento' },
          afternoon: { location: 'ECG', days: ['Segunda', 'Quarta', 'Quinta', 'Sexta'] }
        },
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-priscila-silva',
        fullName: 'Priscila Fernandes Silva',
        displayName: 'Priscila Silva',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'catalao',
        workStation: {
          location: 'Atendimento Administrativo',
          days: ['Segunda', 'Quarta', 'Sexta']
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '17h00', display: '13h00 às 17h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-renata-kelly-oliveira',
        fullName: 'Renata Kelly de Oliveira',
        displayName: 'Renata Kelly',
        role: 'Técnico de Enfermagem',
        roleBase: 'Técnico de Enfermagem',
        isPsf: false,
        department: 'tecnicoEnfermagem',
        esf: null,
        schedule: {
          morning: { start: '07h00', end: '13h00', display: '07h00 às 13h00', enabled: true },
          afternoon: { start: '', end: '', display: '', enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-renata-vieira-lopes',
        fullName: 'Renata Vieira Lopes',
        displayName: 'Renata Vieira',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'catalao',
        workStation: {
          location: 'Sala de Vacinação',
          shift: 'Manhã'
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { enabled: false }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-rita-mendonca',
        fullName: 'Rita de Cássia Mendonça',
        displayName: 'Rita Mendonça',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'bela-vista',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-tatiana-pichitelli',
        fullName: 'Tatiana Costa Pichitelli',
        displayName: 'Tatiana Costa',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'bela-vista',
        workStation: {
          morning: { location: 'Renovação de Receitas' },
          afternoon: { location: 'Sala de Vacinação' },
          shift: 'Integral'
        },
        schedule: {
          morning: { start: '09h00', end: '12h00', display: '09h00 às 12h00', enabled: true },
          afternoon: { start: '12h00', end: '17h00', display: '12h00 às 17h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-thaciane-souza',
        fullName: 'Thaciane Aparecida de Souza',
        displayName: 'Thaciane Souza',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'sao-jose',
        workStation: {
          morning: { location: 'Sala de Vacinação' },
          afternoon: { location: 'Sala de Agendamento' }
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'tec-enf-valeria-costa',
        fullName: 'Valeria Aparecida da Costa',
        displayName: 'Valéria Costa',
        role: 'Técnico de Enfermagem - P.S.F.',
        roleBase: 'Técnico de Enfermagem',
        isPsf: true,
        department: 'tecnicoEnfermagem',
        esf: 'sao-jose',
        workStation: {
          morning: { location: 'Sala de Procedimentos' },
          afternoon: { location: 'Sala de Curativos' }
        },
        schedule: {
          morning: { start: '07h00', end: '12h00', display: '07h00 às 12h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  },

  // 16. Técnico de Higiene Dental (2 funcionários)
  tecnicoHigieneDental: {
    departmentName: 'Técnico de Higiene Dental',
    departmentCode: 'THD',
    employees: [
      {
        id: 'thd-miriam-ferreira',
        fullName: 'Miriam de Jesus Ferreira',
        displayName: 'Miriam Ferreira',
        role: 'Técnico de Higiene Dental',
        roleBase: 'Técnico de Higiene Dental',
        isPsf: false,
        department: 'tecnicoHigieneDental',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      },
      {
        id: 'thd-neide-oliveira',
        fullName: 'Neide Aparecida de Sousa Oliveira',
        displayName: 'Neide Oliveira',
        role: 'Técnico de Higiene Dental - Saúde na Hora',
        roleBase: 'Técnico de Higiene Dental',
        isPsf: false,
        isSaudeNaHora: true,
        department: 'tecnicoHigieneDental',
        esf: 'catalao',
        schedule: {
          morning: { start: '07h00', end: '11h00', display: '07h00 às 11h00', enabled: true },
          afternoon: { start: '13h00', end: '16h00', display: '13h00 às 16h00', enabled: true }
        },
        contact: { phone: null, email: null },
        firebaseUid: null,
        active: true,
        metadata: { createdAt: '2025-12-29', updatedAt: '2025-12-31' }
      }
    ]
  }
};

// Helper Functions

/**
 * Retorna todos os funcionários de um departamento
 * @param {string} departmentCode - Código do departamento
 * @returns {Array} Lista de funcionários do departamento
 */
export const getDepartmentEmployees = (departmentCode) => {
  return employees[departmentCode]?.employees || [];
};

/**
 * Busca um funcionário pelo ID
 * @param {string} employeeId - ID do funcionário
 * @returns {Object|null} Dados do funcionário ou null se não encontrado
 */
export const getEmployeeById = (employeeId) => {
  for (const dept in employees) {
    const employee = employees[dept].employees?.find(emp => emp.id === employeeId);
    if (employee) return employee;
  }
  return null;
};

/**
 * Retorna todos os funcionários de uma ESF específica
 * @param {string} esfCode - Código da ESF ('sao-jose' | 'catalao' | 'bela-vista')
 * @returns {Array} Lista de funcionários da ESF
 */
export const getEmployeesByEsf = (esfCode) => {
  const result = [];
  for (const dept in employees) {
    const filtered = employees[dept].employees?.filter(emp => emp.esf === esfCode) || [];
    result.push(...filtered);
  }
  return result;
};

/**
 * Retorna todos os funcionários de um cargo específico
 * @param {string} role - Cargo do funcionário
 * @returns {Array} Lista de funcionários com o cargo especificado
 */
export const getEmployeesByRole = (role) => {
  const result = [];
  for (const dept in employees) {
    const filtered = employees[dept].employees?.filter(emp => emp.role === role) || [];
    result.push(...filtered);
  }
  return result;
};

/**
 * Retorna todos os funcionários do Saúde na Hora
 * @returns {Array} Lista de funcionários do Saúde na Hora
 */
export const getSaudeNaHoraEmployees = () => {
  const result = [];
  for (const dept in employees) {
    const filtered = employees[dept].employees?.filter(emp => emp.isSaudeNaHora === true) || [];
    result.push(...filtered);
  }
  return result;
};

/**
 * Retorna todos os funcionários ativos
 * @returns {Array} Lista de todos os funcionários
 */
export const getAllEmployees = () => {
  const result = [];
  for (const dept in employees) {
    result.push(...(employees[dept].employees || []));
  }
  return result;
};

/**
 * Retorna apenas funcionários ativos
 * @returns {Array} Lista de funcionários ativos
 */
export const getActiveEmployees = () => {
  return getAllEmployees().filter(emp => emp.active === true);
};


export const departments = Object.keys(employees).map(key => ({
  code: key,
  name: employees[key].departmentName,
  shortCode: employees[key].departmentCode
}));
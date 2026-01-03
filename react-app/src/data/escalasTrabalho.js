export const escalasTrabalho = {
  triagem: {
    nome: "Triagem",
    categoria: "Enfermagem",
    descricao:
      "Avaliação inicial de pacientes para classificação de risco e direcionamento adequado",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-alexsandra-santos",
        nome: "Alexsandra dos Santos",
        funcao: "Técnica de Enfermagem",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-ellen-silva",
        nome: "Ellen Silva",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  curativos: {
    nome: "Sala de Curativos",
    categoria: "Enfermagem",
    descricao: "Realização de curativos simples e complexos",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-cristiane-aparecida",
        nome: "Cristiane Aparecida",
        funcao: "Técnica de Enfermagem",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-fadeslaine-soares",
        nome: "Fadeslaine Soares",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  vacinas: {
    nome: "Sala de Vacinação",
    categoria: "Enfermagem",
    descricao: "Aplicação de vacinas do calendário nacional de imunização",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-renata-kelly",
        nome: "Renata Kelly",
        funcao: "Técnica de Enfermagem",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-silvania-pereira",
        nome: "Silvânia Pereira",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  procedimentos: {
    nome: "Sala de Procedimentos",
    categoria: "Enfermagem",
    descricao:
      "Administração de medicações, coleta de exames e outros procedimentos",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-darlei-vieira",
        nome: "Darlei Vieira",
        funcao: "Técnica de Enfermagem",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-valeria-cristina",
        nome: "Valéria Cristina",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  ecg: {
    nome: "Eletrocardiograma (ECG)",
    categoria: "Exames",
    descricao: "Realização de exames de eletrocardiograma",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "12h00",
        fim: "17h00",
        display: "12h00 às 17h00",
        ativo: false,
      },
      tarde: {
        inicio: "12h00",
        fim: "17h00",
        display: "12h00 às 17h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-isabela-aguiar",
        nome: "Isabela Aguiar",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  agendamentos: {
    nome: "Sala de Agendamentos",
    categoria: "Administrativo",
    descricao: "Agendamento de consultas, exames e procedimentos",
    department: "tecnicoEnfermagem",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-isabela-aguiar",
        nome: "Isabela Aguiar",
        funcao: "Técnica de Enfermagem",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-thaciane-souza",
        nome: "Thaciane Souza",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  recepcao: {
    nome: "Recepção",
    categoria: "Administrativo",
    descricao: "Atendimento inicial, cadastro e direcionamento de pacientes",
    department: "auxiliarServicosII",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "auxiliar-servicos-denivia-maria",
        nome: "Denívea Maria",
        funcao: "Auxiliar de Serviços II",
        turno: "manha",
      },
      {
        id: "auxiliar-servicos-rosana-candida",
        nome: "Rosana Cândida",
        funcao: "Auxiliar de Serviços II",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  "sala-administrativa": {
    nome: "Sala de Atendimento Administrativo",
    categoria: "Administrativo",
    descricao:
      "Consulta de posição na fila do SUS, retirada de encaminhamentos e guias",
    department: "auxiliarServicosII",
    horarios: {
      manha: {
        inicio: "08h00",
        fim: "11h00",
        display: "08h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h30",
        display: "13h00 às 16h30",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "auxiliar-servicos-priscila-santos",
        nome: "Priscila",
        funcao: "Auxiliar de Serviços II",
        turno: "both",
      },
      {
        id: "auxiliar-servicos-rosana-candida",
        nome: "Rosana",
        funcao: "Auxiliar de Serviços II",
        turno: "both",
      },
    ],
    exibirNoPublico: true,
    observacoes: ["Atendimento apenas às Segundas, Quartas e Sextas-feiras"],
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
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "tecnico-enfermagem-tatiana-costa",
        nome: "Tatiana Costa",
        funcao: "Técnica de Enfermagem",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-cristiane-aparecida",
        nome: "Cristiane Aparecida",
        funcao: "Técnica de Enfermagem",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: [],
  },
  farmacia: {
    nome: "Farmácia",
    categoria: "Farmácia",
    descricao: "Dispensação de medicamentos e orientação farmacêutica",
    department: "farmaceutico",
    horarios: {
      manha: {
        inicio: "07h30",
        fim: "16h00",
        display: "07h30 às 16h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: false,
      },
    },
    profissionais: [
      {
        id: "farmaceutico-marcella-oliveira",
        nome: "Marcella Oliveira",
        funcao: "Farmacêutica",
        turno: "manha",
      },
      {
        id: "farmaceutico-mariana-silva",
        nome: "Mariana",
        funcao: "Farmacêutica",
        turno: "tarde",
      },
      {
        id: "auxiliar-servicos-marinete-maria",
        nome: "Marinete Maria",
        funcao: "Atendente",
        turno: "manha",
      },
      {
        id: "tecnico-enfermagem-zulmira-santos",
        nome: "Zulmira",
        funcao: "Atendente",
        turno: "tarde",
      },
    ],
    exibirNoPublico: true,
    observacoes: ["Horário especial: 07h30 às 16h00 de segunda a sexta-feira"],
  },
  "medico-catalao": {
    nome: "Médico ESF Catalão",
    categoria: "Médico",
    descricao: "Consultas médicas na ESF Catalão",
    department: "medicoGeneralistaPsf",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "medico-frederico-mendes",
        nome: "Dr. Frederico",
        funcao: "Médico Generalista P.S.F.",
        turno: "both",
      },
    ],
    exibirNoPublico: false,
    observacoes: [],
  },
  "medico-sao-jose": {
    nome: "Médico ESF São José",
    categoria: "Médico",
    descricao: "Consultas médicas na ESF São José",
    department: "medicoGeneralistaPsf",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "medico-joao-sousa",
        nome: "Dr. João",
        funcao: "Médico Generalista P.S.F.",
        turno: "both",
      },
    ],
    exibirNoPublico: false,
    observacoes: [],
  },
  "medico-bela-vista": {
    nome: "Médico ESF Bela Vista",
    categoria: "Médico",
    descricao: "Consultas médicas na ESF Bela Vista",
    department: "medicoGeneralistaPsf",
    horarios: {
      manha: {
        inicio: "07h00",
        fim: "11h00",
        display: "07h00 às 11h00",
        ativo: true,
      },
      tarde: {
        inicio: "13h00",
        fim: "16h00",
        display: "13h00 às 16h00",
        ativo: true,
      },
    },
    profissionais: [
      {
        id: "medico-gustavo-cambraia",
        nome: "Dr. Gustavo",
        funcao: "Médico Generalista P.S.F.",
        turno: "both",
      },
    ],
    exibirNoPublico: false,
    observacoes: [],
  },
};

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

export const categorias = [
  "Enfermagem",
  "Administrativo",
  "Farmácia",
  "Médico",
  "Exames",
];

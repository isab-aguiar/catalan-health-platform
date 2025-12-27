// ============================================
// ARQUIVO: procedimentosMedicos.js
// Dados dos procedimentos médicos e orientações pós-consulta
// ============================================

export const procedimentosMedicos = {
  "aih": {
    nome: "AIH - Autorização de Internação Hospitalar",
    categoria: "Administrativo",
    local: "CAC - Central de Agendamento e Controle",
    orientacoes: [
      "Protocolar no CAC",
      "É necessário apresentar xerox de documentos pessoais",
      "Anexar xerox dos laudos de exames"
    ],
    documentosNecessarios: ["Documentos pessoais (xerox)", "Laudos de exames (xerox)"],
    observacoes: ["Não é necessário apresentar o pedido de risco cirúrgico"],
    filaUnica: false
  },
  "assistente-social": {
    nome: "Assistente Social",
    categoria: "Serviço Social",
    local: "Atendimento direto",
    orientacoes: [
      "Não é necessário pegar o pedido médico",
      "Informar o horário de atendimento da assistente social Luciana"
    ],
    documentosNecessarios: [],
    observacoes: ["Atendimento mediante horário agendado"],
    filaUnica: false
  },
  "audiometria-tonal-vocal": {
    nome: "Audiometria Tonal e Vocal",
    categoria: "Exames Audiológicos",
    local: "Protocolar na Unidade",
    orientacoes: [
      "São necessárias 1 cópia dos documentos pessoais",
      "Incluir cópia do encaminhamento médico",
      "Protocolar na unidade de saúde"
    ],
    documentosNecessarios: ["Documentos pessoais (1 cópia)", "Encaminhamento médico (1 cópia)"],
    observacoes: [],
    filaUnica: false
  },
  "audiometria-campo-livre": {
    nome: "Audiometria de Campo Livre",
    categoria: "Exames Audiológicos",
    local: "Sem prestador disponível",
    orientacoes: [],
    documentosNecessarios: [],
    observacoes: ["Serviço temporariamente indisponível - sem prestador credenciado"],
    filaUnica: false,
    semPrestador: true
  },
  "arteriografia": {
    nome: "Arteriografia",
    categoria: "Exames Invasivos",
    local: "Protocolar no Posto",
    orientacoes: [
      "Protocolar no posto de saúde",
      "Lançar no sistema VIVER",
      "Obrigatório ter solicitação em APAC",
      "Preencher questionário de antecedentes alérgicos",
      "É necessário xerox de documentos"
    ],
    documentosNecessarios: [
      "Xerox de documentos pessoais",
      "Solicitação em APAC",
      "Questionário de antecedentes alérgicos"
    ],
    observacoes: [],
    filaUnica: true
  },
  "bera": {
    nome: "BERA - Potencial Evocado Auditivo",
    categoria: "Exames Audiológicos",
    local: "Sem prestador disponível",
    orientacoes: [],
    documentosNecessarios: [],
    observacoes: ["Serviço temporariamente indisponível - sem prestador credenciado"],
    filaUnica: false,
    semPrestador: true
  },
  "caps-psiquiatria-infantil": {
    nome: "CAPS I - Psiquiatria Infantil",
    categoria: "Saúde Mental",
    local: "Protocolar na Unidade",
    orientacoes: [
      "Protocolar na unidade de saúde"
    ],
    documentosNecessarios: ["Encaminhamento médico"],
    observacoes: [],
    filaUnica: true
  },
  "cardiologia-infantil": {
    nome: "Cardiologia Infantil",
    categoria: "Especialidades Pediátricas",
    local: "TFD - Tratamento Fora de Domicílio",
    orientacoes: [
      "Na Policlínica não há atendimento para crianças",
      "Encaminhamento deve ser feito na folha de TFD",
      "É necessário xerox de documentos e resultado de exames"
    ],
    documentosNecessarios: [
      "Documentos pessoais (xerox)",
      "Resultados de exames"
    ],
    observacoes: ["Atendimento exclusivo via TFD"],
    filaUnica: false
  },
  "cateterismo": {
    nome: "Cateterismo Cardíaco",
    categoria: "Exames Invasivos",
    local: "Protocolar no Posto",
    orientacoes: [
      "Protocolar no posto de saúde",
      "Lançar no sistema VIVER",
      "Obrigatório ter solicitação em APAC",
      "Preencher questionário de antecedentes alérgicos",
      "É necessário xerox de documentos"
    ],
    documentosNecessarios: [
      "Xerox de documentos pessoais",
      "Solicitação em APAC",
      "Questionário de antecedentes alérgicos"
    ],
    observacoes: [],
    filaUnica: true
  },
  "catarata-glaucoma": {
    nome: "Catarata e Glaucoma",
    categoria: "Oftalmologia",
    local: "Protocolar na Unidade / CAC",
    orientacoes: [
      "Protocolar na unidade e lançar no VIVER",
      "Após consulta com oftalmologista: agendar exames laboratoriais e ECG",
      "Levar resultados prontos para Cleusa no CAC junto com pedido de risco cirúrgico"
    ],
    documentosNecessarios: ["Xerox de documentos pessoais"],
    observacoes: ["Processo em etapas: consulta → exames → CAC"],
    filaUnica: false
  },
  "colonoscopia": {
    nome: "Colonoscopia",
    categoria: "Exames Endoscópicos",
    local: "Protocolar e deixar na pasta",
    orientacoes: [
      "Protocolar o pedido",
      "Deixar na pasta específica",
      "É necessário xerox de documentos"
    ],
    documentosNecessarios: ["Xerox de documentos pessoais"],
    observacoes: ["Não é necessário apresentar o pedido de risco cirúrgico"],
    filaUnica: false
  },
  "diu-planejamento-familiar": {
    nome: "DIU - Planejamento Familiar",
    categoria: "Saúde da Mulher",
    local: "Agendar na Sala 4",
    orientacoes: [
      "Necessário preventivo recente",
      "Exame B-HCG com prazo máximo de 48 horas",
      "Agendar atendimento na Sala 4",
      "Lançar no sistema VIVER"
    ],
    documentosNecessarios: [
      "Preventivo recente",
      "B-HCG (máximo 48 horas)"
    ],
    observacoes: [],
    filaUnica: true
  },
  "infectologista-sae": {
    nome: "Infectologista - SAE",
    categoria: "Especialidades Médicas",
    local: "SAE - Serviço de Atenção Especializada",
    orientacoes: [
      "Acompanhamento de pacientes com HIV ou doenças infectocontagiosas (Hepatite, HIV)",
      "Apenas com encaminhamento clínico",
      "Atendimento: Segunda a Sexta",
      "Horários: 07:00 às 11:00 e 13:00 às 16:00",
      "Preferencial comparecer no período da tarde"
    ],
    documentosNecessarios: ["Encaminhamento clínico"],
    observacoes: ["Contato: (32) 3229-6890"],
    filaUnica: false,
    horarioEspecifico: "Seg-Sex: 07:00-11:00 / 13:00-16:00"
  },
  "ecocardiograma-transtoracico": {
    nome: "Ecocardiograma Transtorácico",
    categoria: "Exames Cardiológicos",
    local: "Lançar no VIVER",
    orientacoes: [
      "Lançar no sistema VIVER",
      "Apresentar exames complementares: Eletrocardiograma e/ou Radiografia de tórax",
      "Incluir história clínica completa: sinais, sintomas, comorbidades",
      "Informar tempo de evolução do quadro",
      "Relacionar medicações em uso com dose e posologia",
      "Anexar exame físico direcionado"
    ],
    documentosNecessarios: [
      "Eletrocardiograma e/ou Raio-X de tórax",
      "História clínica detalhada"
    ],
    observacoes: ["Conteúdo descritivo mínimo obrigatório"],
    filaUnica: true
  },
  "fisioterapia-pelvica": {
    nome: "Fisioterapia Pélvica",
    categoria: "Fisioterapia",
    local: "Faculdade UNA",
    orientacoes: [
      "Sem prestador credenciado no sistema público",
      "Orientar pacientes a procurarem a Faculdade UNA",
      "Levar encaminhamento médico"
    ],
    documentosNecessarios: ["Encaminhamento médico"],
    observacoes: ["Atendimento pela Faculdade UNA"],
    filaUnica: false,
    localAlternativo: "Faculdade UNA"
  },
  "ginecologia": {
    nome: "Ginecologia",
    categoria: "Especialidades Médicas",
    local: "Sala 4",
    orientacoes: [
      "Agendar atendimento na Sala 4"
    ],
    documentosNecessarios: ["Encaminhamento médico"],
    observacoes: [],
    filaUnica: false
  },
  "nefrologia-infantil": {
    nome: "Nefrologia Infantil (até 15 anos)",
    categoria: "Especialidades Pediátricas",
    local: "CAC / Regulação",
    orientacoes: [
      "É necessário xerox de documentos",
      "Encaminhar para CAC",
      "Passar pela regulação",
      "Protocolar na unidade"
    ],
    documentosNecessarios: ["Xerox de documentos pessoais"],
    observacoes: ["Exclusivo para pacientes até 15 anos"],
    filaUnica: false
  },
  "pipa-serde-apae": {
    nome: "PIPA / SERDE / APAE / VIVER",
    categoria: "Programas Especializados",
    local: "VIVER",
    orientacoes: [
      "Menores de 2 anos: encaminhar diretamente para fila",
      "Maiores de 2 anos: crianças com Autismo e TDAH",
      "Informar se a criança estuda e o horário escolar",
      "Lançar no sistema VIVER"
    ],
    documentosNecessarios: ["Encaminhamento médico", "Horário escolar"],
    observacoes: ["Critérios específicos por faixa etária e diagnóstico"],
    filaUnica: true
  },
  "ppd": {
    nome: "PPD - Prova Tuberculínica",
    categoria: "Exames Diagnósticos",
    local: "SAE - Serviço de Atenção Especializada",
    orientacoes: [
      "Realizado no SAE",
      "Não precisa agendar",
      "Segunda-feira: 9:00 às 16:00",
      "Terça e Sexta-feira: 7:00 às 16:00"
    ],
    documentosNecessarios: [],
    observacoes: [],
    filaUnica: false,
    horarioEspecifico: "Seg: 9-16h / Ter e Sex: 7-16h"
  },
  "retornos-cisvi": {
    nome: "Retornos CISVI",
    categoria: "Retornos",
    local: "CISVI",
    orientacoes: [
      "Retornos a partir de 15/04/2024 NÃO são lançados no VIVER",
      "Paciente agenda diretamente no CISVI",
      "NÃO RECEBER na Sala 04",
      "Retornos anteriores a 15/04/2024: paciente deve agendar consulta com clínico para novo encaminhamento"
    ],
    documentosNecessarios: [],
    observacoes: [
      "Data de corte: 15/04/2024",
      "Agendamento direto pelo paciente"
    ],
    filaUnica: false
  },
  "cirurgia-bariatrica": {
    nome: "Cirurgia Bariátrica",
    categoria: "Cirurgias Especializadas",
    local: "CAC - Central de Agendamento",
    orientacoes: [
      "Pedido deve ser em APAC",
      "Protocolar no CAC com xerox dos documentos",
      "Enviar relatórios médicos de nutricionista, endocrinologista e psicólogo"
    ],
    documentosNecessarios: [
      "Xerox de documentos pessoais",
      "Relatório de nutricionista",
      "Relatório de endocrinologista",
      "Relatório de psicólogo",
      "Solicitação em APAC"
    ],
    observacoes: ["Necessário acompanhamento multidisciplinar"],
    filaUnica: false
  },
  "raio-x-urgente": {
    nome: "Raio-X Urgente",
    categoria: "Exames de Imagem",
    local: "Policlínica (após 13:00) / VIVER",
    orientacoes: [
      "Casos urgentes: DPOC, DPC, Fratura recente, Trauma, Pneumonia, COVID agravado",
      "Encaminhar diretamente para Policlínica após 13:00 horas",
      "Lançar no sistema VIVER"
    ],
    documentosNecessarios: ["Encaminhamento médico justificando urgência"],
    observacoes: ["Restrito a casos de urgência"],
    filaUnica: false,
    urgente: true
  },
  "consulta-enfermagem": {
    nome: "Consulta de Enfermagem",
    categoria: "Consultas",
    local: "Unidade de Saúde",
    orientacoes: [
      "Agendar consulta na Sala de Agendamentos",
      "Apresentar documento oficial de identificação com foto",
      "Apresentar CPF"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF"
    ],
    observacoes: [],
    servicosOferecidos: [
      "Acompanhamento de pacientes com doenças crônicas (diabetes, hipertensão)",
      "Orientações sobre cuidados de saúde e prevenção de doenças",
      "Avaliação de feridas e curativos",
      "Orientação sobre alimentação saudável e atividade física",
      "Acolhimento e triagem de demandas de saúde"
    ],
    filaUnica: false
  },
  "consulta-farmaceutica": {
    nome: "Consulta Farmacêutica",
    categoria: "Consultas",
    local: "Farmácia da Unidade",
    orientacoes: [
      "Agendar consulta na Sala de Agendamentos ou farmácia",
      "Apresentar documento oficial de identificação com foto",
      "Apresentar CPF"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF"
    ],
    observacoes: [],
    servicosOferecidos: [
      "Revisão de medicamentos em uso",
      "Orientação sobre uso correto de medicamentos",
      "Esclarecimento de dúvidas sobre tratamentos",
      "Orientação sobre interações medicamentosas",
      "Acompanhamento farmacoterapêutico"
    ],
    filaUnica: false
  },
  "consulta-ginecologica-detalhada": {
    nome: "Consulta Ginecológica",
    categoria: "Consultas",
    local: "Sala 4",
    orientacoes: [
      "Atendimento destinado a pré-natal mediante indicação de seu médico ou primeira consulta",
      "Retorno de consulta e acompanhamento",
      "Atendimento mediante encaminhamento médico ou de enfermeiro",
      "Apresentar documento oficial de identificação com foto",
      "Apresentar CPF"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF",
      "Encaminhamento médico ou de enfermeiro (quando aplicável)"
    ],
    observacoes: ["Destinado a pré-natal, primeira consulta, retornos ou encaminhamentos"],
    servicosOferecidos: [
      "Pré-natal de baixo risco",
      "Consulta ginecológica de rotina",
      "Planejamento familiar",
      "Prevenção do câncer de colo de útero (exame preventivo)",
      "Orientações sobre saúde da mulher",
      "Acompanhamento de retornos"
    ],
    filaUnica: false
  },
  "consulta-pediatrica-geral": {
    nome: "Consulta Pediátrica",
    categoria: "Consultas",
    local: "Unidade de Saúde",
    orientacoes: [
      "Agendar consulta na Sala de Agendamentos",
      "Apresentar documento oficial de identificação com foto do responsável",
      "Apresentar CPF do responsável",
      "Levar cartão de vacinação da criança"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto do responsável (RG ou CNH)",
      "CPF do responsável",
      "Certidão de nascimento ou RG da criança"
    ],
    observacoes: [],
    servicosOferecidos: [
      "Consultas de rotina para crianças de 0 a 12 anos",
      "Acompanhamento do crescimento e desenvolvimento infantil",
      "Orientações sobre alimentação e nutrição infantil",
      "Avaliação e tratamento de doenças comuns da infância",
      "Orientação sobre calendário de vacinação",
      "Solicitação de exames quando necessário"
    ],
    filaUnica: false
  },
  "consultas-medicas-gerais": {
    nome: "Consultas Médicas",
    categoria: "Consultas",
    local: "Unidade de Saúde",
    orientacoes: [
      "Agendar consulta na Sala de Agendamentos",
      "Apresentar documento oficial de identificação com foto",
      "Apresentar CPF"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF"
    ],
    observacoes: [],
    servicosOferecidos: [
      "Consultas de clínica geral",
      "Avaliação e diagnóstico de sintomas",
      "Tratamento de doenças agudas e crônicas",
      "Solicitação de exames complementares",
      "Prescrição de medicamentos",
      "Encaminhamentos para especialidades quando necessário",
      "Acompanhamento de pacientes com doenças crônicas"
    ],
    filaUnica: false
  },
  "eletrocardiograma": {
    nome: "Eletrocardiograma (ECG)",
    categoria: "Exames",
    local: "Sala de ECG",
    orientacoes: [
      "Apresentar pedido médico original",
      "Apresentar documento oficial de identificação com foto",
      "Apresentar CPF"
    ],
    documentosNecessarios: [
      "Pedido médico original",
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF"
    ],
    observacoes: [],
    filaUnica: false
  },
  "exames-rotina": {
    nome: "Exames de Rotina",
    categoria: "Exames",
    local: "Laboratório conveniado",
    orientacoes: [
      "Apresentar pedido médico original",
      "Apresentar documento oficial de identificação com foto",
      "Apresentar CPF",
      "Seguir orientações de jejum quando necessário"
    ],
    documentosNecessarios: [
      "Pedido médico original",
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF"
    ],
    observacoes: [
      "Verificar necessidade de jejum conforme tipo de exame",
      "IMPORTANTE: Exames de urina e fezes devem ser coletados em casa e entregues na unidade",
      "Coleta de Urina: Coletar a primeira urina da manhã. Realizar higiene íntima antes da coleta. Desprezar o primeiro jato e coletar o jato médio em frasco estéril (fornecido pela unidade). Entregar o material na unidade em até 1 hora após a coleta, mantendo refrigerado se necessário",
      "Coleta de Fezes: Coletar em frasco estéril (fornecido pela unidade). Evitar mistura com urina. Entregar na unidade no mesmo dia da coleta, preferencialmente pela manhã. Manter refrigerado até a entrega"
    ],
    filaUnica: false
  },
  "primeira-consulta-pre-natal": {
    nome: "Primeira Consulta de Pré-Natal",
    categoria: "Pré-Natal",
    local: "Sala 4",
    orientacoes: [
      "Realizar primeira consulta até a 12ª semana de gestação",
      "Apresentar cartão de vacinas",
      "Apresentar cartão de pré-natal (se já possuir)",
      "Apresentar documento oficial de identificação"
    ],
    documentosNecessarios: [
      "Cartão de vacinas",
      "Cartão de pré-natal (se disponível)",
      "Documento oficial de identificação com foto (RG ou CNH)",
      "CPF"
    ],
    observacoes: ["Primeira consulta deve ser realizada até a 12ª semana de gestação"],
    filaUnica: false
  },
  "cronograma-pre-natal": {
    nome: "Cronograma de Consultas do Pré-Natal",
    categoria: "Pré-Natal",
    local: "Sala 4",
    orientacoes: [
      "1ª consulta: até a 12ª semana com médico",
      "2ª consulta: 20ª semana com enfermeiro",
      "3ª consulta: 26ª semana com médico",
      "4ª consulta: 30ª semana com enfermeiro",
      "5ª consulta: 36ª semana com médico",
      "6ª consulta: 38ª semana com médico",
      "Seguir o cronograma conforme orientação médica"
    ],
    documentosNecessarios: [
      "Cartão de pré-natal",
      "Documento oficial de identificação com foto (RG ou CNH)"
    ],
    observacoes: ["Cronograma pode ser ajustado conforme necessidade médica"],
    filaUnica: false,
    horarioEspecifico: "Conforme agendamento"
  },
  "puericultura": {
    nome: "Puericultura - Acompanhamento Infantil",
    categoria: "Puericultura",
    local: "Sala de Puericultura",
    orientacoes: [
      "Atendimento voltado ao acompanhamento do crescimento e desenvolvimento infantil",
      "CRONOGRAMA COM ENFERMEIRA:",
      "- 2 meses",
      "- 4 meses",
      "- 9 meses",
      "- 18 meses",
      "- Consultas complementares conforme necessidade",
      "",
      "CRONOGRAMA COM MÉDICO PEDIATRA:",
      "- Até 30 dias de vida",
      "- 6 meses",
      "- 12 meses",
      "- 24 meses"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto do responsável (RG ou CNH)",
      "CPF do responsável",
      "Certidão de nascimento ou RG da criança",
      "Cartão de vacinação",
      "Cartão da criança (caderneta de saúde)"
    ],
    observacoes: [
      "Cronograma conforme idade da criança",
      "Enfermeira atende: 2, 4, 9, 18 meses + consultas complementares",
      "Médico atende: até 30 dias, 6, 12, 24 meses"
    ],
    filaUnica: false
  },
  "vacinacao": {
    nome: "Vacinação",
    categoria: "Vacinação",
    local: "Sala de Vacinas",
    orientacoes: [
      "Para vacinação é obrigatória a apresentação da documentação do titular",
      "Atualmente realizamos agendamento apenas para a vacina BCG na Sala de Agendamentos",
      "As demais vacinas são realizadas por demanda espontânea",
      "Para atendimento por demanda: dirigir-se diretamente à Sala de Vacinas",
      "Portar toda a documentação exigida"
    ],
    documentosNecessarios: [
      "Documento oficial de identificação com foto (RG ou CNH) do titular ou responsável",
      "CPF físico original ou número do CPF",
      "Carteira de vacinação (quando disponível para registro das doses aplicadas)",
      "Certidão de nascimento ou RG da criança (quando aplicável)"
    ],
    observacoes: [
      "Agendamento apenas para BCG",
      "Demais vacinas por demanda espontânea"
    ],
    filaUnica: false
  }
};

// Informações adicionais do documento
export const informacoesAdicionais = {
  portaAberta: {
    titulo: "ATENÇÃO: Porta Aberta - Hospital São João",
    descricao: "Com encaminhamento médico",
    casos: [
      "Paciente oncológico ou da nefrologia com intercorrência",
      "Pós-cirúrgico até 30 dias com alguma intercorrência (cirurgia realizada no Hospital São João de Deus)",
      "Sangramento vaginal intenso",
      "Gestante",
      "Bartolinite"
    ]
  },
  fisioterapias: {
    titulo: "Fisioterapias para Faculdade UNA",
    tipos: ["Fisioterapia Pélvica"],
    observacao: "Encaminhamentos do ortopedista lançados direto no VIVER: CRER"
  },
  fisioterapiaCrer: {
    titulo: "Fisioterapias Lançadas no VIVER: CRER",
    tipos: [
      "Fisioterapia pós-operatório",
      "Sequela de AVC",
      "Fraturas"
    ]
  }
};

export const profissionaisDisponiveis = [
  {
    nome: "Valéria Costa",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Darley Camargos",
    funcao: "Técnico de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Ellen Venâncio",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Alexsandra Gambogi",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Isabela Aguiar",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Thaciane Souza",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Tatiana Costa",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Cristiane Aparecida",
    funcao: "Técnica de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Fadeslaine Cristina",
    funcao: "Técnico de Enfermagem",
    categoria: "Enfermagem",
  },
  {
    nome: "Zulmira Moura",
    funcao: "Técnico de Enfermagem",
    categoria: "Enfermagem",
  },

  { nome: "Aline Macedo", funcao: "Enfermeira", categoria: "Enfermagem" },
  { nome: "Naiara Simões", funcao: "Enfermeira", categoria: "Enfermagem" },
  { nome: "Fabíola Oliveira", funcao: "Enfermeira", categoria: "Enfermagem" },
  {
    nome: "Talita Ingrid Magalhães",
    funcao: "Enfermeira",
    categoria: "Enfermagem",
  },

  {
    nome: "Angelita Lara",
    funcao: "Auxiliar de Enfermagem",
    categoria: "Enfermagem",
  },

  { nome: "Dr. João Alves", funcao: "Médico Generalista", categoria: "Médico" },
  {
    nome: "Dr. Frederico Mendes",
    funcao: "Médico Generalista",
    categoria: "Médico",
  },
  {
    nome: "Dr. Gustavo Cambraia",
    funcao: "Médico Generalista",
    categoria: "Médico",
  },
  {
    nome: "Dra. Beatriz Rodrigues",
    funcao: "Médica Generalista",
    categoria: "Médico",
  },
  {
    nome: "Dra. Luana Nogueira",
    funcao: "Médica Ginecologista",
    categoria: "Médico",
  },
  {
    nome: "Dr. Antonio Fernando Bolina",
    funcao: "Médico Pediatra",
    categoria: "Médico",
  },

  { nome: "Helena Dias", funcao: "Dentista", categoria: "Odontologia" },
  {
    nome: "Maycon Alves",
    funcao: "Auxiliar em Saúde Bucal",
    categoria: "Odontologia",
  },
  { nome: "Mayra Paula", funcao: "Dentista", categoria: "Odontologia" },
  {
    nome: "Cibele Ribeiro",
    funcao: "Auxiliar em Saúde Bucal",
    categoria: "Odontologia",
  },
  { nome: "Gabriel Couto", funcao: "Dentista", categoria: "Odontologia" },

  { nome: "Marcella Oliveira", funcao: "Farmacêutica", categoria: "Farmácia" },
  { nome: "Mariana Ribas", funcao: "Farmacêutica", categoria: "Farmácia" },

  {
    nome: "Sandra de Sousa Penha",
    funcao: "Psicóloga",
    categoria: "Psicologia",
  },

  {
    nome: "Marinete Silva",
    funcao: "Auxiliar de Serviços",
    categoria: "Administrativo",
  },
  {
    nome: "Denívea Santos",
    funcao: "Auxiliar de Serviços",
    categoria: "Administrativo",
  },
  {
    nome: "Rosana Marçal",
    funcao: "Atendente Administrativo",
    categoria: "Administrativo",
  },
  {
    nome: "Priscila Silva",
    funcao: "Atendente Administrativo",
    categoria: "Administrativo",
  },

  {
    nome: "Enes Souza",
    funcao: "Agente Comunitário de Saúde",
    categoria: "Administrativo",
  },
  {
    nome: "Wasley Borges",
    funcao: "Agente Comunitário de Saúde",
    categoria: "Administrativo",
  },
  {
    nome: "Matheus José Ferreira",
    funcao: "Agente Comunitário de Saúde",
    categoria: "Administrativo",
  },
  {
    nome: "Erika Roscoe",
    funcao: "Agente Comunitária de Saúde",
    categoria: "Administrativo",
  },
  {
    nome: "Davi de Castro",
    funcao: "Agente Comunitário de Saúde",
    categoria: "Administrativo",
  },
  {
    nome: "Renata Rodrigues",
    funcao: "Agente Comunitária de Saúde",
    categoria: "Administrativo",
  },
];

export function buscarProfissionais(termo) {
  if (!termo || termo.length < 2) return [];

  const termoLower = termo.toLowerCase();

  return profissionaisDisponiveis.filter((prof) =>
    prof.nome.toLowerCase().includes(termoLower)
  );
}

export function buscarProfissionalPorNome(nome) {
  return profissionaisDisponiveis.find(
    (prof) => prof.nome.toLowerCase() === nome.toLowerCase()
  );
}

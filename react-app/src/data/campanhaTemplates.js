export const campanhaTemplates = {
  vacinacao: {
    id: "vacinacao",
    nome: "Campanha de Vacinação",
    categoria: "vacina",
    layout: {
      tipo: "destaque-hero",
      cores: {
        primaria: "#1d4ed8",
        secundaria: "#3b82f6",
        texto: "#1e293b",
        background: "#eff6ff",
      },
      componentes: {
        badge: true,
        imagem: true,
        titulo: true,
        subtitulo: true,
        descricao: true,
        cta: true,
        dataValidade: true,
      },
    },
    estilo: {
      container:
        "bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl shadow-lg overflow-hidden",
      header: "bg-blue-700 text-white p-6",
      badge:
        "bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold",
      titulo: "text-3xl font-bold text-white mb-2",
      subtitulo: "text-blue-100 text-lg",
      corpo: "p-6 bg-white",
      descricao: "text-slate-700 text-base leading-relaxed mb-4",
      imagem: "w-full h-64 object-cover",
      cta: "bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block mt-4",
    },
  },
  material: {
    id: "material",
    nome: "Aviso de Material",
    categoria: "material",
    layout: {
      tipo: "alerta-importante",
      cores: {
        primaria: "#dc2626",
        secundaria: "#ef4444",
        texto: "#1e293b",
        background: "#fef2f2",
      },
      componentes: {
        badge: true,
        icone: true,
        titulo: true,
        descricao: true,
        dataValidade: true,
      },
    },
    estilo: {
      container:
        "bg-red-50 border-l-4 border-red-600 rounded-lg shadow-md overflow-hidden",
      header: "bg-red-600 text-white p-4 flex items-center gap-3",
      badge:
        "bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold",
      icone: "w-8 h-8",
      titulo: "text-2xl font-bold text-white",
      corpo: "p-6 bg-white",
      descricao: "text-slate-700 text-base leading-relaxed",
      dataValidade:
        "text-sm text-slate-500 mt-4 border-t border-slate-200 pt-4",
    },
  },
  educacao: {
    id: "educacao",
    nome: "Campanha Educativa",
    categoria: "campanha",
    layout: {
      tipo: "informativo-completo",
      cores: {
        primaria: "#059669",
        secundaria: "#10b981",
        texto: "#1e293b",
        background: "#f0fdf4",
      },
      componentes: {
        badge: true,
        imagem: true,
        titulo: true,
        subtitulo: true,
        descricao: true,
        listaTopicos: true,
        cta: true,
        dataValidade: true,
      },
    },
    estilo: {
      container:
        "bg-gradient-to-br from-green-50 to-emerald-50 border border-green-300 rounded-2xl shadow-lg overflow-hidden",
      header: "relative",
      imagem: "w-full h-72 object-cover",
      overlay:
        "absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent",
      badge:
        "absolute top-4 left-4 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg",
      titulo:
        "absolute bottom-6 left-6 text-4xl font-bold text-white drop-shadow-lg",
      corpo: "p-6 bg-white",
      subtitulo: "text-xl font-semibold text-green-800 mb-3",
      descricao: "text-slate-700 text-base leading-relaxed mb-4",
      listaTopicos: "space-y-2 mb-4",
      topicoItem: "flex items-start gap-2 text-slate-700",
      topicoIcone: "w-5 h-5 text-green-600 mt-0.5",
      cta: "bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block mt-4",
    },
  },
  urgente: {
    id: "urgente",
    nome: "Aviso Urgente",
    categoria: "campanha",
    layout: {
      tipo: "urgente-destaque",
      cores: {
        primaria: "#dc2626",
        secundaria: "#f59e0b",
        texto: "#1e293b",
        background: "#fef2f2",
      },
      componentes: {
        badge: true,
        icone: true,
        titulo: true,
        descricao: true,
        alerta: true,
        dataValidade: true,
      },
    },
    estilo: {
      container:
        "bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 border-2 border-red-400 rounded-xl shadow-xl overflow-hidden animate-pulse-slow",
      header:
        "bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 flex items-center gap-4",
      badge:
        "bg-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide",
      icone: "w-12 h-12 animate-bounce",
      titulo: "text-3xl font-black text-white",
      corpo: "p-6 bg-white",
      alerta: "bg-amber-100 border-l-4 border-amber-500 p-4 mb-4 rounded",
      alertaTexto: "text-amber-800 font-semibold text-sm",
      descricao: "text-slate-800 text-base leading-relaxed font-medium",
    },
  },
  evento: {
    id: "evento",
    nome: "Evento ou Atividade",
    categoria: "campanha",
    layout: {
      tipo: "evento-card",
      cores: {
        primaria: "#7c3aed",
        secundaria: "#a78bfa",
        texto: "#1e293b",
        background: "#faf5ff",
      },
      componentes: {
        badge: true,
        imagem: true,
        titulo: true,
        data: true,
        horario: true,
        local: true,
        descricao: true,
        inscricao: true,
      },
    },
    estilo: {
      container:
        "bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-300 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300",
      imagem: "w-full h-56 object-cover",
      header: "p-6 bg-white",
      badge:
        "bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold inline-block mb-3",
      titulo: "text-2xl font-bold text-slate-800 mb-4",
      infoGrid: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",
      infoItem: "flex items-center gap-2 text-slate-700",
      infoIcone: "w-5 h-5 text-violet-600",
      infoTexto: "text-sm",
      corpo: "px-6 pb-6 bg-white",
      descricao: "text-slate-700 text-base leading-relaxed mb-4",
      inscricao:
        "bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 w-full text-center",
    },
  },
  informativo: {
    id: "informativo",
    nome: "Informativo Simples",
    categoria: "campanha",
    layout: {
      tipo: "card-simples",
      cores: {
        primaria: "#0f172a",
        secundaria: "#475569",
        texto: "#1e293b",
        background: "#f8fafc",
      },
      componentes: {
        titulo: true,
        descricao: true,
        imagem: true,
        dataPublicacao: true,
      },
    },
    estilo: {
      container:
        "bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden",
      imagem: "w-full h-48 object-cover",
      corpo: "p-6",
      titulo: "text-xl font-bold text-slate-900 mb-3",
      descricao: "text-slate-700 text-base leading-relaxed mb-4",
      footer: "border-t border-slate-100 pt-4",
      dataPublicacao: "text-sm text-slate-500",
    },
  },
};
export const selecionarTemplate = (
  categoria,
  urgente = false,
  temImagem = false
) => {
  if (urgente) {
    return campanhaTemplates.urgente;
  }
  switch (categoria?.toLowerCase()) {
    case "vacina":
    case "vacinação":
    case "vacinacao":
      return campanhaTemplates.vacinacao;
    case "material":
    case "falta":
    case "estoque":
      return campanhaTemplates.material;
    case "educação":
    case "educacao":
    case "educativa":
    case "saúde":
    case "saude":
    case "prevenção":
    case "prevencao":
      return campanhaTemplates.educacao;
    case "evento":
    case "atividade":
    case "palestra":
    case "reunião":
    case "reuniao":
      return campanhaTemplates.evento;
    default:
      return temImagem
        ? campanhaTemplates.informativo
        : campanhaTemplates.informativo;
  }
};
export const gerarPromptTemplate = (template, arquivoInfo) => {
  const { nome, categoria, layout } = template;
  return `
Você está criando uma campanha para ESF Catalão usando o template "${nome}".
INFORMAÇÕES DO ARQUIVO:
- Tipo: ${arquivoInfo.tipo}
- Nome: ${arquivoInfo.nome}
TEMPLATE SELECIONADO: ${nome}
CATEGORIA: ${categoria}
LAYOUT: ${layout.tipo}
COMPONENTES DISPONÍVEIS:
${Object.entries(layout.componentes)
  .filter(([, ativo]) => ativo)
  .map(([comp]) => `- ${comp}`)
  .join("\n")}
INSTRUÇÕES:
1. Analise a imagem/documento fornecido
2. Extraia as informações principais (datas, locais, público-alvo, mensagem principal)
3. Crie conteúdo PROFISSIONAL e GOVERNAMENTAL
4. Use linguagem FORMAL e OBJETIVA
5. Inclua informações de CONTATO se relevante
FORMATO DE RESPOSTA (JSON):
{
  "template": "${template.id}",
  "titulo": "Título claro e objetivo (máx 80 caracteres)",
  "subtitulo": "Subtítulo explicativo (se aplicável)",
  "descricao": "Descrição completa e profissional (200-500 caracteres)",
  "categoria": "${categoria}",
  "urgente": false,
  "destaque": true,
  "dataInicio": "YYYY-MM-DD",
  "dataFim": "YYYY-MM-DD",
  "local": "Local específico (se aplicável)",
  "publicoAlvo": "Público-alvo específico",
  "topicos": ["tópico 1", "tópico 2", "tópico 3"],
  "cta": "Texto do botão de ação",
  "paginaDestino": "home" ou "vacinas" ou "servicos"
}
IMPORTANTE:
- Mantenha tom PROFISSIONAL GOVERNAMENTAL
- Sem emojis
- Informações CLARAS e OBJETIVAS
- Se for campanha de vacinação, inclua datas e público-alvo
- Se for falta de material, seja direto e informe alternativas se possível
`;
};
export default campanhaTemplates;

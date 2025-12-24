// =========================================
// SERVIÇO GEMINI IA
// =========================================
// Integração com a API do Google Gemini para geração de avisos

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
const GEMINI_VISION_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

/**
 * Prompt system otimizado para o contexto da UBS São José
 */
const SYSTEM_PROMPT = `Você é um assistente inteligente da ESF Catalão, especializado em criar avisos profissionais para a população.

MODO DE OPERAÇÃO:

1. **CONVERSAÇÃO CASUAL**: Se o usuário fizer saudações, perguntas genéricas ou não solicitar um aviso específico, responda de forma amigável e educada, SEM retornar JSON.

Exemplos de conversa casual:
- "Oi", "Olá", "Bom dia" → Responda: "Olá! Sou o assistente da ESF Catalão. Como posso ajudar você hoje? Posso criar avisos sobre vacinas, materiais ou campanhas. Descreva o que precisa comunicar."
- "Como você funciona?" → Explique suas funções
- "Obrigado" → Responda educadamente

2. **CRIAÇÃO DE AVISOS**: Quando o usuário descrever uma situação para comunicar (falta de vacina, campanha, etc), retorne um JSON estruturado.

CATEGORIAS DISPONÍVEIS:
- "vacina": Avisos sobre vacinas (falta, chegada, campanhas de vacinação)
- "material": Avisos sobre materiais médicos (falta de seringas, medicamentos, insumos)
- "campanha": Avisos sobre campanhas de saúde, eventos, mutirões

FORMATO JSON (apenas quando for criar aviso):
{
  "titulo": "Título curto e claro (máx 80 caracteres)",
  "descricao": "Descrição profissional e informativa (máx 400 caracteres)",
  "categoria": "vacina" | "material" | "campanha",
  "exibirNaHomepage": true | false
}

EXEMPLOS DE AVISOS:

Input: "A vacina da gripe acabou"
Output:
{
  "titulo": "Vacina contra Gripe Temporariamente Indisponível",
  "descricao": "Informamos que as doses da vacina contra gripe estão temporariamente em falta. Assim que recebermos novo lote, avisaremos a população. Agradecemos a compreensão.",
  "categoria": "vacina",
  "exibirNaHomepage": true
}

Input: "Campanha de vacinação contra sarampo semana que vem"
Output:
{
  "titulo": "Campanha de Vacinação contra Sarampo",
  "descricao": "A partir da próxima semana, realizaremos campanha de vacinação contra o sarampo. Traga seu cartão de vacina e documento de identidade. Horário de atendimento: 8h às 17h. Não perca!",
  "categoria": "campanha",
  "exibirNaHomepage": true
}

IMPORTANTE:
- Use linguagem acessível e profissional
- Seja educado e prestativo
- Retorne JSON APENAS quando for criar um aviso
- Para conversas normais, responda em texto simples

Agora processe a entrada do usuário:`;

/**
 * Prompt system para análise de imagens e criação de campanhas
 * TOLERANTE A ERROS - aceita qualquer imagem e extrai o máximo possível
 */
const CAMPANHA_SYSTEM_PROMPT = `Você é um assistente especializado em criar CAMPANHAS PROFISSIONAIS para a ESF Catalão.

Você receberá uma IMAGEM (cartaz, folder, apresentação, foto) e deve extrair o máximo de informações possível.

IMPORTANTE - TOLERÂNCIA A ERROS:
- SE a imagem estiver DESFOCADA, BORRADA ou COM POUCA QUALIDADE: ainda assim tente extrair informações gerais (tipo de campanha, cores, elementos visuais)
- SE não conseguir ler texto específico: CRIE um título e descrição genéricos baseados no contexto visual (ex: "Campanha de Saúde", "Informações Importantes")
- NUNCA retorne erro por qualidade da imagem
- SEMPRE retorne um JSON válido, mesmo que com informações genéricas

INSTRUÇÕES DE ANÁLISE:
1. Tente identificar o TEMA principal (vacinação, saúde, evento)
2. Extraia textos LEGÍVEIS (se houver)
3. Se não houver texto legível, use o contexto visual para criar título/descrição
4. Identifique cores, elementos gráficos (seringas, pessoas, símbolos)
5. Mantenha tom PROFISSIONAL GOVERNAMENTAL

CATEGORIAS:
- "vacina": Campanhas de vacinação
- "material": Avisos sobre falta de material/medicamento  
- "campanha": Eventos, palestras, atividades educativas
- "urgente": Avisos urgentes ou emergenciais

FORMATO DE RESPOSTA (JSON):
{
  "template": "vacinacao" | "material" | "educacao" | "evento" | "urgente" | "informativo",
  "titulo": "Título extraído ou genérico (máx 80 caracteres)",
  "subtitulo": "Subtítulo ou complemento (opcional)",
  "descricao": "Descrição completa e profissional (200-500 caracteres)",
  "categoria": "vacina" | "material" | "campanha",
  "urgente": true | false,
  "destaque": true,
  "dataInicio": "YYYY-MM-DD" ou null,
  "dataFim": "YYYY-MM-DD" ou null,
  "horario": "Horário de funcionamento (se aplicável)",
  "local": "ESF Catalão",
  "publicoAlvo": "Público-alvo específico (crianças, idosos, gestantes, etc)",
  "topicos": ["informação 1", "informação 2", "informação 3"],
  "contato": "Telefone ou contato (se visível na imagem)",
  "cta": "Texto para botão de ação (ex: 'Saiba Mais', 'Participe', 'Vacine-se')",
  "paginaDestino": "home" | "vacinas" | "servicos" | "educacao",
  "exibirNaHomepage": true
}

EXEMPLOS:

Imagem: Cartaz de vacinação contra gripe para idosos, 15 a 20 de maio
Output: {
  "template": "vacinacao",
  "titulo": "Campanha de Vacinação contra Gripe",
  "subtitulo": "Ação voltada para idosos acima de 60 anos",
  "descricao": "A ESF Catalão realizará campanha de vacinação contra a gripe de 15 a 20 de maio. Traga documento com foto e cartão de vacina. Horário: 8h às 17h.",
  "categoria": "vacina",
  "urgente": false,
  "destaque": true,
  "dataInicio": "2025-05-15",
  "dataFim": "2025-05-20",
  "horario": "8h às 17h",
  "local": "ESF Catalão",
  "publicoAlvo": "Idosos acima de 60 anos",
  "topicos": ["Traga documento com foto", "Traga cartão de vacina", "Horário: 8h às 17h"],
  "contato": null,
  "cta": "Vacine-se",
  "paginaDestino": "vacinas",
  "exibirNaHomepage": true
}

Imagem: Palestra sobre diabetes dia 10/06 às 14h
Output: {
  "template": "evento",
  "titulo": "Palestra: Prevenção e Controle do Diabetes",
  "subtitulo": "Participe e tire suas dúvidas",
  "descricao": "A ESF Catalão convida a população para palestra sobre prevenção e controle do diabetes. Evento gratuito com profissionais especializados.",
  "categoria": "campanha",
  "urgente": false,
  "destaque": true,
  "dataInicio": "2025-06-10",
  "dataFim": "2025-06-10",
  "horario": "14h",
  "local": "ESF Catalão",
  "publicoAlvo": "População em geral",
  "topicos": ["Prevenção do diabetes", "Controle glicêmico", "Alimentação saudável"],
  "contato": null,
  "cta": "Participe",
  "paginaDestino": "educacao",
  "exibirNaHomepage": true
}

IMPORTANTE:
- Extraia TODAS as informações visíveis na imagem
- Mantenha linguagem FORMAL e PROFISSIONAL
- NÃO invente informações que não estão na imagem
- Se algo não estiver visível, use null
- Priorize clareza e objetividade

Agora analise a imagem e retorne APENAS o JSON.`;

/**
 * Envia uma mensagem para o Gemini e recebe a resposta
 * @param {string} userMessage - Mensagem do usuário
 * @returns {Promise<Object>} Resposta estruturada ou erro
 */
export async function sendMessageToGemini(userMessage) {
  try {
    // Validar API Key
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'sua_chave_api_gemini_aqui') {
      return {
        success: false,
        error: 'API Key do Gemini não configurada. Adicione VITE_GEMINI_API_KEY no arquivo .env'
      };
    }

    // Validar mensagem
    if (!userMessage || !userMessage.trim()) {
      return {
        success: false,
        error: 'Mensagem não pode estar vazia'
      };
    }

    // Construir prompt completo
    const fullPrompt = `${SYSTEM_PROMPT}\n\nENTRADA DO USUÁRIO:\n${userMessage.trim()}`;

    // Fazer requisição para API Gemini
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro da API Gemini:', errorData);
      
      if (response.status === 400) {
        return {
          success: false,
          error: 'Erro na requisição. Verifique sua API Key.'
        };
      } else if (response.status === 429) {
        return {
          success: false,
          error: 'Limite de requisições excedido. Tente novamente em alguns instantes.'
        };
      } else {
        return {
          success: false,
          error: `Erro ao conectar com a API (Status: ${response.status})`
        };
      }
    }

    const data = await response.json();

    // Extrair texto da resposta
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      return {
        success: false,
        error: 'Resposta inválida da API'
      };
    }

    // Tentar parsear o JSON da resposta
    const avisoData = parseGeminiResponse(textResponse);
    
    // Se não conseguiu parsear JSON, verificar se é uma resposta conversacional
    if (!avisoData) {
      // Se a resposta contém JSON mal formado ou é um erro, retornar erro
      if (textResponse.includes('{') && textResponse.includes('}')) {
        console.error('JSON mal formado:', textResponse);
        return {
          success: false,
          error: 'Não foi possível processar a resposta da IA. Tente reformular sua mensagem.'
        };
      }
      
      // Caso contrário, é uma conversa normal (resposta textual simples)
      return {
        success: true,
        isConversation: true, // Flag para indicar conversa
        message: textResponse,
        rawResponse: textResponse
      };
    }

    return {
      success: true,
      data: avisoData,
      rawResponse: textResponse
    };

  } catch (error) {
    console.error('Erro no serviço Gemini:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.'
      };
    }
    
    return {
      success: false,
      error: 'Erro inesperado ao processar sua mensagem. Tente novamente.'
    };
  }
}

/**
 * Parse da resposta do Gemini para extrair JSON
 * @param {string} text - Texto da resposta
 * @returns {Object|null} Objeto parseado ou null
 */
function parseGeminiResponse(text) {
  try {
    // Remover possíveis markdown code blocks
    let cleanText = text.trim();
    
    // Remover ```json e ```
    cleanText = cleanText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Tentar encontrar JSON no texto
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validar estrutura
    if (!parsed.titulo || !parsed.descricao || !parsed.categoria) {
      return null;
    }

    // Validar categoria
    const validCategories = ['vacina', 'material', 'campanha'];
    if (!validCategories.includes(parsed.categoria)) {
      parsed.categoria = 'campanha'; // Default
    }

    // Garantir que exibirNaHomepage seja boolean
    if (typeof parsed.exibirNaHomepage !== 'boolean') {
      parsed.exibirNaHomepage = true; // Default
    }

    // Limitar tamanhos
    parsed.titulo = parsed.titulo.substring(0, 100);
    parsed.descricao = parsed.descricao.substring(0, 500);

    return parsed;

  } catch (error) {
    console.error('Erro ao parsear resposta do Gemini:', error);
    return null;
  }
}

/**
 * Envia imagem para o Gemini Vision e recebe análise para campanha
 * @param {string} imageBase64 - Imagem em base64
 * @param {string} mimeType - Tipo MIME da imagem (image/jpeg, image/png, etc)
 * @param {string} userMessage - Mensagem adicional do usuário (opcional)
 * @returns {Promise<Object>} Resposta estruturada da campanha
 */
export async function analyzeImageForCampanha(imageBase64, mimeType, userMessage = '') {
  try {
    // Validar API Key
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'sua_chave_api_gemini_aqui') {
      return {
        success: false,
        error: 'API Key do Gemini não configurada. Adicione VITE_GEMINI_API_KEY no arquivo .env'
      };
    }

    // Validar imagem
    if (!imageBase64 || !mimeType) {
      return {
        success: false,
        error: 'Imagem inválida'
      };
    }

    // Construir prompt
    const promptTexto = userMessage 
      ? `${CAMPANHA_SYSTEM_PROMPT}\n\nINSTRUÇÕES ADICIONAIS DO USUÁRIO:\n${userMessage}`
      : CAMPANHA_SYSTEM_PROMPT;

    // Fazer requisição para API Gemini Vision
    const response = await fetch(`${GEMINI_VISION_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            {
              text: promptTexto
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.4, // Mais determinístico para extração de dados
          topK: 32,
          topP: 0.9,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro da API Gemini Vision:', errorData);
      
      if (response.status === 400) {
        return {
          success: false,
          error: 'Erro na requisição. Verifique a imagem e tente novamente.'
        };
      } else if (response.status === 429) {
        return {
          success: false,
          error: 'Limite de requisições excedido. Tente novamente em alguns instantes.'
        };
      } else {
        return {
          success: false,
          error: `Erro ao conectar com a API (Status: ${response.status})`
        };
      }
    }

    const data = await response.json();

    // Extrair texto da resposta
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      return {
        success: false,
        error: 'Resposta inválida da API'
      };
    }

    // Tentar parsear o JSON da resposta
    const campanhaData = parseCampanhaResponse(textResponse);
    
    if (!campanhaData) {
      return {
        success: false,
        error: 'Não foi possível processar a imagem. Tente outra imagem mais nítida.',
        rawResponse: textResponse
      };
    }

    return {
      success: true,
      data: campanhaData,
      rawResponse: textResponse
    };

  } catch (error) {
    console.error('Erro no serviço Gemini Vision:', error);
    
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        error: 'Erro de conexão. Verifique sua internet.'
      };
    }
    
    return {
      success: false,
      error: 'Erro inesperado ao processar a imagem. Tente novamente.'
    };
  }
}

/**
 * Parse da resposta do Gemini para campanha
 * @param {string} text - Texto da resposta
 * @returns {Object|null} Objeto parseado ou null
 */
function parseCampanhaResponse(text) {
  try {
    // Remover possíveis markdown code blocks
    let cleanText = text.trim();
    
    // Remover ```json e ```
    cleanText = cleanText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Tentar encontrar JSON no texto
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    // Validar estrutura mínima
    if (!parsed.titulo || !parsed.descricao) {
      return null;
    }

    // Garantir campos obrigatórios
    parsed.template = parsed.template || 'informativo';
    parsed.categoria = parsed.categoria || 'campanha';
    parsed.urgente = typeof parsed.urgente === 'boolean' ? parsed.urgente : false;
    parsed.destaque = typeof parsed.destaque === 'boolean' ? parsed.destaque : true;
    parsed.exibirNaHomepage = typeof parsed.exibirNaHomepage === 'boolean' ? parsed.exibirNaHomepage : true;
    parsed.paginaDestino = parsed.paginaDestino || 'home';
    
    // Validar categoria
    const validCategories = ['vacina', 'material', 'campanha'];
    if (!validCategories.includes(parsed.categoria)) {
      parsed.categoria = 'campanha';
    }

    // Validar templates
    const validTemplates = ['vacinacao', 'material', 'educacao', 'evento', 'urgente', 'informativo'];
    if (!validTemplates.includes(parsed.template)) {
      // Tentar inferir template da categoria
      if (parsed.categoria === 'vacina') parsed.template = 'vacinacao';
      else if (parsed.categoria === 'material') parsed.template = 'material';
      else parsed.template = 'informativo';
    }

    // Garantir que topicos seja array
    if (!Array.isArray(parsed.topicos)) {
      parsed.topicos = [];
    }

    // Inicializar campos opcionais como null (evita undefined no Firestore)
    parsed.subtitulo = parsed.subtitulo || null;
    parsed.dataInicio = parsed.dataInicio || null;
    parsed.dataFim = parsed.dataFim || null;
    parsed.horario = parsed.horario || null;
    parsed.publicoAlvo = parsed.publicoAlvo || null;
    parsed.contato = parsed.contato || null;
    parsed.imagemCaminho = parsed.imagemCaminho || null;
    parsed.pdfURL = parsed.pdfURL || null;
    parsed.pdfNome = parsed.pdfNome || null;
    parsed.pdfCaminho = parsed.pdfCaminho || null;

    // Limitar tamanhos
    parsed.titulo = parsed.titulo.substring(0, 100);
    parsed.descricao = parsed.descricao.substring(0, 600);

    return parsed;

  } catch (error) {
    console.error('Erro ao parsear resposta de campanha:', error);
    return null;
  }
}

/**
 * Reformula texto para linguagem formal e profissional do governo (área da saúde)
 * @param {string} userText - Texto casual/informal do usuário
 * @param {string} field - Campo sendo reformulado (titulo, descricao, etc)
 * @returns {Promise<Object>} Texto reformulado
 */
export async function reformulateToFormal(userText, field = 'texto') {
  try {
    if (!userText || !userText.trim()) {
      return {
        success: false,
        error: 'Texto vazio'
      };
    }

    // Prompt especializado para reformulação formal
    const FORMAL_SYSTEM_PROMPT = `Você é um especialista em comunicação institucional governamental na área da saúde pública.

TAREFA: Reformular o texto fornecido pelo usuário em linguagem FORMAL, PROFISSIONAL e adequada para comunicação oficial de órgãos de saúde pública brasileiros.

DIRETRIZES OBRIGATÓRIAS:
1. Tom formal, respeitoso e acolhedor
2. Vocabulário técnico apropriado para saúde pública
3. Estrutura clara e objetiva
4. Linguagem acessível mas profissional
5. Evitar completamente gírias, informalidades e expressões coloquiais
6. Usar termos técnicos da saúde quando apropriado
7. Manter informações essenciais do texto original
8. Linguagem inclusiva e acessível para toda população
9. Tom institucional da Estratégia de Saúde da Família (ESF)

EXEMPLOS DE TRANSFORMAÇÃO:
Casual: "Vem pra vacina da gripe!"
Formal: "A Estratégia de Saúde da Família convida a população para imunização contra Influenza"

Casual: "Tá com dúvida? Vem aqui!"
Formal: "Para esclarecimentos adicionais, dirija-se à unidade de saúde mais próxima"

Casual: "proteja você e sua família"
Formal: "Proteja sua saúde e de seus familiares"

Casual: "a vacina da gripe tá disponível pra todo mundo. é de graça e tem pra toda idade"
Formal: "A Estratégia de Saúde da Família disponibiliza gratuitamente a vacina contra Influenza para todos os grupos etários. A imunização é fundamental para a prevenção de complicações decorrentes da gripe."

TEXTO DO USUÁRIO:
"${userText.trim()}"

INSTRUÇÕES FINAIS:
- Responda APENAS com o texto reformulado
- NÃO adicione explicações, comentários ou aspas
- NÃO adicione "Texto reformulado:" ou similar
- Apenas o texto final reformulado`;

    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: FORMAL_SYSTEM_PROMPT
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 500,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('Nenhuma resposta do Gemini');
    }

    const reformulatedText = data.candidates[0].content.parts[0].text.trim();

    return {
      success: true,
      original: userText.trim(),
      reformulated: reformulatedText,
      field: field
    };

  } catch (error) {
    console.error('Erro ao reformular texto:', error);
    return {
      success: false,
      error: error.message,
      original: userText
    };
  }
}

/**
 * Testa a conexão com a API Gemini
 * @returns {Promise<Object>} Resultado do teste
 */
export async function testGeminiConnection() {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'sua_chave_api_gemini_aqui') {
      return {
        success: false,
        error: 'API Key não configurada'
      };
    }

    const result = await sendMessageToGemini('Teste de conexão');
    
    return {
      success: result.success,
      message: result.success ? 'Conexão estabelecida com sucesso!' : result.error
    };

  } catch (error) {
    return {
      success: false,
      error: 'Erro ao testar conexão'
    };
  }
}


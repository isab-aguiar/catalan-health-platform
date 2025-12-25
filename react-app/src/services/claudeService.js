// =========================================
// SERVIÇO CLAUDE IA - ANTHROPIC
// =========================================
// Integração com a API da Anthropic (Claude) para geração de avisos

const CLAUDE_API_KEY = import.meta.env.VITE_ANTHROPICSK_API_KEY;
const CLAUDE_MODEL = import.meta.env.VITE_CLAUDE_MODEL || 'claude-3-5-sonnet-20241022';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

if (import.meta.env.DEV) {
  console.log(`🤖 Claude usando modelo: ${CLAUDE_MODEL}`);
}

/**
 * Prompt system - Especialista em Comunicação do Ministério da Saúde
 */
const SYSTEM_PROMPT = `Você é Dr. Marketing Saúde, um especialista em comunicação institucional do Ministério da Saúde com 20 anos de experiência em campanhas de vacinação, avisos públicos e comunicação governamental na área da saúde.

PERSONALIDADE E ESTILO:
- Profissional, mas acessível e empático
- Experiente em transformar mensagens informais em comunicação oficial
- Especialista em saúde pública, vacinação e comunicação governamental
- Usa linguagem técnica quando apropriado (ex: "Influenza" em vez de "gripe", "Imunização" em vez de "vacina")
- Entende que comunicação clara salva vidas

===================================
MODO DE OPERAÇÃO - MUITO IMPORTANTE
===================================

🔹 FASE 1 - CONVERSAÇÃO (quando usuário NÃO pediu aviso/campanha ainda):
Quando o usuário:
- Cumprimentar ("Oi", "Olá", "Bom dia")
- Perguntar sobre você ("Quem é você?", "O que você faz?")
- Fazer perguntas gerais ("Como funciona?")
- Agradecer ("Obrigado", "Valeu")

➡️ Responda APENAS em texto simples, de forma amigável e profissional.
➡️ NÃO retorne JSON.

Exemplo:
Usuário: "Oi, quem é você?"
Você: "Olá! Sou especialista em comunicação do Ministério da Saúde com 20 anos de experiência. Posso ajudá-lo a criar avisos profissionais sobre vacinas, campanhas de saúde, materiais médicos e muito mais. Como posso auxiliá-lo hoje?"

---

🔹 FASE 2 - COLETA DE INFORMAÇÕES (quando usuário pediu aviso/campanha):
Quando o usuário pedir para criar um aviso, campanha ou comunicado, você deve:

1️⃣ Fazer perguntas para entender completamente o que ele quer comunicar
2️⃣ Reformular os textos dele de forma profissional (mantendo a essência)
3️⃣ Coletar TODAS as informações necessárias antes de gerar o JSON final

**PERGUNTAS QUE VOCÊ DEVE FAZER:**
- Sobre o quê é o aviso? (vacina, falta de material, campanha, evento?)
- Qual o título que você gostaria? (você reformulará de forma profissional)
- Qual a mensagem principal? (você reformulará de forma profissional)
- Em qual página deve aparecer? (home/página inicial, vacinas, serviços, educação)
- É urgente? Deve aparecer destacado na página inicial?
- Há datas específicas? Horários? Local?
- Qual o público-alvo? (crianças, idosos, gestantes, população em geral?)

**COMO REFORMULAR:**
Usuário: "campanha de vacinação contra bronquiolite"
Você reformula para: "Campanha de Imunização contra Bronquiolite" ou "Imunização contra Bronquiolite Disponível"

Usuário: "vem tomar vacina da gripe"
Você reformula para: "Vacinação contra Influenza Disponível" ou "Campanha de Vacinação contra Gripe"

Usuário: "acabou a vacina do sarampo"
Você reformula para: "Vacina contra Sarampo Temporariamente Indisponível"

**IMPORTANTE NA REFORMULAÇÃO:**
✅ Transforme termos coloquiais em técnicos quando apropriado
✅ Capitalize palavras importantes (nomes de doenças, vacinas)
✅ Mantenha a essência do que o usuário disse
✅ Use "Imunização" em vez de "vacinação" quando soar mais profissional
✅ Use "Influenza" em vez de "gripe" quando apropriado
❌ NÃO adicione frases como "A ESF informa...", "A Estratégia comunica..."
❌ NÃO elabore além do que o usuário disse
❌ NÃO crie informações que o usuário não forneceu

**Exemplo de conversa completa:**

Usuário: "preciso criar uma campanha sobre bronquiolite"

Você: "Perfeito! Vou ajudá-lo a criar uma campanha profissional sobre bronquiolite.

Para começar, me conte:
- Qual seria o título da campanha? (pode ser algo informal, eu reformulo para você)
- Qual a mensagem principal que quer passar?
- Em qual página quer que apareça? (página inicial/home, vacinas, serviços, educação)
- Há datas específicas para essa campanha?
- Qual o público-alvo? (bebês, crianças, gestantes?)"

Usuário: "Título: campanha de vacinação contra bronquiolite. Mensagem: proteja seu bebê. Público: mães de bebês até 6 meses. Página: vacinas"

Você: "Ótimo! Vou reformular isso de forma profissional:

📋 **Título reformulado:** 'Campanha de Imunização contra Bronquiolite'
📋 **Mensagem reformulada:** 'Proteja seu bebê contra a bronquiolite'
📋 **Público-alvo:** Mães e responsáveis por bebês até 6 meses
📋 **Página destino:** Vacinas

Gostou dessas reformulações? E quanto a:
- Datas da campanha? (quando começa e termina?)
- Horário de atendimento?
- Alguma informação adicional importante?"

Usuário: "Sim, gostei! De 15 a 30 de maio, horário 8h às 17h"

Você: "Perfeito! Então vou gerar o aviso oficial:"

[AGORA SIM você retorna o JSON]

---

🔹 FASE 3 - GERAÇÃO DO JSON FINAL (APENAS quando tiver TODAS as informações):

Quando você já coletou todas as informações e o usuário confirmou, retorne este JSON:

\`\`\`json
{
  "titulo": "Título reformulado profissionalmente",
  "descricao": "Descrição completa e profissional com todas as informações coletadas",
  "categoria": "vacina" | "material" | "campanha",
  "paginaDestino": "home" | "vacinas" | "servicos" | "educacao",
  "exibirNaHomepage": true | false
}
\`\`\`

CATEGORIAS:
- "vacina": Campanhas de vacinação, imunização
- "material": Falta de materiais, medicamentos, insumos
- "campanha": Eventos, palestras, ações educativas

PÁGINAS DESTINO (TODAS DISPONÍVEIS):
- "home": Página inicial (/) - avisos gerais, importantes
- "vacinas": Página de vacinas (/servicos/vacinas) - campanhas de imunização
- "servicos": Página de serviços (/servicos) - consultas, atendimentos, serviços gerais
- "educacao": Página de educação (/educacao) - palestras, workshops, educação em saúde

===================================
REGRAS ABSOLUTAS
===================================

1. ✅ Seja conversacional e empático - você é um especialista ajudando um colega
2. ✅ Faça perguntas para entender completamente o pedido
3. ✅ Reformule textos informais para linguagem técnica/profissional
4. ✅ Mostre as reformulações antes de gerar o JSON final
5. ✅ Só gere JSON quando tiver TODAS as informações necessárias
6. ❌ NUNCA adicione "A ESF informa/anuncia/reforça" nos textos
7. ❌ NUNCA gere JSON sem antes conversar e coletar informações
8. ❌ NUNCA invente informações não fornecidas pelo usuário`;

/**
 * Prompt para análise de imagens
 */
const CAMPANHA_SYSTEM_PROMPT = `Você é um assistente especializado em criar CAMPANHAS PROFISSIONAIS para a ESF Catalão.

Você receberá uma IMAGEM (cartaz, folder, apresentação, foto) e deve extrair o máximo de informações possível.

IMPORTANTE - QUALIDADE DA ANÁLISE:
- Analise APENAS informações CLARAMENTE VISÍVEIS na imagem
- SE a imagem estiver DESFOCADA, BORRADA ou COM POUCA QUALIDADE: informe ao usuário que não consegue analisar adequadamente
- NÃO INVENTE informações que não consegue ver claramente
- Seja preciso: se não tem certeza, não presuma

INSTRUÇÕES DE ANÁLISE:
1. Identifique o TEMA principal se estiver claramente visível (vacinação, saúde, evento)
2. Extraia textos que consiga LER COM CERTEZA
3. Se não conseguir ler textos importantes, informe que a imagem precisa ter melhor qualidade
4. Identifique elementos visuais óbvios (seringas, símbolos, cores dominantes)
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

PÁGINAS DESTINO DISPONÍVEIS:
- "home": Página inicial (/) - avisos gerais
- "vacinas": Página de vacinas (/servicos/vacinas) - campanhas de imunização
- "servicos": Página de serviços (/servicos) - serviços gerais
- "educacao": Página de educação (/educacao) - palestras, workshops

IMPORTANTE:
- Extraia TODAS as informações visíveis na imagem
- Mantenha linguagem FORMAL e PROFISSIONAL
- NÃO invente informações que não estão na imagem
- Se algo não estiver visível, use null
- Priorize clareza e objetividade

Retorne APENAS o JSON.`;

/**
 * Envia uma mensagem para o Claude e recebe a resposta
 */
export async function sendMessageToClaude(userMessage) {
  try {
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY.includes('sua_chave')) {
      return {
        success: false,
        error: 'API Key do Claude não configurada. Adicione VITE_ANTHROPICSK_API_KEY no arquivo .env'
      };
    }

    if (!userMessage || !userMessage.trim()) {
      return {
        success: false,
        error: 'Mensagem não pode estar vazia'
      };
    }

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: [{
          role: 'user',
          content: userMessage.trim()
        }],
        temperature: 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro da API Claude:', errorData);

      if (response.status === 401) {
        return {
          success: false,
          error: 'API Key inválida. Verifique sua chave da Anthropic.'
        };
      } else if (response.status === 429) {
        return {
          success: false,
          error: 'Limite de requisições excedido. Aguarde alguns instantes e tente novamente.',
          quotaExceeded: true
        };
      } else {
        return {
          success: false,
          error: `Erro ao conectar com a API (Status: ${response.status})`
        };
      }
    }

    const data = await response.json();
    const textResponse = data.content?.[0]?.text;

    if (!textResponse) {
      return {
        success: false,
        error: 'Resposta inválida da API'
      };
    }

    // Tentar parsear JSON
    const avisoData = parseClaudeResponse(textResponse);

    // Se não é JSON, é conversa normal
    if (!avisoData) {
      if (textResponse.includes('{') && textResponse.includes('}')) {
        console.error('JSON mal formado:', textResponse);
        return {
          success: false,
          error: 'Não foi possível processar a resposta da IA. Tente reformular sua mensagem.'
        };
      }

      return {
        success: true,
        isConversation: true,
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
    console.error('Erro no serviço Claude:', error);

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
 * Parse da resposta do Claude para extrair JSON
 */
function parseClaudeResponse(text) {
  try {
    let cleanText = text.trim();
    cleanText = cleanText.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.titulo || !parsed.descricao || !parsed.categoria) {
      return null;
    }

    const validCategories = ['vacina', 'material', 'campanha'];
    if (!validCategories.includes(parsed.categoria)) {
      parsed.categoria = 'campanha';
    }

    // Validar página destino
    const validPages = ['home', 'vacinas', 'servicos', 'educacao'];
    if (!parsed.paginaDestino || !validPages.includes(parsed.paginaDestino)) {
      if (parsed.categoria === 'vacina') {
        parsed.paginaDestino = 'vacinas';
      } else if (parsed.categoria === 'campanha') {
        parsed.paginaDestino = 'educacao';
      } else {
        parsed.paginaDestino = 'home';
      }
    }

    if (typeof parsed.exibirNaHomepage !== 'boolean') {
      parsed.exibirNaHomepage = true;
    }

    parsed.titulo = parsed.titulo.substring(0, 100);
    parsed.descricao = parsed.descricao.substring(0, 500);

    return parsed;

  } catch (error) {
    console.error('Erro ao parsear resposta do Claude:', error);
    return null;
  }
}

/**
 * Análise de imagem com Claude (Vision)
 */
export async function analyzeImageForCampanha(imageBase64, mimeType, userMessage = '') {
  try {
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY.includes('sua_chave')) {
      return {
        success: false,
        error: 'API Key do Claude não configurada.'
      };
    }

    if (!imageBase64 || !mimeType) {
      return {
        success: false,
        error: 'Imagem inválida'
      };
    }

    const promptTexto = userMessage
      ? `${CAMPANHA_SYSTEM_PROMPT}\n\nINSTRUÇÕES ADICIONAIS:\n${userMessage}`
      : CAMPANHA_SYSTEM_PROMPT;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: imageBase64
              }
            },
            {
              type: 'text',
              text: promptTexto
            }
          ]
        }],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro da API Claude Vision:', errorData);

      if (response.status === 401) {
        return {
          success: false,
          error: 'API Key inválida.'
        };
      } else if (response.status === 429) {
        return {
          success: false,
          error: 'Limite de requisições excedido. Aguarde e tente novamente.',
          quotaExceeded: true
        };
      } else {
        return {
          success: false,
          error: `Erro ao conectar com a API (Status: ${response.status})`
        };
      }
    }

    const data = await response.json();
    const textResponse = data.content?.[0]?.text;

    if (!textResponse) {
      return {
        success: false,
        error: 'Resposta inválida da API'
      };
    }

    const campanhaData = parseCampanhaResponse(textResponse);

    if (!campanhaData) {
      return {
        success: false,
        error: 'Não foi possível processar a imagem.',
        rawResponse: textResponse
      };
    }

    return {
      success: true,
      data: campanhaData,
      rawResponse: textResponse
    };

  } catch (error) {
    console.error('Erro no serviço Claude Vision:', error);
    return {
      success: false,
      error: 'Erro inesperado ao processar a imagem.'
    };
  }
}

/**
 * Parse de campanha
 */
function parseCampanhaResponse(text) {
  try {
    let cleanText = text.trim();
    cleanText = cleanText.replace(/```json\s*/g, '').replace(/```\s*/g, '');

    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]);

    if (!parsed.titulo || !parsed.descricao) {
      return null;
    }

    parsed.template = parsed.template || 'informativo';
    parsed.categoria = parsed.categoria || 'campanha';
    parsed.urgente = typeof parsed.urgente === 'boolean' ? parsed.urgente : false;
    parsed.destaque = typeof parsed.destaque === 'boolean' ? parsed.destaque : true;
    parsed.exibirNaHomepage = typeof parsed.exibirNaHomepage === 'boolean' ? parsed.exibirNaHomepage : true;

    // Validar página destino
    const validPages = ['home', 'vacinas', 'servicos', 'educacao'];
    if (!parsed.paginaDestino || !validPages.includes(parsed.paginaDestino)) {
      if (parsed.categoria === 'vacina') {
        parsed.paginaDestino = 'vacinas';
      } else if (parsed.categoria === 'campanha') {
        parsed.paginaDestino = 'educacao';
      } else {
        parsed.paginaDestino = 'home';
      }
    }

    const validCategories = ['vacina', 'material', 'campanha'];
    if (!validCategories.includes(parsed.categoria)) {
      parsed.categoria = 'campanha';
    }

    const validTemplates = ['vacinacao', 'material', 'educacao', 'evento', 'urgente', 'informativo'];
    if (!validTemplates.includes(parsed.template)) {
      if (parsed.categoria === 'vacina') parsed.template = 'vacinacao';
      else if (parsed.categoria === 'material') parsed.template = 'material';
      else parsed.template = 'informativo';
    }

    if (!Array.isArray(parsed.topicos)) {
      parsed.topicos = [];
    }

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

    parsed.titulo = parsed.titulo.substring(0, 100);
    parsed.descricao = parsed.descricao.substring(0, 600);

    return parsed;

  } catch (error) {
    console.error('Erro ao parsear resposta de campanha:', error);
    return null;
  }
}

/**
 * Reformulação profissional de textos
 */
export async function reformulateToFormal(userText, field = 'texto') {
  try {
    if (!userText || !userText.trim()) {
      return {
        success: false,
        error: 'Texto vazio'
      };
    }

    const REFORMULATION_PROMPT = `TAREFA: Reformular o texto do usuário de forma PROFISSIONAL e TÉCNICA, mantendo EXATAMENTE o que ele quis dizer.

REGRAS ABSOLUTAS:
✅ Transforme termos coloquiais em técnicos (gripe → Influenza, vacina → Imunização quando apropriado)
✅ Capitalize nomes de doenças e procedimentos
✅ Use linguagem formal e governamental
✅ Mantenha APENAS o que o usuário disse - não adicione nada
❌ NUNCA adicione "A ESF informa/anuncia/comunica/orienta sobre..."
❌ NUNCA adicione frases institucionais
❌ NUNCA elabore além do texto original
❌ NUNCA crie informações novas

EXEMPLOS CORRETOS:

Input: "campanha de vacinação contra bronquiolite"
Output: "Campanha de Imunização contra Bronquiolite"

Input: "vem tomar vacina da gripe"
Output: "Vacinação contra Influenza Disponível"

Input: "acabou a vacina do sarampo"
Output: "Vacina contra Sarampo Temporariamente Indisponível"

Input: "proteja você e sua família"
Output: "Proteja você e sua família"

INSTRUÇÃO FINAL:
Responda APENAS com o texto reformulado. Sem aspas, sem explicações, sem frases institucionais.

TEXTO DO USUÁRIO:
"${userText.trim()}"`;

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: REFORMULATION_PROMPT
        }],
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      if (response.status === 429) {
        return {
          success: false,
          error: 'Limite de requisições excedido. Aguarde e tente novamente.',
          quotaExceeded: true,
          original: userText
        };
      }

      return {
        success: false,
        error: 'Erro ao reformular texto',
        original: userText
      };
    }

    const data = await response.json();
    const reformulatedText = data.content?.[0]?.text?.trim();

    if (!reformulatedText) {
      return {
        success: false,
        error: 'Resposta inválida',
        original: userText
      };
    }

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
      error: 'Erro ao reformular texto',
      original: userText
    };
  }
}

/**
 * Teste de conexão
 */
export async function testClaudeConnection() {
  try {
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY.includes('sua_chave')) {
      return {
        success: false,
        error: 'API Key não configurada'
      };
    }

    const result = await sendMessageToClaude('Teste de conexão');

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

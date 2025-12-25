// =========================================
// SERVIÇO GEMINI IA - VERSÃO MELHORADA
// =========================================
// Integração com a API do Google Gemini para geração de avisos

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.5-pro';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const GEMINI_VISION_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

if (import.meta.env.DEV) {
  console.log(`🤖 Gemini usando modelo: ${GEMINI_MODEL}`);
}

/**
 * Prompt system NOVO - Especialista em Comunicação do Ministério da Saúde
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
🔹 MODO CAMPANHA COM IMAGEM - FLUXO CONVERSACIONAL
===================================

Quando o usuário enviar uma IMAGEM para criar campanha, você deve conduzir uma conversa natural:

**ETAPA 1 - ANÁLISE E BEM-VINDO:**
"Recebi sua imagem! Vou ajudá-lo a criar uma campanha profissional.
Analisei a imagem e identifiquei: [breve descrição do que você viu]

Vamos coletar algumas informações para finalizar a campanha."

**ETAPA 2 - PERGUNTAS (UMA POR VEZ, AGUARDE RESPOSTA):**

1️⃣ **PÁGINA DESTINO:**
"Em qual página você quer que esta campanha apareça?
• Homepage (página inicial)
• Vacinas
• Serviços
• Educação

Pode responder apenas com o nome da página."

2️⃣ **TÍTULO:**
"Qual o título da campanha? Pode escrever informalmente que eu reformulo para você."

APÓS resposta → Reformular e pedir confirmação:
"Reformulei para: '[Título Profissional Reformulado]'
Gostou? Pode responder 'sim' para aceitar, ou digitar um novo título se preferir."

3️⃣ **SUBTÍTULO (OPCIONAL):**
"Quer adicionar um subtítulo? (pode pular digitando 'não' ou 'pular')"

SE responder → Reformular e confirmar igual ao título

4️⃣ **DESCRIÇÃO:**
"Agora preciso da descrição completa da campanha. Pode escrever do seu jeito que eu reformulo."

APÓS resposta → Reformular e confirmar

5️⃣ **INFORMAÇÕES EXTRAS (OPCIONAL):**
"Quer adicionar informações como horários, local, contato ou outras observações? (pode pular se não precisar)"

SE responder → Reformular e confirmar

6️⃣ **CONFIRMAÇÃO FINAL:**
"Perfeito! Aqui está o resumo da campanha:
• Título: [...]
• Descrição: [...]
• Página: [...]
[mais informações se houver]

Está tudo correto? Responda 'sim' para publicar ou 'editar [campo]' para ajustar algo."

**REGRAS DO FLUXO CONVERSACIONAL:**
✅ Faça UMA pergunta por vez
✅ Espere a resposta antes da próxima pergunta
✅ Aceite respostas informais: "sim", "ok", "aceito", "pode ser" = aprovação
✅ Aceite "não", "pular", "não precisa" = pular campo opcional
✅ Para reformulações, peça confirmação em TEXTO (sem botões!)
✅ Seja natural e amigável
✅ Se resposta ambígua, peça clarificação
❌ NUNCA retorne JSON antes de ter TODAS as informações E confirmação final
❌ NUNCA mostre botões - tudo via texto!
❌ NUNCA pule perguntas obrigatórias (página, título, descrição)
❌ NUNCA diga "Resposta inválida" - sempre tente entender o que o usuário quis dizer

===================================
REGRAS ABSOLUTAS
===================================

1. ✅ Seja conversacional e empático - você é um especialista ajudando um colega
2. ✅ Faça perguntas para entender completamente o pedido
3. ✅ Reformule textos informais para linguagem técnica/profissional
4. ✅ Mostre as reformulações antes de gerar o JSON final
5. ✅ Só gere JSON quando tiver TODAS as informações E confirmação final do usuário
6. ✅ NUNCA diga "Resposta inválida" - sempre interprete a intenção do usuário
7. ✅ Aceite respostas variadas: "sim", "ok", "pode ser", "aceito" = aprovação
8. ✅ Aceite "não", "pular", "skip", "não quero" = pular campo opcional
9. ❌ NUNCA adicione "A ESF informa/anuncia/reforça" nos textos
10. ❌ NUNCA gere JSON sem confirmação final explícita do usuário
11. ❌ NUNCA invente informações não fornecidas pelo usuário
12. ❌ NUNCA use botões - tudo deve ser via texto conversacional

Agora processe a entrada do usuário:`;

/**
 * Prompt CONVERSACIONAL para análise de imagens de campanhas
 * MODIFICADO: Agora faz perguntas em vez de retornar JSON diretamente
 */
const CAMPANHA_SYSTEM_PROMPT = `Você é um assistente especializado em criar CAMPANHAS PROFISSIONAIS para a ESF Catalão usando CONVERSA NATURAL.

===================================
🔹 FLUXO CONVERSACIONAL PARA CAMPANHAS COM IMAGEM
===================================

**ETAPA 1 - ANÁLISE E BEM-VINDO:**
Quando receber uma IMAGEM, você deve:
1. Analisar a imagem RAPIDAMENTE
2. Identificar o tema principal se visível
3. Responder ao usuário com uma mensagem amigável

EXEMPLO:
"Recebi sua imagem! Vi que é sobre [tema]. Vou fazer algumas perguntas para criar uma campanha profissional."

**ETAPA 2 - PERGUNTAS (UMA POR VEZ, AGUARDE RESPOSTA):**

1️⃣ **PÁGINA DESTINO:**
"Em qual página você quer que esta campanha apareça? Escolha uma:

• Homepage (página inicial)
• Sala de Vacinação
• Sala de Agendamento
• Sala de Atendimento Administrativo
• Sala de Medicação
• Recepção
• Eletrocardiograma (ECG)
• Sala de Curativos
• Renovação de Receitas
• Farmácia

Digite o nome da página ou número se preferir."

2️⃣ **TÍTULO (APÓS RESPOSTA DA PERGUNTA 1):**
"Qual o título da campanha? Pode escrever informalmente que eu reformulo para você."

**AGUARDE RESPOSTA** → Reformular e pedir confirmação:
"Reformulei para: '[TÍTULO REFORMULADO]'.
Gostou? Responda 'sim' ou sugira mudanças."

3️⃣ **SUBTÍTULO (OPCIONAL):**
"Quer adicionar um subtítulo complementar? (pode pular se não quiser)"

4️⃣ **DESCRIÇÃO:**
"Agora preciso de uma descrição completa. O que deve ser comunicado?"

**AGUARDE RESPOSTA** → Reformular e pedir confirmação:
"Reformulei a descrição:
'[DESCRIÇÃO REFORMULADA]'

Está bom? Responda 'sim' ou peça ajustes."

5️⃣ **DATA INÍCIO (OPCIONAL):**
"Tem data de início? (formato: DD/MM/AAAA ou deixe em branco)"

6️⃣ **DATA FIM (OPCIONAL):**
"E data de término? (ou deixe em branco se for contínua)"

7️⃣ **HORÁRIO (OPCIONAL):**
"Qual o horário de funcionamento? (ex: 8h às 17h, ou pule se não tiver)"

8️⃣ **PÚBLICO-ALVO (OPCIONAL):**
"Para quem é essa campanha? (gestantes, idosos, crianças, ou pule)"

9️⃣ **INFORMAÇÕES EXTRAS (OPCIONAL):**
"Quer adicionar telefone, local específico ou outras informações? (pode pular)"

🔟 **CONFIRMAÇÃO FINAL:**
"Perfeito! Vou gerar a campanha com essas informações:

📍 Página: [página]
📝 Título: [título]
📄 Descrição: [descrição]
[outros campos preenchidos]

Confirma? Digite 'sim' para eu gerar o JSON final."

**SOMENTE APÓS "SIM" FINAL → Retornar JSON no formato:**
{
  "template": "vacinacao",
  "titulo": "Título da campanha",
  "descricao": "Descrição completa",
  "paginaDestino": "home",
  "urgente": false,
  "destaque": true
}

**REGRAS DO FLUXO CONVERSACIONAL:**
✅ Faça UMA pergunta por vez
✅ SEMPRE AGUARDE a resposta antes da próxima pergunta
✅ Aceite respostas informais: "sim", "ok", "pode ser" = aprovação
✅ Aceite "não", "pular", "skip" = pular campo opcional
✅ Para reformulações, SEMPRE peça confirmação em TEXTO
✅ Seja natural, amigável e profissional
✅ Se resposta ambígua, peça clarificação
❌ NUNCA retorne JSON antes de ter TODAS as informações E confirmação final
❌ NUNCA mostre botões - tudo via texto!
❌ NUNCA pule perguntas obrigatórias (página, título, descrição)
❌ NUNCA diga "Resposta inválida" - sempre tente entender

**PÁGINAS DESTINO DISPONÍVEIS (IDs para usar no JSON):**
- "home" = Homepage (página inicial)
- "vacinas" = Sala de Vacinação
- "sala-4" = Sala de Agendamento
- "sala-9" = Sala de Atendimento Administrativo
- "medicacao" = Sala de Medicação
- "recepcao" = Recepção
- "ecg" = Eletrocardiograma
- "curativos" = Sala de Curativos
- "renovacao" = Renovação de Receitas
- "farmacia" = Farmácia

Agora processe a entrada do usuário e siga o fluxo conversacional.`;

/**
 * PROMPT ESPECÍFICO PARA ANÁLISE DE IMAGENS (Retorno Imediato de JSON)
 * Este prompt é usado quando o usuário faz upload de uma imagem de campanha
 * e esperamos análise instantânea sem fluxo conversacional
 */
const CAMPANHA_IMAGE_ANALYSIS_PROMPT = `Você é um assistente especializado em extrair informações de imagens de campanhas de saúde para a ESF (Estratégia de Saúde da Família).

===================================
🎯 TAREFA: ANÁLISE IMEDIATA DE IMAGEM
===================================

Analise a imagem fornecida e extraia TODAS as informações visíveis para criar uma campanha profissional.

ETAPAS DE ANÁLISE:

1️⃣ **IDENTIFICAR TÍTULO:**
   - Procure o maior texto visível na imagem
   - Geralmente está em destaque, negrito ou fonte maior
   - Se houver logo/marca, ignore e foque no texto principal
   - Máximo 100 caracteres

2️⃣ **IDENTIFICAR DESCRIÇÃO:**
   - Extraia todo o corpo de texto visível
   - Combine múltiplos parágrafos se houver
   - Mantenha informações importantes (datas, horários, locais)
   - Máximo 600 caracteres
   - Use português formal e profissional

3️⃣ **DETECTAR CATEGORIA (vacina | material | campanha):**
   - **VACINA**: Se menciona vacinação, imunização, doses, calendário vacinal, vacinas específicas (COVID, Influenza, HPV, etc)
   - **MATERIAL**: Se menciona medicamentos, insumos, solicitação de material, estoque, farmácia
   - **CAMPANHA**: Ações educativas, eventos de saúde, campanhas preventivas, conscientização

4️⃣ **INFERIR TEMPLATE (vacinacao | material | educacao | evento | urgente | informativo):**
   - **vacinacao**: Se for sobre vacinas/imunização
   - **material**: Se for sobre insumos/medicamentos
   - **educacao**: Se for campanha educativa sobre saúde
   - **evento**: Se menciona evento com data específica
   - **urgente**: Se usa cores de alerta (vermelho/laranja) ou termos como "urgente", "atenção", "importante"
   - **informativo**: Padrão para informações gerais

5️⃣ **EXTRAIR INFORMAÇÕES OPCIONAIS:**
   - **Subtítulo**: Texto secundário abaixo do título (se houver)
   - **Data Início**: Formato DD/MM/AAAA (ex: 15/01/2025)
   - **Data Fim**: Formato DD/MM/AAAA (ex: 20/01/2025)
   - **Horário**: Ex: "8h às 17h", "Segunda a Sexta"
   - **Público-Alvo**: Ex: "Gestantes", "Idosos acima de 60 anos", "Crianças de 0 a 5 anos"
   - **Contato**: Telefone, email ou endereço visível

6️⃣ **DEFINIR PÁGINA DESTINO:**
   Baseado na categoria e conteúdo, escolha a página mais apropriada:
   - Vacinação → "vacinas"
   - Material/Medicação → "medicacao" ou "farmacia"
   - Curativos/Feridas → "curativos"
   - ECG/Exames → "ecg"
   - Recepção/Atendimento → "recepcao"
   - Campanhas gerais → "home"

7️⃣ **DEFINIR FLAGS:**
   - **urgente**: true se cores/texto indicam urgência, false caso contrário
   - **destaque**: true para campanhas importantes (vacinação, eventos), false para informações simples
   - **exibirNaHomepage**: true se página destino = "home", false caso contrário

8️⃣ **EXTRAIR TÓPICOS (opcional):**
   - Liste pontos-chave da campanha como array de strings
   - Ex: ["Vacina disponível", "Gratuita para todos", "Documentos: RG e Cartão SUS"]
   - Use [] se não houver tópicos claros

===================================
⚠️ REGRAS CRÍTICAS
===================================

✅ **SEMPRE retorne APENAS JSON válido**
✅ **NÃO adicione texto antes ou depois do JSON**
✅ **NÃO faça perguntas**
✅ **NÃO use markdown** - apenas o JSON puro (sem delimitadores de código)
✅ **Se campo não identificável** → use null ou valor padrão inteligente
✅ **Use português formal** em títulos e descrições
✅ **Seja conciso mas informativo**

❌ **NUNCA retorne texto conversacional**
❌ **NUNCA retorne JSON incompleto**
❌ **NUNCA invente informações** não visíveis na imagem

===================================
📋 FORMATO DE SAÍDA OBRIGATÓRIO
===================================

{
  "template": "vacinacao",
  "titulo": "Campanha de Vacinação contra Influenza 2025",
  "descricao": "A ESF Catalão está realizando campanha de vacinação contra Influenza para toda a população. Vacina disponível gratuitamente. Traga RG e Cartão SUS.",
  "subtitulo": "Proteja-se contra a gripe",
  "categoria": "vacina",
  "paginaDestino": "vacinas",
  "dataInicio": "15/01/2025",
  "dataFim": "28/02/2025",
  "horario": "8h às 17h, segunda a sexta",
  "publicoAlvo": "Toda a população",
  "contato": "(35) 3333-3333",
  "urgente": false,
  "destaque": true,
  "exibirNaHomepage": false,
  "topicos": [
    "Vacina gratuita",
    "Disponível para todas as idades",
    "Traga RG e Cartão SUS"
  ]
}

===================================
🗂️ PÁGINAS DESTINO DISPONÍVEIS
===================================

- "home" → Homepage (página inicial) - use para campanhas gerais
- "vacinas" → Sala de Vacinação
- "sala-4" → Sala de Agendamento
- "sala-9" → Sala de Atendimento Administrativo
- "medicacao" → Sala de Medicação
- "recepcao" → Recepção
- "ecg" → Eletrocardiograma
- "curativos" → Sala de Curativos
- "renovacao" → Renovação de Receitas
- "farmacia" → Farmácia

===================================
✅ VALORES PADRÃO INTELIGENTES
===================================

Se não conseguir identificar um campo obrigatório da imagem:

**Título não identificável:**
"Nova Campanha de Saúde (aguardando refinamento)"

**Descrição não identificável:**
"Campanha de saúde da ESF Catalão. Descrição será refinada pelo usuário."

**Categoria não clara:**
"campanha" (padrão mais genérico)

**Página destino não clara:**
"home" (página principal)

**Template não claro:**
"informativo" (padrão mais neutro)

===================================
🚀 AGORA ANALISE A IMAGEM
===================================

Analise a imagem fornecida e retorne APENAS o JSON no formato especificado acima.`;

/**
 * Envia uma mensagem para o Gemini e recebe a resposta
 */
export async function sendMessageToGemini(userMessage) {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'sua_chave_api_gemini_aqui') {
      return {
        success: false,
        error: 'API Key do Gemini não configurada. Adicione VITE_GEMINI_API_KEY no arquivo .env'
      };
    }

    if (!userMessage || !userMessage.trim()) {
      return {
        success: false,
        error: 'Mensagem não pode estar vazia'
      };
    }

    const fullPrompt = `${SYSTEM_PROMPT}\n\nENTRADA DO USUÁRIO:\n${userMessage.trim()}`;

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
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 4096,
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
        const errorData = await response.json().catch(() => ({}));
        const retryAfter = errorData?.error?.details?.find(d => d['@type']?.includes('RetryInfo'))?.retryDelay || '10';
        const isFreeTier = errorData?.error?.details?.find(d => d['@type']?.includes('QuotaFailure'))?.quotaMetric?.includes('free_tier');
        
        return {
          success: false,
          error: isFreeTier 
            ? 'Limite de requisições do plano gratuito excedido. Tente novamente em alguns instantes.'
            : `Limite de requisições excedido. Tente novamente em ${retryAfter} segundos. Verifique sua cota em: https://ai.dev/usage`,
          quotaExceeded: true,
          isFreeTier: isFreeTier
        };
      } else {
        return {
          success: false,
          error: `Erro ao conectar com a API (Status: ${response.status})`
        };
      }
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      return {
        success: false,
        error: 'Resposta inválida da API'
      };
    }

    // Tentar parsear JSON
    const avisoData = parseGeminiResponse(textResponse);
    
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
 */
function parseGeminiResponse(text) {
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

    // Validar página destino - GARANTIR QUE TODAS AS PÁGINAS ESTÃO DISPONÍVEIS
    const validPages = ['home', 'vacinas', 'servicos', 'educacao'];
    if (!parsed.paginaDestino || !validPages.includes(parsed.paginaDestino)) {
      // Se não especificou página, inferir da categoria
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
    console.error('Erro ao parsear resposta do Gemini:', error);
    return null;
  }
}

/**
 * Análise de imagem (mantém função original)
 */
export async function analyzeImageForCampanha(imageBase64, mimeType, userMessage = '') {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'sua_chave_api_gemini_aqui') {
      return {
        success: false,
        error: 'API Key do Gemini não configurada.'
      };
    }

    if (!imageBase64 || !mimeType) {
      return {
        success: false,
        error: 'Imagem inválida'
      };
    }

    // Usar prompt específico para análise de imagens (retorno imediato de JSON)
    // Não usa userMessage pois esperamos análise instantânea sem conversação
    const promptTexto = CAMPANHA_IMAGE_ANALYSIS_PROMPT;

    const response = await fetch(`${GEMINI_VISION_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: promptTexto },
            {
              inline_data: {
                mime_type: mimeType,
                data: imageBase64
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 15,
          topP: 0.7,
          maxOutputTokens: 4096,
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
        const errorData = await response.json().catch(() => ({}));
        const retryAfter = errorData?.error?.details?.find(d => d['@type']?.includes('RetryInfo'))?.retryDelay || '10';
        const isFreeTier = errorData?.error?.details?.find(d => d['@type']?.includes('QuotaFailure'))?.quotaMetric?.includes('free_tier');
        
        return {
          success: false,
          error: isFreeTier 
            ? 'Limite de requisições do plano gratuito excedido. Tente novamente em alguns instantes.'
            : `Limite de requisições excedido. Tente novamente em ${retryAfter} segundos. Verifique sua cota em: https://ai.dev/usage`,
          quotaExceeded: true,
          isFreeTier: isFreeTier
        };
      } else {
        return {
          success: false,
          error: `Erro ao conectar com a API (Status: ${response.status})`
        };
      }
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      return {
        success: false,
        error: 'Resposta inválida da API'
      };
    }

    const campanhaData = parseCampanhaResponse(textResponse);

    if (!campanhaData) {
      console.error('❌ JSON não encontrado na resposta do Gemini');
      console.error('📄 Resposta recebida:', textResponse);
      console.error('💡 Dica: Verifique se o prompt está instruindo corretamente o Gemini a retornar JSON');
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
    console.error('Erro no serviço Gemini Vision:', error);
    return {
      success: false,
      error: 'Erro inesperado ao processar a imagem.'
    };
  }
}

/**
 * Parse de campanha (mantém função original)
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

    // FALLBACKS INTELIGENTES: Sempre retornar um objeto válido
    // Em vez de retornar null (que causa erro), usamos valores padrão
    if (!parsed.titulo) {
      parsed.titulo = 'Nova Campanha de Saúde (aguardando refinamento)';
      console.warn('⚠️ Título não identificado na imagem - usando padrão');
    }

    if (!parsed.descricao) {
      parsed.descricao = 'Campanha de saúde da ESF Catalão. Descrição será refinada pelo usuário.';
      console.warn('⚠️ Descrição não identificada na imagem - usando padrão');
    }

    parsed.template = parsed.template || 'informativo';
    parsed.categoria = parsed.categoria || 'campanha';
    parsed.urgente = typeof parsed.urgente === 'boolean' ? parsed.urgente : false;
    parsed.destaque = typeof parsed.destaque === 'boolean' ? parsed.destaque : true;
    parsed.exibirNaHomepage = typeof parsed.exibirNaHomepage === 'boolean' ? parsed.exibirNaHomepage : true;
    
    // Validar página destino - GARANTIR QUE TODAS AS PÁGINAS ESTÃO DISPONÍVEIS
    const validPages = ['home', 'vacinas', 'servicos', 'educacao'];
    if (!parsed.paginaDestino || !validPages.includes(parsed.paginaDestino)) {
      // Inferir da categoria se não especificado
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
 * NOVA FUNÇÃO - Reformulação profissional de textos
 * Agora usando o contexto do chat (especialista em saúde)
 */
export async function reformulateToFormal(userText, field = 'texto') {
  try {
    if (!userText || !userText.trim()) {
      return {
        success: false,
        error: 'Texto vazio'
      };
    }

    const REFORMULATION_PROMPT = `Você é um especialista em comunicação do Ministério da Saúde com 20 anos de experiência.

TAREFA: Reformular o texto do usuário de forma PROFISSIONAL e TÉCNICA, mantendo EXATAMENTE o que ele quis dizer.

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

Input: "palestra sobre diabetes dia 10"
Output: "Palestra sobre Diabetes - 10 de [mês]"

EXEMPLOS INCORRETOS (NUNCA FAZER):

Input: "campanha de vacinação"
❌ "A ESF anuncia a implementação da campanha..." (ERRADO - adicionou frase institucional)

Input: "proteja seu bebê"
❌ "A Estratégia de Saúde da Família orienta sobre a importância..." (ERRADO - elaborou demais)

INSTRUÇÃO FINAL:
Responda APENAS com o texto reformulado. Sem aspas, sem explicações, sem frases institucionais.

TEXTO DO USUÁRIO:
"${userText.trim()}"`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: REFORMULATION_PROMPT
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 15,
          topP: 0.7,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 429) {
        const retryAfter = errorData?.error?.details?.find(d => d['@type']?.includes('RetryInfo'))?.retryDelay || '10';
        const isFreeTier = errorData?.error?.details?.find(d => d['@type']?.includes('QuotaFailure'))?.quotaMetric?.includes('free_tier');
        
        return {
          success: false,
          error: isFreeTier 
            ? 'Limite de requisições do plano gratuito excedido. Tente novamente em alguns instantes.'
            : `Limite de requisições excedido. Tente novamente em ${retryAfter} segundos. Verifique sua cota em: https://ai.dev/usage`,
          quotaExceeded: true,
          isFreeTier: isFreeTier,
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
    const reformulatedText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

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

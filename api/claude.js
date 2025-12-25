// =========================================
// SERVERLESS FUNCTION - PROXY PARA CLAUDE
// =========================================
// Esta função roda no servidor da Vercel e faz proxy para a API do Claude

export default async function handler(req, res) {
  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { model, max_tokens, system, messages, temperature } = req.body;

    // Validar API key
    const CLAUDE_API_KEY = process.env.VITE_ANTHROPICSK_API_KEY;
    if (!CLAUDE_API_KEY || CLAUDE_API_KEY.includes('sua_chave')) {
      return res.status(500).json({
        error: 'API Key do Claude não configurada no servidor'
      });
    }

    // Fazer requisição para Claude
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: model || 'claude-3-5-sonnet-20241022',
        max_tokens: max_tokens || 2048,
        system: system,
        messages: messages,
        temperature: temperature || 0.3
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erro da API Claude:', errorData);

      if (response.status === 401) {
        return res.status(401).json({
          error: 'API Key inválida. Verifique sua chave da Anthropic.'
        });
      } else if (response.status === 429) {
        return res.status(429).json({
          error: 'Limite de requisições excedido. Aguarde alguns instantes.',
          quotaExceeded: true
        });
      } else {
        return res.status(response.status).json({
          error: `Erro ao conectar com a API (Status: ${response.status})`,
          details: errorData
        });
      }
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Erro na função serverless:', error);
    return res.status(500).json({
      error: 'Erro inesperado no servidor',
      message: error.message
    });
  }
}

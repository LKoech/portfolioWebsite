export interface Env {
  GROQ_API_KEY: string;
  ALLOWED_ORIGIN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '';
    const allowedOrigins = [env.ALLOWED_ORIGIN, 'http://localhost:4321'];
    const isAllowed = allowedOrigins.some((o) => origin.startsWith(o));

    const corsHeaders: Record<string, string> = {
      'Access-Control-Allow-Origin': isAllowed ? origin : '',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    if (!isAllowed) {
      return new Response('Forbidden', { status: 403 });
    }

    try {
      const body = await request.json() as { messages?: unknown[] };

      if (!body.messages || !Array.isArray(body.messages)) {
        return new Response('Invalid request', { status: 400, headers: corsHeaders });
      }

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: body.messages,
          max_tokens: 256,
          temperature: 0.7,
        }),
      });

      const data = await groqResponse.text();

      return new Response(data, {
        status: groqResponse.status,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    } catch {
      return new Response('Internal error', { status: 500, headers: corsHeaders });
    }
  },
};

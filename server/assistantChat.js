import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

const groqApiKey =
  process.env.GROQ_API_KEY ||
  process.env.GROK_API_KEY ||
  (process.env.GEMINI_API_KEY?.startsWith('gsk_') ? process.env.GEMINI_API_KEY : null);
const geminiApiKey = groqApiKey ? null : process.env.GEMINI_API_KEY;
const ai = geminiApiKey ? new GoogleGenAI({ apiKey: geminiApiKey }) : null;
const chatRoles = new Set(['user', 'assistant']);

function safeProviderError(error) {
  const message = error instanceof Error ? error.message : 'Unknown provider error';
  return message
    .replaceAll(groqApiKey || '\u0000', '[redacted]')
    .replaceAll(geminiApiKey || '\u0000', '[redacted]')
    .replace(/AIza[0-9A-Za-z_-]{20,}/g, '[redacted]')
    .replace(/Bearer\s+\S+/gi, '******')
    .slice(0, 500);
}

function isProviderRateLimit(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      ('status' in error
        ? error.status === 429
        : /(?:429|rate limit|quota)/i.test(safeProviderError(error)))
  );
}

function isProviderUnavailable(error) {
  return Boolean(
    error &&
      typeof error === 'object' &&
      ('status' in error
        ? error.status === 503
        : /(?:503|UNAVAILABLE|high demand|overloaded)/i.test(safeProviderError(error)))
  );
}

async function generateWithRetry(contents) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      if (groqApiKey) {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [
              {
                role: 'system',
                content:
                  'You are a garden design assistant. Answer the visitor’s specific question directly with practical, relevant advice. Keep it to 2–3 short sentences, around 25–45 words, plain text without headings or long lists. Use at most three examples and ask at most one brief follow-up. Do not invent policies, guarantees, availability or prices.',
              },
              ...contents.map((message) => ({
                role: message.role === 'model' ? 'assistant' : 'user',
                content: message.parts.map((part) => part.text).join('\n'),
              })),
            ],
            max_tokens: 140,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(25_000),
        });
        const result = await response.json();
        if (!response.ok) {
          const error = new Error(
            typeof result.error?.message === 'string'
              ? result.error.message
              : 'Groq returned an error.'
          );
          error.status = response.status;
          throw error;
        }
        return { text: result.choices?.[0]?.message?.content };
      }

      return await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          maxOutputTokens: 140,
          systemInstruction:
            'You are a garden design assistant. Directly answer the whole question in 2–3 short sentences, around 25–45 words. Use plain text, no headings or long lists; if examples help, give at most three. Ask at most one brief follow-up. Give practical advice about gardens and landscaping. Do not invent policies, guarantees, availability or prices. Image previews are made separately in the planner.',
        },
      });
    } catch (error) {
      if (attempt > 0 || !isProviderUnavailable(error)) throw error;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  }
}

function limitWords(text, maxWords) {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text.trim();
  return `${words.slice(0, maxWords).join(' ').replace(/[.,;:!?]+$/, '')}…`;
}

export async function answerGardenAssistant(messages) {
  if (!ai && !groqApiKey) {
    return {
      status: 503,
      body: {
        error:
          'AI features are not configured yet. Add GEMINI_API_KEY, GROQ_API_KEY, or GROK_API_KEY to the server environment and restart the app.',
      },
    };
  }

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 12 ||
    messages.some(
      (message) =>
        !message ||
        !chatRoles.has(message.role) ||
        typeof message.text !== 'string' ||
        message.text.trim().length === 0 ||
        message.text.length > 1000
    )
  ) {
    return {
      status: 400,
      body: { error: 'Please send a shorter message and try again.' },
    };
  }

  const conversation = messages.slice(-10).map((message) => ({
    role: message.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: message.text.trim() }],
  }));

  try {
    const result = await generateWithRetry(conversation);
    const text = result.text?.trim();
    if (!text) {
      return {
        status: 502,
        body: {
          error: 'The assistant could not prepare a reply. Please try a different question.',
        },
      };
    }
    return { status: 200, body: { reply: limitWords(text, 55) } };
  } catch (error) {
    console.error('Garden assistant response failed:', safeProviderError(error));
    if (isProviderRateLimit(error)) {
      return {
        status: 429,
        body: {
          error:
            'The AI service has reached its current request limit. Please wait a little and try again.',
        },
      };
    }
    if (isProviderUnavailable(error)) {
      return {
        status: 503,
        body: { error: 'The garden assistant is busy right now. Please try again in a moment.' },
      };
    }
    return {
      status: 502,
      body: { error: 'The garden assistant is temporarily unavailable. Please try again.' },
    };
  }
}

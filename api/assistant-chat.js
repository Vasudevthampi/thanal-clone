import { answerGardenAssistant } from '../server/assistantChat.js';

const rateLimits = new Map();

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  if (request.body !== undefined) {
    if (typeof request.body === 'string') return JSON.parse(request.body);
    if (Buffer.isBuffer(request.body)) return JSON.parse(request.body.toString('utf8'));
    return request.body;
  }

  const chunks = [];
  let size = 0;
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 16 * 1024) {
      const error = new Error('Request body is too large.');
      error.status = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export default async function handler(request, response) {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }

  const now = Date.now();
  const forwardedFor = request.headers['x-forwarded-for'];
  const clientIp =
    (typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : '') ||
    request.socket?.remoteAddress ||
    'unknown';
  let record = rateLimits.get(clientIp);
  if (!record || now - record.startedAt >= 60_000) {
    record = { count: 0, startedAt: now };
    rateLimits.set(clientIp, record);
  }
  if (record.count >= 20) {
    response.setHeader(
      'Retry-After',
      String(Math.ceil((record.startedAt + 60_000 - now) / 1000))
    );
    return sendJson(response, 429, {
      error: 'You have made several requests. Please wait a moment and try again.',
    });
  }
  record.count += 1;

  try {
    const body = await readJsonBody(request);
    const result = await answerGardenAssistant(body?.messages);
    return sendJson(response, result.status, result.body);
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error && /invalid json/i.test(error.message))
    ) {
      return sendJson(response, 400, { error: 'Please send a valid chat request.' });
    }
    if (error && typeof error === 'object' && 'status' in error && error.status === 413) {
      return sendJson(response, 413, { error: 'Please send a shorter message and try again.' });
    }
    console.error('Garden assistant request could not be processed:', error);
    return sendJson(response, 500, {
      error: 'The garden assistant could not process your request. Please try again.',
    });
  }
}

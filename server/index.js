import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { answerGardenAssistant } from './assistantChat.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isDevelopment = process.argv.includes('--dev');
const app = express();
const rateLimits = new Map();

app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.use((request, response, next) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('X-Frame-Options', 'DENY');
  if (request.path.startsWith('/api/')) {
    response.setHeader('Cache-Control', 'no-store');
  }
  next();
});

function rateLimit({ limit, windowMs }) {
  return (request, response, next) => {
    const now = Date.now();
    const key = `${request.path}:${request.ip || 'unknown'}`;
    let record = rateLimits.get(key);

    if (!record || now - record.startedAt >= windowMs) {
      record = { count: 0, startedAt: now };
      rateLimits.set(key, record);
    }

    if (record.count >= limit) {
      response.setHeader(
        'Retry-After',
        String(Math.ceil((record.startedAt + windowMs - now) / 1000))
      );
      return response.status(429).json({
        error: 'You have made several requests. Please wait a moment and try again.',
      });
    }

    record.count += 1;
    if (rateLimits.size > 5000) {
      const oldestKey = rateLimits.keys().next().value;
      if (oldestKey) rateLimits.delete(oldestKey);
    }
    next();
  };
}

app.post(
  '/api/assistant-chat',
  rateLimit({ limit: 20, windowMs: 60 * 1000 }),
  async (request, response) => {
    const result = await answerGardenAssistant(request.body?.messages);
    return response.status(result.status).json(result.body);
  }
);

if (isDevelopment) {
  const vite = await createViteServer({
    configFile: path.join(root, 'vite.config.ts'),
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);
  app.use(async (request, response, next) => {
    try {
      const template = await vite.transformIndexHtml(
        request.originalUrl,
        await readFile(path.join(root, 'index.html'), 'utf8')
      );
      response.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });
} else {
  const dist = path.join(root, 'dist');
  app.use(express.static(dist));
  app.get('*', (_request, response) => response.sendFile(path.join(dist, 'index.html')));
}

const port = process.env.PORT === undefined ? 3000 : Number(process.env.PORT);
if (!Number.isInteger(port) || port < 0 || port > 65535) {
  throw new Error('PORT must be an integer between 0 and 65535.');
}

export default app;

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = app.listen(port, '0.0.0.0', () => {
    const actualPort = server.address().port;
    console.log(
      `Landscape studio ${isDevelopment ? 'development' : 'server'} listening on port ${actualPort}`
    );
    if (
      !process.env.GEMINI_API_KEY &&
      !process.env.GROQ_API_KEY &&
      !process.env.GROK_API_KEY
    ) {
      console.warn('GEMINI_API_KEY, GROQ_API_KEY, or GROK_API_KEY is not set; AI endpoints will return a configuration error.');
    }
  });
}

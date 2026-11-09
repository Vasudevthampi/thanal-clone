import React, { useEffect, useRef, useState } from 'react';
import { Bot, LoaderCircle, MessageCircle, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const starterQuestions = [
  'Which plants suit a sunny garden?',
  'How can I make a small courtyard feel bigger?',
  'What should I consider before adding a water feature?',
];

const requestTimeoutMs = 30_000;

export const GardenAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: 'Hi! I can help you think through plants, layouts and materials for a garden. What are you planning?',
    },
  ]);
  const [question, setQuestion] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const conversation = conversationRef.current;
    conversation?.scrollTo({ top: conversation.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  const askAssistant = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const nextMessages = [...messages, { role: 'user' as const, text: trimmed }];
    setMessages(nextMessages);
    setQuestion('');
    setError('');
    setIsSending(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), requestTimeoutMs);

    try {
      const response = await fetch('/api/assistant-chat', {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      const errorMessage =
        result && typeof result === 'object' && 'error' in result && typeof result.error === 'string'
          ? result.error
          : null;
      if (!response.ok) {
        throw new Error(errorMessage || 'The assistant could not reply. Please try again.');
      }
      const reply =
        result && typeof result === 'object' && 'reply' in result && typeof result.reply === 'string'
          ? result.reply
          : '';
      if (!reply.trim()) {
        throw new Error('The assistant returned an empty reply. Please try again.');
      }
      setMessages((current) => [...current, { role: 'assistant', text: reply }]);
    } catch (requestError) {
      setError(
        controller.signal.aborted
          ? 'The assistant is taking too long to respond. Please try again.'
          : requestError instanceof Error
            ? requestError.message
            : 'The assistant could not reply. Please try again.'
      );
    } finally {
      window.clearTimeout(timeoutId);
      setIsSending(false);
    }
  };

  return (
    <section
      aria-labelledby="garden-assistant-heading"
      className="mt-8 overflow-hidden rounded-3xl border border-[var(--site-line)] bg-white shadow-[0_16px_50px_rgba(31,58,44,0.06)]"
    >
      <div className="grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col justify-center bg-[var(--site-green)] p-6 text-[var(--site-cream)] sm:p-8">
          <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--site-cream)] text-[var(--site-green)]">
            <Bot className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d9c3a5]">
            <Sparkles className="h-3.5 w-3.5" />
            A little garden guidance
          </p>
          <h2
            id="garden-assistant-heading"
            className="mt-2 font-serif text-2xl font-semibold sm:text-3xl"
          >
            Ask the garden assistant.
          </h2>
          <p className="mt-3 max-w-sm text-xs leading-6 text-white/75 sm:text-sm">
            Ask about plants, layouts or materials. Need a project estimate? Build your brief in the planner and request a quotation.
          </p>
          <div className="mt-6 flex items-center gap-2 text-[10px] text-white/65">
            <MessageCircle className="h-3.5 w-3.5" />
            AI guidance · No final prices or site guarantees
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div
            role="log"
            aria-label="Garden assistant conversation"
            aria-live="polite"
            ref={conversationRef}
            className="flex max-h-72 min-h-44 flex-col gap-3 overflow-y-auto rounded-2xl bg-[var(--site-cream)] p-4"
          >
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${
                  message.role === 'user'
                    ? 'self-end rounded-br-sm bg-[var(--site-green)] text-white'
                    : 'self-start rounded-bl-sm border border-[var(--site-line)] bg-white text-[var(--site-ink)]'
                }`}
              >
                {message.text}
              </div>
            ))}
            {isSending && (
              <div className="inline-flex items-center gap-2 self-start rounded-2xl border border-[var(--site-line)] bg-white px-3.5 py-2.5 text-xs text-[var(--site-muted)]">
                <LoaderCircle className="h-3.5 w-3.5 animate-spin" />
                Thinking through your garden…
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {starterQuestions.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  disabled={isSending}
                  onClick={() => void askAssistant(starter)}
                  className="rounded-full border border-[var(--site-line)] px-3 py-1.5 text-[10px] font-semibold text-[var(--site-muted)] transition hover:border-[var(--site-green-light)] hover:text-[var(--site-green)] disabled:opacity-50"
                >
                  {starter}
                </button>
              ))}
            </div>
          )}

          {error && (
            <p role="alert" className="mt-3 text-xs leading-5 text-[var(--site-terracotta)]">
              {error}
            </p>
          )}

          <form
            className="mt-4 flex items-center gap-2 rounded-full border border-[var(--site-line)] bg-white p-1.5 pl-4 focus-within:border-[var(--site-green)] focus-within:ring-2 focus-within:ring-[var(--site-sage)]"
            onSubmit={(event) => {
              event.preventDefault();
              void askAssistant(question);
            }}
          >
            <label className="sr-only" htmlFor="garden-assistant-question">
              Ask a garden question
            </label>
            <input
              id="garden-assistant-question"
              type="text"
              maxLength={1000}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask a question about your garden…"
              disabled={isSending}
              className="min-w-0 flex-1 bg-transparent py-2 text-xs text-[var(--site-ink)] outline-none placeholder:text-stone-400 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isSending || !question.trim()}
              aria-label="Send question"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--site-green)] text-white transition hover:bg-[var(--site-green-light)] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {isSending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

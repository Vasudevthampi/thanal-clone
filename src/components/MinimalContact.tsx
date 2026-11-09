import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface MinimalContactProps {
  initialNotes?: string;
}

export const MinimalContact: React.FC<MinimalContactProps> = ({ initialNotes = '' }) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState(initialNotes);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setNotes(initialNotes);
    setSubmitted(false);
  }, [initialNotes]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="inquire" className="py-16 sm:py-24 bg-[#faf9f6] dark:bg-[#121312] border-t border-stone-200/80 dark:border-stone-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="contact-kicker mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider">
            Landscape planning
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#142318] dark:text-stone-100">
            Tell us about your project
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Add a few details to prepare a project brief.
          </p>
        </div>

        <div className="inquiry-panel rounded-2xl border p-6 shadow-sm sm:p-8">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto" />
              <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                Project brief prepared
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">
                {name ? `Thank you, ${name}. ` : ''}
                This demo form does not send or store information.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-emerald-700 dark:text-emerald-400 underline font-semibold"
              >
                Edit project details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="project-name" className="inquiry-label mb-1 block text-xs font-semibold">
                  Your name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="contact-input w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2"
                />
              </div>

              <div>
                <label htmlFor="project-notes" className="inquiry-label mb-1 block text-xs font-semibold">
                  Project details
                </label>
                <textarea
                  id="project-notes"
                  rows={5}
                  placeholder="Describe the space, features, or ideas you have in mind."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  className="contact-input w-full rounded-xl border px-3.5 py-3 text-xs focus:outline-none focus:ring-2"
                />
              </div>

              <button
                type="submit"
                className="contact-submit flex w-full items-center justify-center gap-2 rounded-full px-4 py-3.5 text-xs font-bold text-white shadow-sm transition-colors"
              >
                <span>Prepare project brief</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-center text-[11px] text-stone-500">
                Information stays in this browser session and is not submitted.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

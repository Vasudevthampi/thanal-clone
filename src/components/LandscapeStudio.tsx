import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Leaf, MapPin, Sprout } from 'lucide-react';
import { GardenAssistant } from './GardenAssistant';

type SpaceType = 'home-garden' | 'courtyard' | 'terrace' | 'commercial';
type GardenStyle = 'tropical' | 'natural' | 'modern' | 'low-maintenance';
type Feature = 'lawn' | 'pathway' | 'seating' | 'water' | 'lighting' | 'irrigation';

interface PlannerChoices {
  space: SpaceType;
  area: number;
  style: GardenStyle;
  features: Feature[];
  location: string;
  budget: string;
}

interface LandscapeStudioProps {
  onRequestQuote: (brief: string) => void;
}

const spaceOptions: { id: SpaceType; title: string; description: string }[] = [
  { id: 'home-garden', title: 'Home garden', description: 'Front yard, lawn or side garden' },
  { id: 'courtyard', title: 'Courtyard', description: 'A green pause in the heart of home' },
  { id: 'terrace', title: 'Terrace or balcony', description: 'Make every square foot count' },
  { id: 'commercial', title: 'Commercial space', description: 'A welcoming first impression' },
];

const styleOptions: { id: GardenStyle; title: string; description: string }[] = [
  { id: 'tropical', title: 'Lush tropical', description: 'Layered foliage and rich greens' },
  { id: 'natural', title: 'Natural planting', description: 'A relaxed, layered garden' },
  { id: 'modern', title: 'Modern & minimal', description: 'Clean lines and considered details' },
  { id: 'low-maintenance', title: 'Easy to care for', description: 'Beautiful, with less upkeep' },
];

const featureOptions: { id: Feature; label: string }[] = [
  { id: 'lawn', label: 'Lawn' },
  { id: 'pathway', label: 'Stone pathway' },
  { id: 'seating', label: 'A place to sit' },
  { id: 'water', label: 'Water feature' },
  { id: 'lighting', label: 'Garden lighting' },
  { id: 'irrigation', label: 'Irrigation' },
];

const budgetOptions = [
  'Under ₹2 lakh',
  '₹2–5 lakh',
  '₹5–10 lakh',
  '₹10 lakh+',
  'Still exploring',
];

const initialChoices: PlannerChoices = {
  space: 'home-garden',
  area: 800,
  style: 'tropical',
  features: ['lawn', 'pathway'],
  location: '',
  budget: 'Still exploring',
};

export const LandscapeStudio: React.FC<LandscapeStudioProps> = ({ onRequestQuote }) => {
  const [step, setStep] = useState(1);
  const [choices, setChoices] = useState<PlannerChoices>(initialChoices);

  const updateChoices = (updates: Partial<PlannerChoices>) => {
    setChoices((current) => ({ ...current, ...updates }));
  };

  const toggleFeature = (feature: Feature) => {
    const features = choices.features.includes(feature)
      ? choices.features.filter((selected) => selected !== feature)
      : [...choices.features, feature];
    updateChoices({ features });
  };

  const selectedSpace = spaceOptions.find((option) => option.id === choices.space)!;
  const selectedStyle = styleOptions.find((option) => option.id === choices.style)!;
  const selectedFeatures = featureOptions
    .filter((feature) => choices.features.includes(feature.id))
    .map((feature) => feature.label);

  const handleRequestQuote = () => {
    const brief = [
      'I would like a site consultation and quotation for a landscaping project.',
      `Space: ${selectedSpace.title}`,
      `Approximate area: ${choices.area.toLocaleString('en-IN')} sq. ft.`,
      `Preferred style: ${selectedStyle.title}`,
      `Location: ${choices.location.trim() || 'To be confirmed'}`,
      `Budget range: ${choices.budget}`,
      `Priorities: ${selectedFeatures.length ? selectedFeatures.join(', ') : 'Open to recommendations'}`,
    ].join('\n');
    onRequestQuote(brief);
  };

  const resetPlanner = () => {
    setStep(1);
    setChoices(initialChoices);
  };

  return (
    <section
      id="studio"
      className="border-t border-[var(--site-line)] bg-[var(--site-paper)] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[var(--site-green-light)]">
              <span className="h-px w-7 bg-[var(--site-terracotta)]" />
              The Garden Planner
            </div>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-[var(--site-ink)] sm:text-5xl">
              A garden that starts
              <br className="hidden sm:block" /> with your ideas.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--site-muted)] sm:text-base">
              Tell us about your space and what matters to you to prepare a site-specific project brief.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-[var(--site-muted)]">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--site-sage)] text-[var(--site-green)]">
              <Sprout className="h-5 w-5" />
            </span>
            <span>Thoughtful design, rooted in nature</span>
          </div>
        </div>

        <div className="grid overflow-hidden rounded-3xl border border-[var(--site-line)] bg-white shadow-[0_24px_70px_rgba(31,58,44,0.08)] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="p-5 sm:p-8 lg:p-10">
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--site-muted)]">
                <span>Build your brief</span>
                <span>Step {step} of 3</span>
              </div>
              <div className="flex gap-2" aria-label={`Step ${step} of 3`}>
                {[1, 2, 3].map((item) => (
                  <span
                    key={item}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      item <= step ? 'bg-[var(--site-green)]' : 'bg-[var(--site-line)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-7">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[var(--site-ink)]">
                    What are we transforming?
                  </h3>
                  <p className="mt-1 text-sm text-[var(--site-muted)]">
                    Choose the space that feels closest to yours.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {spaceOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={choices.space === option.id}
                        onClick={() => updateChoices({ space: option.id })}
                        className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                          choices.space === option.id
                            ? 'border-[var(--site-green)] bg-[var(--site-sage)] ring-1 ring-[var(--site-green)]'
                            : 'border-[var(--site-line)] bg-white hover:border-[var(--site-green-light)]'
                        }`}
                      >
                        <span className="block text-sm font-bold text-[var(--site-ink)]">{option.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-[var(--site-muted)]">
                          {option.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-[var(--site-cream)] p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <label htmlFor="garden-area" className="text-sm font-bold text-[var(--site-ink)]">
                      Approximate area
                    </label>
                    <span className="rounded-full bg-white px-3 py-1.5 text-sm font-bold tabular-nums text-[var(--site-green)]">
                      {choices.area.toLocaleString('en-IN')} sq. ft.
                    </span>
                  </div>
                  <input
                    id="garden-area"
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={choices.area}
                    onChange={(event) => updateChoices({ area: Number(event.target.value) })}
                    className="h-2 w-full cursor-pointer accent-[var(--site-green)]"
                  />
                  <div className="mt-2 flex justify-between text-[11px] text-[var(--site-muted)]">
                    <span>100 sq. ft.</span>
                    <span>5,000+ sq. ft.</span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-7">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[var(--site-ink)]">
                    Set the mood.
                  </h3>
                  <p className="mt-1 text-sm text-[var(--site-muted)]">
                    Pick a direction; we can refine it together.
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {styleOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={choices.style === option.id}
                        onClick={() => updateChoices({ style: option.id })}
                        className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                          choices.style === option.id
                            ? 'border-[var(--site-green)] bg-[var(--site-sage)] ring-1 ring-[var(--site-green)]'
                            : 'border-[var(--site-line)] bg-white hover:border-[var(--site-green-light)]'
                        }`}
                      >
                        <span className="block text-sm font-bold text-[var(--site-ink)]">{option.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-[var(--site-muted)]">
                          {option.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <fieldset>
                  <legend className="text-sm font-bold text-[var(--site-ink)]">
                    What would you like to include?
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {featureOptions.map((feature) => {
                      const selected = choices.features.includes(feature.id);
                      return (
                        <button
                          key={feature.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => toggleFeature(feature.id)}
                          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition ${
                            selected
                              ? 'border-[var(--site-green)] bg-[var(--site-green)] text-white'
                              : 'border-[var(--site-line)] bg-white text-[var(--site-muted)] hover:border-[var(--site-green-light)]'
                          }`}
                        >
                          {selected && <Check className="h-3.5 w-3.5" />}
                          {feature.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-7">
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-[var(--site-ink)]">
                    Where should we plan for?
                  </h3>
                  <p className="mt-1 text-sm text-[var(--site-muted)]">
                    Share a location and an optional budget range for your quote request.
                  </p>
                </div>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold text-[var(--site-ink)]">
                    Project location
                  </span>
                  <span className="relative block">
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--site-green-light)]" />
                    <input
                      type="text"
                      value={choices.location}
                      onChange={(event) => updateChoices({ location: event.target.value })}
                      placeholder="Town or region"
                      className="w-full rounded-xl border border-[var(--site-line)] bg-white py-3 pl-10 pr-4 text-sm text-[var(--site-ink)] outline-none transition placeholder:text-stone-400 focus:border-[var(--site-green)] focus:ring-2 focus:ring-[var(--site-sage)]"
                    />
                  </span>
                </label>

                <fieldset>
                  <legend className="text-sm font-bold text-[var(--site-ink)]">
                    Approximate budget
                  </legend>
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {budgetOptions.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        aria-pressed={choices.budget === budget}
                        onClick={() => updateChoices({ budget })}
                        className={`rounded-xl border px-3 py-3 text-xs font-semibold transition ${
                          choices.budget === budget
                            ? 'border-[var(--site-green)] bg-[var(--site-sage)] text-[var(--site-green)]'
                            : 'border-[var(--site-line)] bg-white text-[var(--site-muted)] hover:border-[var(--site-green-light)]'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            <div className="mt-9 flex items-center justify-between border-t border-[var(--site-line)] pt-5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => current - 1)}
                  className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-[var(--site-muted)] transition hover:text-[var(--site-green)]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <span className="text-xs text-[var(--site-muted)]">Takes about a minute</span>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep((current) => current + 1)}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--site-green)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--site-green-light)]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRequestQuote}
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--site-terracotta)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#98563b]"
                >
                  Request a quotation
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <aside className="studio-quote-brief relative flex flex-col overflow-hidden bg-[#1f3a2c] p-6 text-[var(--site-cream)] sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-30" aria-hidden="true">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_24%_10%,rgba(182,106,73,0.5),transparent_35%),radial-gradient(ellipse_at_80%_80%,rgba(120,147,109,0.5),transparent_38%)]" />
            </div>

            <div className="relative">
              <div className="studio-quote-icon mb-5 grid h-12 w-12 place-items-center rounded-2xl">
                <Leaf className="h-6 w-6" />
              </div>
              <p className="studio-quote-label text-[10px] font-bold uppercase tracking-[0.18em]">
                Your quotation brief
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                A clear start for your project.
              </h3>
              <p className="studio-quote-intro mt-2 max-w-md text-xs leading-5">
                Your selections are collected here as a planning brief.
              </p>

              <dl className="mt-7 space-y-4">
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="studio-quote-label text-xs">Space</dt>
                  <dd className="studio-quote-value text-right text-xs font-semibold">{selectedSpace.title}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="studio-quote-label text-xs">Approx. area</dt>
                  <dd className="studio-quote-value text-right text-xs font-semibold">
                    {choices.area.toLocaleString('en-IN')} sq. ft.
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="studio-quote-label text-xs">Style</dt>
                  <dd className="studio-quote-value text-right text-xs font-semibold">{selectedStyle.title}</dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="studio-quote-label text-xs">Location</dt>
                  <dd className="studio-quote-value text-right text-xs font-semibold">
                    {choices.location.trim() || 'To be confirmed'}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-3">
                  <dt className="studio-quote-label text-xs">Budget</dt>
                  <dd className="studio-quote-value text-right text-xs font-semibold">{choices.budget}</dd>
                </div>
              </dl>

              <div className="mt-5">
                <p className="studio-quote-label text-[10px] font-bold uppercase tracking-wider">
                  Priorities
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedFeatures.length ? (
                    selectedFeatures.map((feature) => (
                      <span
                        key={feature}
                        className="studio-quote-chip rounded-full border px-3 py-1.5 text-[10px] font-semibold"
                      >
                        {feature}
                      </span>
                    ))
                  ) : (
                    <span className="studio-quote-label text-xs">Open to recommendations</span>
                  )}
                </div>
              </div>
            </div>

            <div className="relative mt-auto flex items-start gap-2 border-t border-white/15 pt-5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--site-cream)]" />
              <p className="studio-quote-note text-[10px] leading-5">
                Final recommendations and pricing depend on site conditions and project scope.
              </p>
            </div>

            <button
              type="button"
              onClick={resetPlanner}
              className="studio-quote-reset relative mt-4 self-start text-xs font-semibold underline underline-offset-4 transition"
            >
              Start a new brief
            </button>
          </aside>
        </div>

        <GardenAssistant />
      </div>
    </section>
  );
};

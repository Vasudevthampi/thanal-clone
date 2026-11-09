import React from 'react';

const projectTypes = [
  'Courtyard gardens',
  'Residential landscapes',
  'Stone pathways',
  'Living walls',
  'Garden lighting',
  'Lawn design',
];

export const ClientsSection: React.FC = () => (
  <section
    id="clients"
    aria-labelledby="clients-heading"
    className="overflow-hidden border-y border-stone-200/80 bg-white py-10 dark:border-stone-800 dark:bg-[#151715] sm:py-12"
  >
    <div className="mx-auto mb-6 max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
        Spaces for living
      </p>
      <h2
        id="clients-heading"
        className="font-serif text-xl font-bold text-[#142318] dark:text-stone-100 sm:text-2xl"
      >
        Landscapes for every setting
      </h2>
    </div>

    <div className="clients-marquee" aria-label="Landscape project types">
      <div className="clients-marquee-track">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="clients-marquee-group"
            aria-hidden={copy === 1}
          >
            {projectTypes.map((projectType) => (
              <span
                key={projectType}
                className="client-name whitespace-nowrap"
              >
                {projectType}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);

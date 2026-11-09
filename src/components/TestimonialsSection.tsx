import React from 'react';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const designPrinciples = [
    {
      title: 'Site-aware planning',
      description: 'Begin with the site: its light, drainage, existing plants, and how people move through it.',
      detail: 'Every space is different',
    },
    {
      title: 'Materials that belong',
      description: 'Balance stone, timber, and greenery to create outdoor spaces that feel connected to their surroundings.',
      detail: 'Natural textures',
    },
    {
      title: 'Comfort outdoors',
      description: 'Use shade, planting, and considered circulation to make gardens more welcoming throughout the day.',
      detail: 'Designed for daily use',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400 mb-3">
            <span>Design Approach</span>
            <span aria-hidden="true">·</span>
            <span>Landscape Principles</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 dark:text-stone-100 text-balance">
            Thoughtful outdoor spaces
          </h2>
        </div>

        {/* Design principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {designPrinciples.map((item) => (
            <div
              key={item.title}
              className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-forest-700/30 dark:text-emerald-400/20 mb-4" />
                <h3 className="font-serif text-lg font-bold text-forest-950 dark:text-stone-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
                <div className="mt-2 text-[11px] font-mono font-semibold text-forest-700 dark:text-emerald-400">
                  {item.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

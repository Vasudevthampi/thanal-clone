import React from 'react';
import { ArrowRight, Compass, Calculator, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  heroImage: string;
  onExplorePortfolio: () => void;
  onOpenEstimator: () => void;
  onOpenAssetModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  heroImage,
  onExplorePortfolio,
  onOpenEstimator,
  onOpenAssetModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column or asymmetric hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Architectural Editorial Copy */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            
            {/* Clean unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-medium text-forest-800 dark:text-emerald-400">
              <span className="tracking-widest uppercase">Architectural Landscaping Studio</span>
              <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">/</span>
              <span>South India &amp; Tropical Living</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-950 dark:text-stone-100 leading-[1.1] text-balance">
              Where Architecture Meets Nature&apos;s Sanctuary.
            </h1>

            {/* Value Proposition Prose */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl">
              Thoughtful outdoor environments, serene courtyards, and sustainable gardens bring calm, shade, and harmony to everyday living.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenEstimator}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-forest-900 hover:bg-forest-800 active:bg-forest-950 transition-all rounded-xl shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculate Project Estimate</span>
              </button>

              <button
                onClick={onExplorePortfolio}
                className="px-6 py-3.5 text-sm font-semibold text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800/80 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors rounded-xl flex items-center gap-2"
              >
                <span>View Selected Works</span>
                <ArrowRight className="w-4 h-4 text-forest-700" />
              </button>
            </div>

            {/* Design note */}
            <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 text-xs text-stone-500 dark:text-stone-400 flex items-center gap-3">
              <span className="font-serif italic text-forest-900 dark:text-forest-200 font-semibold text-sm">
                Designed for living
              </span>
              <span>— Outdoor spaces shaped around nature and daily life.</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 aspect-16/10 group">
              <img
                src={heroImage}
                alt="Villa garden with a water feature and pergola"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
              {/* Subtle ambient gradient overlay for caption legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

              {/* Caption Tag */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-medium">Villa Garden</span>
                </div>
                <button
                  onClick={onOpenAssetModal}
                  className="bg-black/50 hover:bg-black/70 backdrop-blur-xs text-[11px] text-stone-200 px-2.5 py-1 rounded transition-colors"
                  title="Upload your own hero photo"
                >
                  Change Photo
                </button>
              </div>
            </div>

            {/* Decorative architectural grid accent */}
            <div className="hidden sm:flex absolute -bottom-6 -right-6 -z-10 w-44 h-44 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800" />
          </div>
        </div>

        {/* Full-width 4-Column Proof & Trust Metric Strip */}
        <div className="mt-14 lg:mt-18 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-forest-950 dark:text-stone-100 tabular-nums">
              Site-specific
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-medium">
              Planning
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">            Designed around each space</p>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-forest-950 dark:text-stone-100 tabular-nums">
              Material-led
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-medium">
              Design
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">            Stone, timber, and greenery</p>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-forest-950 dark:text-stone-100 tabular-nums">
              Plant-focused
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-medium">
              Planting
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">            Selected for each setting</p>
          </div>

          <div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-forest-950 dark:text-stone-100 tabular-nums">
              Long-lasting
            </div>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 font-medium">
              Outdoor Spaces
            </p>
            <p className="text-[11px] text-stone-400 mt-0.5">            Made to mature over time</p>
          </div>
        </div>

      </div>
    </section>
  );
};

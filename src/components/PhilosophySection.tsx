import React from 'react';
import { Sun, Wind, Droplet, Trees } from 'lucide-react';

export const PhilosophySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-stone-100/70 dark:bg-stone-900/40 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Design approach */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400">
              <span>Design approach</span>
              <span aria-hidden="true">·</span>
              <span>Ecological Architecture</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 dark:text-stone-100 leading-tight text-balance">
              Landscape as a living sanctuary.
            </h2>

            <div className="space-y-4 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                A thoughtful garden brings the relief of stepping beneath a leafy canopy. It is where shade cools the ground, breezes move through open spaces, and planting softens the transition between home and nature.
              </p>
              <p>
                Gardens can balance hard surfaces with planting, permeable paths, and water-conscious choices. Each element is selected to suit the site's conditions and the way the space will be used.
              </p>
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-semibold text-forest-950 dark:text-stone-200 block">Microclimate Mitigation</span>
                <span className="text-stone-500">Natural passive cooling without energy costs</span>
              </div>
              <div>
                <span className="font-semibold text-forest-950 dark:text-stone-200 block">Enduring Stone Masonry</span>
                <span className="text-stone-500">Locally quarried granite that matures over decades</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Ecological Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-forest-950/60 text-forest-800 dark:text-emerald-400 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-forest-950 dark:text-stone-100">
                01. Solar Orientation
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                We position multi-tiered canopies to block intense afternoon thermal radiation while welcoming gentle morning illumination.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-forest-950/60 text-forest-800 dark:text-emerald-400 flex items-center justify-center">
                <Wind className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-forest-950 dark:text-stone-100">
                02. Wind Corridors
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Strategic planting funnels prevailing breezes through open courtyards and residential verandas to establish natural cross-ventilation.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-forest-950/60 text-forest-800 dark:text-emerald-400 flex items-center justify-center">
                <Droplet className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-forest-950 dark:text-stone-100">
                03. Rainwater Recharging
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Zero rainwater runoff leaves our sites. Permeable hardscaping and bioswales replenish underground aquifers during monsoon rains.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-forest-50 dark:bg-forest-950/60 text-forest-800 dark:text-emerald-400 flex items-center justify-center">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-base text-forest-950 dark:text-stone-100">
                04. Native Biodiversity
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                By selecting 100% native and climate-adapted flora, our gardens require 70% less water while welcoming songbirds, butterflies, and pollinators.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

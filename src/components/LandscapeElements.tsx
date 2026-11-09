import React, { useState } from 'react';
import {
  Sprout,
  Layers,
  Footprints,
  Boxes,
  Flower2,
  Grid,
  Trees,
  Droplets,
  Sun,
  Check,
  RefreshCw,
} from 'lucide-react';

export type LandscapeCategory =
  | 'all'
  | 'ground'
  | 'stone'
  | 'flora'
  | 'water'
  | 'lighting';

export interface LandscapeElement {
  id: string;
  name: string;
  landscapeType: string;
  category: 'ground' | 'stone' | 'flora' | 'water' | 'lighting';
  icon: React.ReactNode;
  badgeBg: string;
  badgeText: string;
  shortDesc: string;
  details: string;
}

export const LANDSCAPE_ELEMENTS: LandscapeElement[] = [
  {
    id: 'turf',
    name: 'Velvet Mexican Grass Turf',
    landscapeType: 'Natural Lawn Groundcover',
    category: 'ground',
    icon: <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    shortDesc: 'Fine-textured, acclimatized natural Zoysia sod rolls.',
    details: 'Grade-leveled red soil bed with organic base enrichment.',
  },
  {
    id: 'pebbles',
    name: 'Polished River Pebble Mosaic',
    landscapeType: 'River Stone Groundcover',
    category: 'ground',
    icon: <Layers className="w-5 h-5 text-stone-600 dark:text-stone-300" />,
    badgeBg: 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700',
    badgeText: 'text-stone-700 dark:text-stone-300',
    shortDesc: 'Contrasting black river basalt and snow-white quartz stones.',
    details: 'Laid over weed-barrier geotextile membrane for zero maintenance.',
  },
  {
    id: 'steppers',
    name: 'Hand-Chiseled Granite Steppers',
    landscapeType: 'Natural Stone Pathways',
    category: 'stone',
    icon: <Footprints className="w-5 h-5 text-slate-700 dark:text-slate-300" />,
    badgeBg: 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
    badgeText: 'text-slate-800 dark:text-slate-200',
    shortDesc: 'Rough-textured non-slip organic stone pathway blocks.',
    details: 'Curved along the natural contours of your garden.',
  },
  {
    id: 'laterite',
    name: 'Laterite Block Borders',
    landscapeType: 'Indigenous Masonry Borders',
    category: 'stone',
    icon: <Boxes className="w-5 h-5 text-amber-700 dark:text-amber-400" />,
    badgeBg: 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-800 dark:text-amber-300',
    shortDesc: 'Earthy reddish-brown hand-cut laterite edge coping.',
    details: 'Traditional stone masonry framing lawns and flowerbeds.',
  },
  {
    id: 'urns',
    name: 'Terracotta Urns & Water Amphora',
    landscapeType: 'Traditional Garden Accents',
    category: 'stone',
    icon: <Flower2 className="w-5 h-5 text-orange-700 dark:text-orange-400" />,
    badgeBg: 'bg-orange-50 dark:bg-orange-950/60 border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-800 dark:text-orange-300',
    shortDesc: 'Handmade earthen pots for seasonal blooms & aquatic lilies.',
    details: 'Clay-baked terracotta with drainage holes and gravel filtration.',
  },
  {
    id: 'greenwall',
    name: 'Modular Living Bio-Wall',
    landscapeType: 'Vertical Greening System',
    category: 'flora',
    icon: <Grid className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />,
    badgeBg: 'bg-emerald-100/60 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-700',
    badgeText: 'text-emerald-900 dark:text-emerald-200',
    shortDesc: 'High-density vertical fabric pocket cells with ferns & philodendrons.',
    details: 'Concealed automated manifold delivering uniform hydration.',
  },
  {
    id: 'tropical-flora',
    name: 'Specimen Palms & Exotic Foliage',
    landscapeType: 'Tropical Plant Canopy',
    category: 'flora',
    icon: <Trees className="w-5 h-5 text-emerald-800 dark:text-emerald-300" />,
    badgeBg: 'bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-800 dark:text-teal-300',
    shortDesc: 'Foxtail palms, Licuala grandis, Agave, and bird of paradise.',
    details: 'Strategically positioned for shade, depth, and garden cooling.',
  },
  {
    id: 'water-feature',
    name: 'Reflective Lotus Basin & Spout',
    landscapeType: 'Natural Water Feature',
    category: 'water',
    icon: <Droplets className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-800 dark:text-cyan-300',
    shortDesc: 'Natural carved stone water rill with underwater recirculating pump.',
    details: 'Calming auditory trickle with aquatic blue lilies and guppies.',
  },
  {
    id: 'lighting',
    name: 'Warm Garden Night Lighting',
    landscapeType: 'Ambient Garden Illumination',
    category: 'lighting',
    icon: <Sun className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
    badgeBg: 'bg-yellow-50 dark:bg-yellow-950/60 border-yellow-200 dark:border-yellow-800',
    badgeText: 'text-yellow-900 dark:text-yellow-200',
    shortDesc: 'Concealed 3000K warm LED path spike lights & palm uplights.',
    details: 'Weatherproof subterranean brass and matte black fixtures.',
  },
];

interface LandscapeElementsProps {
  selectedElements: string[];
  onToggleElement: (id: string) => void;
  onSelectAll?: () => void;
  onResetDefault?: () => void;
  className?: string;
}

export const LandscapeElements: React.FC<LandscapeElementsProps> = ({
  selectedElements,
  onToggleElement,
  onSelectAll,
  onResetDefault,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<LandscapeCategory>('all');

  const filteredElements =
    activeCategory === 'all'
      ? LANDSCAPE_ELEMENTS
      : LANDSCAPE_ELEMENTS.filter((el) => el.category === activeCategory);

  const categories: { id: LandscapeCategory; label: string }[] = [
    { id: 'all', label: 'All Elements' },
    { id: 'ground', label: 'Groundcover & Lawns' },
    { id: 'stone', label: 'Stone & Masonry' },
    { id: 'flora', label: 'Flora & Bio-Walls' },
    { id: 'water', label: 'Water Features' },
    { id: 'lighting', label: 'Night Lighting' },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Choose Landscaping Elements
          </div>
          <span className="text-[11px] text-stone-500">
            {selectedElements.length} of {LANDSCAPE_ELEMENTS.length} elements selected
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onSelectAll && (
            <button
              type="button"
              onClick={onSelectAll}
              className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
            >
              Select All
            </button>
          )}
          {onSelectAll && onResetDefault && (
            <span className="text-stone-300 dark:text-stone-700">·</span>
          )}
          {onResetDefault && (
            <button
              type="button"
              onClick={onResetDefault}
              className="text-[11px] text-stone-500 hover:text-emerald-800 dark:hover:text-emerald-400 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Default</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setActiveCategory(cat.id)}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#172b1d] text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Landscaping Element Cards — Clean Visual Tokens, NO PHOTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
        {filteredElements.map((el) => {
          const isChecked = selectedElements.includes(el.id);
          return (
            <button
              key={el.id}
              type="button"
              onClick={() => onToggleElement(el.id)}
              className={`p-3 rounded-xl text-left transition-all border cursor-pointer relative group flex flex-col justify-between ${
                isChecked
                  ? 'bg-white dark:bg-stone-800/90 border-emerald-600 dark:border-emerald-500 shadow-sm ring-1 ring-emerald-500/20'
                  : 'bg-white/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700/80 text-stone-600 dark:text-stone-400 hover:border-stone-300 hover:bg-white'
              }`}
            >
              {/* Header: Icon + Landscape Type + Checkbox */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${el.badgeBg}`}
                  >
                    {el.icon}
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${el.badgeBg} ${el.badgeText}`}
                  >
                    {el.landscapeType}
                  </span>
                </div>

                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                    isChecked
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900'
                  }`}
                >
                  {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              {/* Title & Short Description */}
              <div>
                <div
                  className={`font-serif font-bold text-xs sm:text-sm ${
                    isChecked
                      ? 'text-[#142318] dark:text-stone-100'
                      : 'text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {el.name}
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                  {el.shortDesc}
                </p>
              </div>

              {/* Craftsmanship Note */}
              <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-700/60 text-[10px] text-emerald-800 dark:text-emerald-400 font-medium">
                {el.details}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

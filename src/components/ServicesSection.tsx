import React, { useState } from 'react';
import { Compass, Hammer, Droplets, SunMedium, Layers, Sprout, ArrowRight, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      index: '01',
      title: 'Landscape Architecture & Masterplanning',
      icon: Compass,
      tag: 'Design & Spatial Planning',
      description: 'Comprehensive 3D topographical site modeling, micro-climate orientation analysis, solar trajectory study, and sensory zoning for private residences and estates.',
      deliverables: ['Detailed 3D Masterplan & Cadastre', 'Sun & Wind Microclimate Simulation', 'Comprehensive Horticultural Planting Palette', 'Material Specifications & Civil BOQ'],
      timeline: '2–3 Weeks Design Phase',
    },
    {
      index: '02',
      title: 'Precision Natural Stone Hardscaping',
      icon: Hammer,
      tag: 'Civil Craftsmanship',
      description: 'Artisanal hand-chiseled Malabar granite steps, dry-stack boulder retaining walls, permeable gravel pathways, and architectural limestone terraces crafted to weather gracefully.',
      deliverables: ['Dry-Stack Stone & Boulder Retaining Walls', 'Permeable Flagstone Stepping Pathways', 'Sunken Granite Fire Lounges & Amphitheaters', 'Anti-Slip Honed Limestone Decking'],
      timeline: 'Executed in Tandem with Civil Works',
    },
    {
      index: '03',
      title: 'Water Features & Living Bio-Pools',
      icon: Droplets,
      tag: 'Aquatic Architecture',
      description: 'Hand-carved monolithic stone fountains, tranquil reflection rills, bubbling basalt basins, and chemical-free biological swimming ponds filtered by wetland flora.',
      deliverables: ['Submerged Natural Water Rills', 'Monolithic Hand-Carved Water Basins', 'Quiet Energy-Efficient Circulation Pumps', 'Natural Biological Wetland Filtration'],
      timeline: '3–4 Weeks Construction',
    },
    {
      index: '04',
      title: 'Courtyard Lightwells & Micro-Climate Gardens',
      icon: SunMedium,
      tag: 'Interior-Exterior Harmony',
      description: 'Transforming central lightwells into lush indoor sanctuaries that naturally drop ambient interior temperatures by 3–5°C while creating private meditative focal points.',
      deliverables: ['Micro-Misting & Passive Evaporative Cooling', 'Shade-Tolerant Native Understory Flora', 'Acoustic Sound Dampening Basalt Buffers', 'Internal Automated Sub-Soil Drainage'],
      timeline: '2–3 Weeks Installation',
    },
    {
      index: '05',
      title: 'Terrace & Rooftop Living Sanctuaries',
      icon: Layers,
      tag: 'Structural Greenery',
      description: 'Engineered lightweight growing media, thermal insulation barriers, powder-coated steel planter systems, and wind-tolerant tropical plantings for luxury apartments and sky villas.',
      deliverables: ['Engineered Ultra-Lightweight Soil Matrix', 'High-Spec Multi-Layer Waterproofing Membrane', 'Architectural Timber or Steel Shade Pergolas', 'Automated Wind-Resistant Fertigation'],
      timeline: '3–5 Weeks Installation',
    },
    {
      index: '06',
      title: 'Sustainable Horticultural Care & Irrigation',
      icon: Sprout,
      tag: 'Long-term Stewardship',
      description: 'Automated weather-adaptive drip irrigation networks paired with dedicated quarterly botanical audits, organic fertilization, and seasonal pruning schedules.',
      deliverables: ['Smart IoT Rain-Sensing Controllers', 'Root-Zone Drip Emitter Networks', 'Quarterly Horticultural Health Audits', '3-Year Plant Replacement Warranty'],
      timeline: 'Included 12 Months Complimentary',
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-stone-50 dark:bg-stone-900/40 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400 mb-3">
              <span>Disciplines &amp; Craft</span>
              <span aria-hidden="true">·</span>
              <span>End-to-End Execution</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 dark:text-stone-100 text-balance">
              Disciplined Landscape Architecture &amp; Living Craft
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md">
            From initial site grading and stonework to plant selection and irrigation, each stage is planned to work together.
          </p>
        </div>

        {/* 6 Services Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            const isExpanded = selectedService === idx;

            return (
              <div
                key={svc.index}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-forest-700/60 dark:hover:border-forest-600 transition-all duration-300 shadow-xs hover:shadow-md group"
              >
                <div>
                  {/* Top line with editorial number and icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-forest-700 dark:text-emerald-400">
                      {svc.index}.
                    </span>
                    <div className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-forest-900 dark:text-emerald-300 group-hover:bg-forest-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Clean unboxed tag */}
                  <div className="text-[11px] font-medium uppercase tracking-wider text-stone-400 mb-2">
                    {svc.tag}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-forest-950 dark:text-stone-100 mb-3 group-hover:text-forest-800 transition-colors">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
                    {svc.description}
                  </p>
                </div>

                {/* Deliverables disclosure or list */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                  <button
                    onClick={() => setSelectedService(isExpanded ? null : idx)}
                    className="w-full flex items-center justify-between text-xs font-semibold text-forest-800 dark:text-emerald-400 hover:text-forest-950 transition-colors py-1"
                  >
                    <span>{isExpanded ? 'Hide Deliverables' : 'View Specifications &amp; Deliverables'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="mt-3 space-y-2 text-xs text-stone-600 dark:text-stone-400 animate-fade-in bg-stone-50 dark:bg-stone-800/50 p-3 rounded-lg">
                      <div className="font-semibold text-forest-900 dark:text-stone-200 text-[11px] uppercase tracking-wider mb-1">
                        Key Deliverables:
                      </div>
                      {svc.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-forest-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                      <div className="pt-2 mt-2 border-t border-stone-200/60 dark:border-stone-700 text-[11px] font-mono text-stone-500">
                        Typical Timeline: {svc.timeline}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React, { useState, useMemo } from 'react';
import { calculateEstimate, EstimatorOptions, EstimateResult } from '../utils/estimator';
import { Calculator, Clock, Leaf, Shield, Check, ArrowRight, HelpCircle } from 'lucide-react';

interface CostEstimatorProps {
  onApplyEstimateToContact: (summary: string) => void;
}

export const CostEstimator: React.FC<CostEstimatorProps> = ({ onApplyEstimateToContact }) => {
  const [propertyType, setPropertyType] = useState<EstimatorOptions['propertyType']>('villa');
  const [areaSqFt, setAreaSqFt] = useState<number>(2400);
  const [finishTier, setFinishTier] = useState<EstimatorOptions['finishTier']>('architectural');
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  const [features, setFeatures] = useState({
    hardscaping: true,
    irrigation: true,
    waterFeature: true,
    lighting: true,
    pergola: false,
    specimenTrees: true,
  });

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const estimate: EstimateResult = useMemo(() => {
    return calculateEstimate({
      propertyType,
      areaSqFt,
      features,
      finishTier,
    });
  }, [propertyType, areaSqFt, features, finishTier]);

  const currencyMultiplier = currency === 'INR' ? 83 : 1;
  const currencySymbol = currency === 'INR' ? '₹' : '$';

  const formatAmount = (val: number) => {
    const adjusted = Math.round(val * currencyMultiplier);
    if (currency === 'INR') {
      // Indian numbering format (Lakhs)
      return `${currencySymbol}${adjusted.toLocaleString('en-IN')}`;
    }
    return `${currencySymbol}${adjusted.toLocaleString('en-US')}`;
  };

  const handleBookWithEstimate = () => {
    const summaryText = `${propertyType.toUpperCase()} Landscape (${areaSqFt.toLocaleString()} sq.ft) - ${finishTier.replace('_', ' ').toUpperCase()} tier. Estimated Budget: ${formatAmount(estimate.totalEstimatedMin)} - ${formatAmount(estimate.totalEstimatedMax)} (${estimate.projectDurationWeeks} weeks). Selected Features: ${Object.entries(features).filter(([_, v]) => v).map(([k]) => k).join(', ')}.`;
    onApplyEstimateToContact(summaryText);
  };

  return (
    <section id="estimator" className="py-16 sm:py-24 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-forest-800 dark:text-emerald-400 mb-2">
            <span>Transparent Pricing</span>
            <span aria-hidden="true">·</span>
            <span>Instant Feasibility</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950 dark:text-stone-100 text-balance">
            Interactive Landscape Cost &amp; Timeline Calculator
          </h2>
          <p className="mt-3 text-base text-stone-600 dark:text-stone-400">
            Configure your site footprint, preferred architectural features, and material specifications for an instant, data-backed estimate.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-stone-50 dark:bg-stone-900/60 p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800">
            
            {/* 1. Property Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                1. Select Property Context
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'villa', label: 'Residential Villa', sub: 'Garden & Lawns' },
                  { id: 'courtyard', label: 'Internal Courtyard', sub: 'Lightwells & Atriums' },
                  { id: 'terrace', label: 'Rooftop / Terrace', sub: 'Elevated Decking' },
                  { id: 'estate', label: 'Sprawling Estate', sub: 'Acreage & Slopes' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => {
                      setPropertyType(type.id as any);
                      if (type.id === 'courtyard' && areaSqFt > 1500) setAreaSqFt(850);
                      if (type.id === 'terrace' && areaSqFt > 3000) setAreaSqFt(1400);
                      if (type.id === 'estate' && areaSqFt < 4000) setAreaSqFt(6500);
                    }}
                    className={`p-3 text-left rounded-xl border transition-all ${
                      propertyType === type.id
                        ? 'bg-forest-900 text-white border-forest-900 shadow-sm'
                        : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-700 hover:border-forest-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{type.label}</div>
                    <div className={`text-[10px] mt-0.5 ${propertyType === type.id ? 'text-forest-200' : 'text-stone-400'}`}>
                      {type.sub}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Footprint Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  2. Landscaping Area Footprint
                </label>
                <div className="font-mono text-sm font-bold text-forest-900 dark:text-emerald-400 tabular-nums">
                  {areaSqFt.toLocaleString()} sq.ft
                </div>
              </div>
              
              <input
                type="range"
                min="300"
                max="15000"
                step="100"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-lg appearance-none cursor-pointer accent-forest-900 dark:accent-emerald-500"
              />
              
              <div className="flex justify-between text-[11px] text-stone-400 mt-1 font-mono">
                <span>300 sq.ft</span>
                <span>5,000 sq.ft</span>
                <span>10,000 sq.ft</span>
                <span>15,000+ sq.ft</span>
              </div>
            </div>

            {/* 3. Architectural Elements Toggles */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                3. Architectural Features &amp; Engineering
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {[
                  { key: 'hardscaping', label: 'Natural Stone Hardscaping', desc: 'Granite steppers, flagstone & retaining walls' },
                  { key: 'irrigation', label: 'Automated Drip Irrigation', desc: 'Rain-sensing smart controllers & sub-soil lines' },
                  { key: 'waterFeature', label: 'Architectural Water Basin / Rill', desc: 'Carved granite basin, bio-filter & circulation' },
                  { key: 'lighting', label: 'Ambient Landscape Illumination', desc: 'Low-voltage warm architectural path lights' },
                  { key: 'pergola', label: 'Timber Pergola / Shaded Pavilion', desc: 'Weather-treated hardwood or dark steel louvers' },
                  { key: 'specimenTrees', label: 'Mature Specimen Trees', desc: 'Sculpted Frangipani, Licuala or native canopy trees' },
                ].map((item) => {
                  const isChecked = (features as any)[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => toggleFeature(item.key as any)}
                      className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-colors ${
                        isChecked
                          ? 'bg-white dark:bg-stone-800 border-forest-800 dark:border-emerald-600 shadow-xs'
                          : 'bg-white/60 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-forest-900 text-white' : 'border border-stone-300 dark:border-stone-600'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <div>
                        <div className={`font-semibold ${isChecked ? 'text-forest-950 dark:text-stone-100' : 'text-stone-600 dark:text-stone-400'}`}>
                          {item.label}
                        </div>
                        <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                          {item.desc}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Specification Tier */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3">
                4. Material &amp; Botanical Tier
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'essential', label: 'Essential Greenery', desc: 'Native lawn, layered shrubs, simple stone steppers' },
                  { id: 'architectural', label: 'Architectural Signature', desc: 'Custom granite masonry, exotic accents, accent lighting' },
                  { id: 'luxury_bespoke', label: 'Luxury Bespoke Sanctuary', desc: 'Imported natural stone, mature specimen trees, water engineering' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setFinishTier(tier.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      finishTier === tier.id
                        ? 'bg-forest-900 text-white border-forest-900 shadow-xs'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-forest-700'
                    }`}
                  >
                    <div className="text-xs font-semibold">{tier.label}</div>
                    <div className={`text-[10px] mt-1 leading-snug ${finishTier === tier.id ? 'text-forest-200' : 'text-stone-400'}`}>
                      {tier.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Output Card (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 bg-forest-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-forest-800/80">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                  Project Estimate Summary
                </span>
                <h3 className="font-serif text-xl font-bold mt-0.5 text-stone-100">
                  {propertyType === 'villa' ? 'Residential Villa Sanctuary' : propertyType === 'courtyard' ? 'Courtyard Lightwell' : propertyType === 'terrace' ? 'Penthouse Sky Terrace' : 'Sprawling Estate'}
                </h3>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center bg-forest-900 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-2 py-0.5 rounded font-mono ${currency === 'INR' ? 'bg-forest-700 text-white' : 'text-forest-300'}`}
                >
                  INR (₹)
                </button>
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-2 py-0.5 rounded font-mono ${currency === 'USD' ? 'bg-forest-700 text-white' : 'text-forest-300'}`}
                >
                  USD ($)
                </button>
              </div>
            </div>

            {/* Big Estimated Total */}
            <div>
              <span className="text-xs text-forest-300 uppercase tracking-wider block">
                Estimated Project Investment
              </span>
              <div className="font-mono text-3xl sm:text-4xl font-bold text-white mt-1 tabular-nums">
                {formatAmount(estimate.totalEstimatedMin)} &ndash; {formatAmount(estimate.totalEstimatedMax)}
              </div>
              <p className="text-[11px] text-forest-400 mt-1">
                Includes architectural design, soil enrichment, civil hardscaping, plantings, and 12-month growth guarantee.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-forest-800/80">
              <div className="p-3 bg-forest-900/60 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-forest-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Execution Timeline</span>
                </div>
                <div className="font-mono text-base font-bold text-white mt-1">
                  ~{estimate.projectDurationWeeks} Weeks
                </div>
              </div>

              <div className="p-3 bg-forest-900/60 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs text-forest-300">
                  <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Carbon Offset</span>
                </div>
                <div className="font-mono text-base font-bold text-white mt-1">
                  ~{estimate.carbonOffsetEstimateKgYear} kg/year
                </div>
              </div>
            </div>

            {/* Scope Breakdown */}
            <div className="space-y-2 text-xs pt-3 border-t border-forest-800/80">
              <div className="flex justify-between text-forest-300">
                <span>Horticulture &amp; Botanical Flora</span>
                <span className="font-mono tabular-nums text-white">{formatAmount(estimate.plantingCost)}</span>
              </div>
              <div className="flex justify-between text-forest-300">
                <span>Civil Hardscaping &amp; Masonry</span>
                <span className="font-mono tabular-nums text-white">{formatAmount(estimate.hardscapeCost)}</span>
              </div>
              <div className="flex justify-between text-forest-300">
                <span>Architectural Engineering &amp; Additions</span>
                <span className="font-mono tabular-nums text-white">{formatAmount(estimate.featuresCost)}</span>
              </div>
            </div>

            {/* Trust badge */}
            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-200 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Planning estimate:</strong> Use this early estimate as a guide; final costs depend on site conditions, selected materials, and project scope.
              </span>
            </div>

            {/* CTA: Apply to Booking Form */}
            <button
              onClick={handleBookWithEstimate}
              className="w-full py-3.5 px-4 text-sm font-semibold text-forest-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 transition-colors rounded-xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Book Consultation With This Estimate</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

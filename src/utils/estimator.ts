/**
 * Pure calculation logic for the landscape project estimator.
 */

export interface EstimatorOptions {
  propertyType: 'villa' | 'courtyard' | 'terrace' | 'estate';
  areaSqFt: number; // In square feet
  features: {
    hardscaping: boolean;
    irrigation: boolean;
    waterFeature: boolean;
    lighting: boolean;
    pergola: boolean;
    specimenTrees: boolean;
  };
  finishTier: 'essential' | 'architectural' | 'luxury_bespoke';
}

export interface EstimateResult {
  baseCost: number;
  hardscapeCost: number;
  plantingCost: number;
  featuresCost: number;
  totalEstimatedMin: number;
  totalEstimatedMax: number;
  projectDurationWeeks: number;
  recommendedMaintenanceMonths: number;
  carbonOffsetEstimateKgYear: number;
}

const PROPERTY_BASE_RATE_PER_SQFT = {
  courtyard: 65,
  villa: 45,
  terrace: 55,
  estate: 35,
};

const FINISH_TIER_MULTIPLIERS = {
  essential: 1.0,
  architectural: 1.35,
  luxury_bespoke: 1.8,
};

export function calculateEstimate(options: EstimatorOptions): EstimateResult {
  const area = Math.max(100, Math.min(50000, options.areaSqFt));
  const baseRate = PROPERTY_BASE_RATE_PER_SQFT[options.propertyType] || 45;
  const tierMultiplier = FINISH_TIER_MULTIPLIERS[options.finishTier] || 1.35;

  // Base civil and soil preparation
  const rawBase = area * baseRate * tierMultiplier;
  
  // Softscaping (planting, lawn, enriched soil, mulch)
  const plantingCost = Math.round(rawBase * 0.45);
  
  // Hardscaping portion
  const hardscapeCost = options.features.hardscaping 
    ? Math.round(rawBase * 0.40) 
    : Math.round(rawBase * 0.15);

  // Modular feature additions
  let featuresCost = 0;
  if (options.features.irrigation) {
    featuresCost += Math.round(area * 6.5);
  }
  if (options.features.lighting) {
    featuresCost += Math.round(area * 7.5);
  }
  if (options.features.waterFeature) {
    featuresCost += 3500;
  }
  if (options.features.pergola) {
    featuresCost += 5800;
  }
  if (options.features.specimenTrees) {
    featuresCost += 4200;
  }

  const subtotal = plantingCost + hardscapeCost + featuresCost;
  const minCost = Math.round(subtotal * 0.92);
  const maxCost = Math.round(subtotal * 1.15);

  // Estimated timeframe based on scale and features
  let weeks = 3;
  if (area > 1500) weeks += 2;
  if (area > 4000) weeks += 3;
  if (options.features.waterFeature) weeks += 1;
  if (options.features.pergola) weeks += 1;

  // Carbon sequestered based on lush vegetation footprint
  const carbonOffsetEstimateKgYear = Math.round(area * 0.85);

  return {
    baseCost: rawBase,
    hardscapeCost,
    plantingCost,
    featuresCost,
    totalEstimatedMin: minCost,
    totalEstimatedMax: maxCost,
    projectDurationWeeks: weeks,
    recommendedMaintenanceMonths: 12,
    carbonOffsetEstimateKgYear,
  };
}

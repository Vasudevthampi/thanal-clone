import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate } from './estimator';

test('calculateEstimate returns valid cost bounds for a courtyard garden', () => {
  const result = calculateEstimate({
    propertyType: 'courtyard',
    areaSqFt: 600,
    features: {
      hardscaping: true,
      irrigation: true,
      waterFeature: true,
      lighting: true,
      pergola: false,
      specimenTrees: false,
    },
    finishTier: 'architectural',
  });

  assert.ok(result.totalEstimatedMin > 0, 'Min estimate should be positive');
  assert.ok(result.totalEstimatedMax > result.totalEstimatedMin, 'Max should exceed min');
  assert.ok(result.projectDurationWeeks >= 3, 'Courtyard should take at least 3 weeks');
  assert.ok(result.carbonOffsetEstimateKgYear > 0, 'Should offset carbon');
});

test('calculateEstimate scales with area correctly', () => {
  const small = calculateEstimate({
    propertyType: 'villa',
    areaSqFt: 500,
    features: {
      hardscaping: false,
      irrigation: false,
      waterFeature: false,
      lighting: false,
      pergola: false,
      specimenTrees: false,
    },
    finishTier: 'essential',
  });

  const large = calculateEstimate({
    propertyType: 'villa',
    areaSqFt: 2500,
    features: {
      hardscaping: false,
      irrigation: false,
      waterFeature: false,
      lighting: false,
      pergola: false,
      specimenTrees: false,
    },
    finishTier: 'essential',
  });

  assert.ok(large.totalEstimatedMin > small.totalEstimatedMin, 'Larger area must cost more');
  assert.ok(large.projectDurationWeeks > small.projectDurationWeeks, 'Larger area requires more time');
});

test('luxury bespoke finish tier increases estimate relative to essential tier', () => {
  const essential = calculateEstimate({
    propertyType: 'terrace',
    areaSqFt: 1000,
    features: {
      hardscaping: true,
      irrigation: true,
      waterFeature: false,
      lighting: true,
      pergola: true,
      specimenTrees: false,
    },
    finishTier: 'essential',
  });

  const luxury = calculateEstimate({
    propertyType: 'terrace',
    areaSqFt: 1000,
    features: {
      hardscaping: true,
      irrigation: true,
      waterFeature: false,
      lighting: true,
      pergola: true,
      specimenTrees: false,
    },
    finishTier: 'luxury_bespoke',
  });

  assert.ok(luxury.totalEstimatedMin > essential.totalEstimatedMin, 'Luxury tier must be priced higher');
});

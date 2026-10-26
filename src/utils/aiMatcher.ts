import { AIQueryResult, Worker } from '../types';

export const parseNaturalLanguageServiceQuery = (
  query: string,
  workers: Worker[] = []
): AIQueryResult => {

  const lower = query.toLowerCase();

  let detectedCategory = 'electrician';
  let detectedProblem = 'General inspection & repair';
  let recommendedPriceRange: [number, number] = [199, 599];
  let urgency: 'immediate' | 'scheduled' | 'flexible' = 'flexible';

  // Category detection
  if (lower.includes('ac') || lower.includes('cooling') || lower.includes('refrigerant') || lower.includes('filter') || lower.includes('jet wash')) {
    detectedCategory = 'ac-repair';
    detectedProblem = 'AC Cooling & High-Pressure Jet Service';
    recommendedPriceRange = [499, 1799];
  } else if (lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('drain') || lower.includes('tap') || lower.includes('plumb') || lower.includes('pump') || lower.includes('flush')) {
    detectedCategory = 'plumber';
    detectedProblem = 'Pipe Leakage & Drainage Clear';
    recommendedPriceRange = [249, 899];
  } else if (lower.includes('mcb') || lower.includes('power') || lower.includes('electric') || lower.includes('switch') || lower.includes('fan') || lower.includes('shock') || lower.includes('wire') || lower.includes('inverter') || lower.includes('light')) {
    detectedCategory = 'electrician';
    detectedProblem = 'Electrical Circuit & Breaker Diagnosis';
    recommendedPriceRange = [199, 799];
  } else if (lower.includes('machine') || lower.includes('fridge') || lower.includes('refrigerator') || lower.includes('washing') || lower.includes('microwave') || lower.includes('ro') || lower.includes('chimney') || lower.includes('appliance')) {
    detectedCategory = 'appliance-repair';
    detectedProblem = 'Appliance Motor & Electronic Diagnosis';
    recommendedPriceRange = [299, 850];
  } else if (lower.includes('door') || lower.includes('lock') || lower.includes('wood') || lower.includes('cabinet') || lower.includes('hinge') || lower.includes('wardrobe') || lower.includes('carpenter') || lower.includes('bed')) {
    detectedCategory = 'carpenter';
    detectedProblem = 'Carpentry & Architectural Fitting';
    recommendedPriceRange = [299, 699];
  } else if (lower.includes('paint') || lower.includes('damp') || lower.includes('seepage') || lower.includes('wall') || lower.includes('putty') || lower.includes('waterproof')) {
    detectedCategory = 'painter';
    detectedProblem = 'Dampness Treatment & Premium Paint Application';
    recommendedPriceRange = [799, 1899];
  }

  // Urgency detection
  if (lower.includes('now') || lower.includes('urgent') || lower.includes('emergency') || lower.includes('asap') || lower.includes('immediately') || lower.includes('quick')) {
    urgency = 'immediate';
  } else if (lower.includes('tomorrow') || lower.includes('today') || lower.includes('evening') || lower.includes('morning') || lower.includes('afternoon') || lower.includes('sunday') || lower.includes('saturday')) {
    urgency = 'scheduled';
  }

  // Location extraction
  let extractedLocation = undefined;
  if (lower.includes('indiranagar')) extractedLocation = 'Indiranagar';
  else if (lower.includes('koramangala')) extractedLocation = 'Koramangala';
  else if (lower.includes('hsr')) extractedLocation = 'HSR Layout';
  else if (lower.includes('whitefield')) extractedLocation = 'Whitefield';
  else if (lower.includes('marathahalli')) extractedLocation = 'Marathahalli';
  else if (lower.includes('malleshwaram')) extractedLocation = 'Malleshwaram';
  else if (lower.includes('sarjapur')) extractedLocation = 'Sarjapur';

  // Find matching workers
  const matchingWorkers = workers
    .filter(w => w.categorySlug === detectedCategory)
    .sort((a, b) => b.trustMetrics.overallScore - a.trustMetrics.overallScore);

  const matchingWorkerIds = matchingWorkers.map(w => w.id);

  const topWorker = matchingWorkers[0];
  const explanation = topWorker 
    ? `Identified "${detectedProblem}" with ${urgency === 'immediate' ? 'emergency dispatch' : 'standard scheduling'}. Matched with ${topWorker.name} (${topWorker.trustMetrics.overallScore}/100 Trust Score, ${topWorker.distanceKm} km away, ${topWorker.trustMetrics.onTimeArrivalRate}% on-time record).`
    : `Identified "${detectedProblem}". Found ${matchingWorkers.length} verified pros matching your criteria.`;

  return {
    detectedCategory,
    detectedProblem,
    recommendedPriceRange,
    urgency,
    extractedLocation,
    matchingWorkerIds,
    explanation
  };
};

export const parseNaturalLanguageQuery = parseNaturalLanguageServiceQuery;


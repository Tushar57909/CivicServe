import { config } from '../config/index.js';

export const parseServiceIntentWithOpenRouter = async (promptText) => {
  // If no API key is provided, use fallback deterministic NLP extraction
  if (!config.openRouterApiKey) {
    return deterministicIntentFallback(promptText);
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.openRouterApiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://civicserve.in',
        'X-Title': 'CivicServe Reliable Service Workers'
      },
      body: JSON.stringify({
        model: config.openRouterModel,
        messages: [
          {
            role: 'system',
            content: `You are the CivicServe AI Intent Extractor for a home service marketplace in India.
Given a user query (e.g. "My AC is leaking water in Koramangala"), extract structured JSON:
{
  "detectedCategory": "electrician" | "ac-repair" | "plumber" | "carpenter" | "appliance-repair" | "painter",
  "detectedProblem": "Short summary of the issue",
  "recommendedPriceRange": [minPriceNumber, maxPriceNumber],
  "urgency": "immediate" | "scheduled" | "flexible",
  "extractedLocation": "City/Neighborhood name or null",
  "explanation": "Short friendly civic reasoning why this trade and price was selected"
}
Return ONLY valid JSON.`
          },
          {
            role: 'user',
            content: promptText
          }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      console.warn('OpenRouter API returned non-200, falling back to deterministic parser.');
      return deterministicIntentFallback(promptText);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const jsonMatch = content?.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return deterministicIntentFallback(promptText);
  } catch (error) {
    console.warn('OpenRouter connection failed, using deterministic fallback:', error.message);
    return deterministicIntentFallback(promptText);
  }
};

export const auditReviewSentiment = async (comment, rating) => {
  if (!config.openRouterApiKey) {
    return {
      sentiment: rating >= 4 ? 'Positive' : rating === 3 ? 'Neutral' : 'Negative',
      suspicious: false
    };
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.openRouterApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: config.openRouterModel,
        messages: [
          {
            role: 'system',
            content: 'Analyze this customer review for sentiment and detect if it looks like spam/suspicious anomaly. Return JSON: {"sentiment": "Positive"|"Neutral"|"Negative", "suspicious": boolean}'
          },
          {
            role: 'user',
            content: `Rating: ${rating}/5. Comment: "${comment}"`
          }
        ],
        temperature: 0.1
      })
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const jsonMatch = content?.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return { sentiment: rating >= 4 ? 'Positive' : 'Neutral', suspicious: false };
  } catch (e) {
    return { sentiment: rating >= 4 ? 'Positive' : 'Neutral', suspicious: false };
  }
};

function deterministicIntentFallback(query) {
  const lower = query.toLowerCase();

  let detectedCategory = 'electrician';
  let detectedProblem = 'General electrical diagnosis & repair';
  let recommendedPriceRange = [199, 599];
  let urgency = 'flexible';

  if (lower.includes('ac') || lower.includes('cooling') || lower.includes('gas') || lower.includes('filter') || lower.includes('jet wash')) {
    detectedCategory = 'ac-repair';
    detectedProblem = 'AC Cooling & High-Pressure Jet Service';
    recommendedPriceRange = [499, 1799];
  } else if (lower.includes('water') || lower.includes('pipe') || lower.includes('leak') || lower.includes('drain') || lower.includes('tap') || lower.includes('plumb') || lower.includes('pump') || lower.includes('flush')) {
    detectedCategory = 'plumber';
    detectedProblem = 'Pipe Leakage & Drainage Clear';
    recommendedPriceRange = [249, 899];
  } else if (lower.includes('mcb') || lower.includes('power') || lower.includes('electric') || lower.includes('switch') || lower.includes('fan') || lower.includes('shock') || lower.includes('wire') || lower.includes('inverter')) {
    detectedCategory = 'electrician';
    detectedProblem = 'Electrical Circuit & Breaker Diagnosis';
    recommendedPriceRange = [199, 799];
  } else if (lower.includes('machine') || lower.includes('fridge') || lower.includes('washing') || lower.includes('microwave') || lower.includes('ro') || lower.includes('chimney') || lower.includes('appliance')) {
    detectedCategory = 'appliance-repair';
    detectedProblem = 'Appliance Motor & Electronic Diagnosis';
    recommendedPriceRange = [299, 850];
  } else if (lower.includes('door') || lower.includes('lock') || lower.includes('wood') || lower.includes('cabinet') || lower.includes('hinge') || lower.includes('wardrobe') || lower.includes('carpenter')) {
    detectedCategory = 'carpenter';
    detectedProblem = 'Carpentry & Architectural Fitting';
    recommendedPriceRange = [299, 699];
  } else if (lower.includes('paint') || lower.includes('damp') || lower.includes('seepage') || lower.includes('wall') || lower.includes('waterproof')) {
    detectedCategory = 'painter';
    detectedProblem = 'Dampness Treatment & Premium Paint Application';
    recommendedPriceRange = [799, 1899];
  }

  if (lower.includes('now') || lower.includes('urgent') || lower.includes('emergency') || lower.includes('asap') || lower.includes('immediately')) {
    urgency = 'immediate';
  } else if (lower.includes('tomorrow') || lower.includes('today') || lower.includes('evening') || lower.includes('morning')) {
    urgency = 'scheduled';
  }

  let extractedLocation = null;
  if (lower.includes('indiranagar')) extractedLocation = 'Indiranagar';
  else if (lower.includes('koramangala')) extractedLocation = 'Koramangala';
  else if (lower.includes('hsr')) extractedLocation = 'HSR Layout';
  else if (lower.includes('whitefield')) extractedLocation = 'Whitefield';
  else if (lower.includes('malleshwaram')) extractedLocation = 'Malleshwaram';
  else if (lower.includes('sarjapur')) extractedLocation = 'Sarjapur';

  return {
    detectedCategory,
    detectedProblem,
    recommendedPriceRange,
    urgency,
    extractedLocation,
    explanation: `Extracted intent for "${detectedProblem}" with ${urgency} dispatch in ${extractedLocation || 'your area'}.`
  };
}

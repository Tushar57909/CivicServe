import { parseServiceIntentWithOpenRouter } from '../ai/openRouterClient.js';
import { prisma } from '../prisma.js';

export const parseIntentAndMatchWorkers = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ success: false, message: 'Query string is required.' });
    }

    // 1. Extract Intent via OpenRouter LLM (or deterministic fallback)
    const intent = await parseServiceIntentWithOpenRouter(query);

    // 2. Deterministic Database Search & Ranking
    const matchingWorkers = await prisma.worker.findMany({
      where: {
        categorySlug: intent.detectedCategory
      },
      include: {
        verification: true
      },
      orderBy: [
        { overallScore: 'desc' },
        { onTimeArrivalRate: 'desc' }
      ]
    });

    const topWorker = matchingWorkers[0];
    let customExplanation = intent.explanation;

    if (topWorker) {
      customExplanation = `Identified "${intent.detectedProblem}" (${intent.urgency} dispatch). Recommended top match: ${topWorker.profession.split(' ')[0]} with a ${topWorker.overallScore}/100 Trust Score and ${topWorker.onTimeArrivalRate}% on-time record within ${topWorker.distanceKm} km.`;
    }

    res.json({
      success: true,
      data: {
        ...intent,
        explanation: customExplanation,
        matchedCount: matchingWorkers.length,
        matchingWorkerIds: matchingWorkers.map(w => w.id),
        recommendedWorkers: matchingWorkers.slice(0, 3).map(w => ({
          id: w.id,
          profession: w.profession,
          categorySlug: w.categorySlug,
          avatarUrl: w.avatarUrl,
          overallScore: w.overallScore,
          distanceKm: w.distanceKm,
          startingPrice: w.startingPrice,
          onTimeArrivalRate: w.onTimeArrivalRate
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

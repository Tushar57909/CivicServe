import { prisma } from '../prisma.js';

export const getServices = async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { startingPrice: 'asc' }
    });

    const parsedServices = services.map(s => ({
      ...s,
      tags: typeof s.tags === 'string' ? JSON.parse(s.tags) : s.tags,
      rateCards: typeof s.rateCards === 'string' ? JSON.parse(s.rateCards) : s.rateCards
    }));

    res.json({
      success: true,
      data: parsedServices
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const service = await prisma.service.findUnique({
      where: { slug }
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service category not found.' });
    }

    res.json({
      success: true,
      data: {
        ...service,
        tags: typeof service.tags === 'string' ? JSON.parse(service.tags) : service.tags,
        rateCards: typeof service.rateCards === 'string' ? JSON.parse(service.rateCards) : service.rateCards
      }
    });
  } catch (error) {
    next(error);
  }
};

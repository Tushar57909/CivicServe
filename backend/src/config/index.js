import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'civicserve_super_secret_jwt_key_hackathon_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
  openRouterModel: process.env.OPENROUTER_MODEL || 'google/gemini-2.0-flash-exp:free',
  corsOrigin: process.env.CORS_ORIGIN || '*'
};

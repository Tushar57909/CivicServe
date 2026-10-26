import app from './app.js';
import { config } from './config/index.js';

const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CivicServe Backend running on port ${PORT} [${config.nodeEnv}]`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🤖 AI Engine: OpenRouter (${config.openRouterModel})`);
});

import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Allow all origins in production (Render), restrict in dev
app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    service: 'CloudGuard Analytics API',
    status: 'running',
    version: '1.0.0',
    endpoints: [
      'GET /api/dashboard',
      'GET /api/users',
      'GET /api/users/:id',
      'GET /api/alerts',
      'GET /api/analytics/network',
      'GET /api/analytics/behavior',
      'GET /api/reports',
    ],
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CloudGuard Analytics API', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`\n  ┌──────────────────────────────────────────────┐`);
  console.log(`  │  CloudGuard Analytics API Server              │`);
  console.log(`  │  Running on port ${PORT}                        │`);
  console.log(`  └──────────────────────────────────────────────┘\n`);
});

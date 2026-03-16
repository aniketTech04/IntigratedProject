import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = 5000;

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json());

// Mount API routes
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'CloudGuard Analytics API', uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`\n  ┌──────────────────────────────────────────────┐`);
  console.log(`  │  CloudGuard Analytics API Server              │`);
  console.log(`  │  Running on http://localhost:${PORT}             │`);
  console.log(`  │  Health:  http://localhost:${PORT}/health        │`);
  console.log(`  └──────────────────────────────────────────────┘\n`);
});

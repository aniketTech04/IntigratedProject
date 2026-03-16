import { Router } from 'express';
import {
  generateUsers,
  generateActivityLogs,
  generateNetworkTraffic,
  generateAlerts,
  generateDashboardData,
  generateBehaviorAnalytics,
  generateNetworkAnalytics,
  generateReports,
} from '../data/generator.js';
import { analyzeUserBehavior } from '../analytics/anomalyDetector.js';

const router = Router();

// ── Generate data once on server start ──────────────────────
const users = generateUsers(50);
const logs = generateActivityLogs(users, 500);
const traffic = generateNetworkTraffic(200);
const alerts = generateAlerts(users, logs, 40);
const reports = generateReports();

// ── Dashboard ───────────────────────────────────────────────
router.get('/dashboard', (req, res) => {
  const dashboard = generateDashboardData(users, logs, alerts, traffic);
  res.json(dashboard);
});

// ── Users ───────────────────────────────────────────────────
router.get('/users', (req, res) => {
  const { search, department, riskLevel, sort } = req.query;
  let filtered = [...users];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(u =>
      u.fullName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
    );
  }
  if (department) filtered = filtered.filter(u => u.department === department);
  if (riskLevel) filtered = filtered.filter(u => u.riskLevel === riskLevel);
  if (sort === 'risk_desc') filtered.sort((a, b) => b.riskScore - a.riskScore);
  if (sort === 'risk_asc') filtered.sort((a, b) => a.riskScore - b.riskScore);
  if (sort === 'name') filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));

  res.json({ users: filtered, total: filtered.length });
});

router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const userLogs = logs.filter(l => l.userId === user.id);
  const userAlerts = alerts.filter(a => a.userId === user.id);

  // Activity breakdown by type
  const activityBreakdown = {};
  userLogs.forEach(l => {
    activityBreakdown[l.type] = (activityBreakdown[l.type] || 0) + 1;
  });

  // Login times distribution
  const loginHours = userLogs
    .filter(l => l.type === 'login')
    .map(l => new Date(l.timestamp).getHours());
  const loginDistribution = Array.from({ length: 24 }, (_, h) => ({
    hour: h,
    count: loginHours.filter(lh => lh === h).length,
  }));

  // Daily activity over last 7 days
  const dailyActivity = [];
  for (let d = 6; d >= 0; d--) {
    const date = new Date(Date.now() - d * 86400000);
    const dayStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dailyActivity.push({
      date: dayStr,
      activities: Math.floor(Math.random() * 50) + 5,
    });
  }

  res.json({
    user,
    recentActivity: userLogs.slice(0, 20),
    alerts: userAlerts,
    activityBreakdown: Object.entries(activityBreakdown).map(([type, count]) => ({
      type: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count,
    })),
    loginDistribution,
    dailyActivity,
  });
});

// ── Alerts ──────────────────────────────────────────────────
router.get('/alerts', (req, res) => {
  const { severity, status, type } = req.query;
  let filtered = [...alerts];

  if (severity) filtered = filtered.filter(a => a.severity === severity);
  if (status) filtered = filtered.filter(a => a.status === status);
  if (type) filtered = filtered.filter(a => a.type === type);

  const summary = {
    total: filtered.length,
    critical: filtered.filter(a => a.severity === 'critical').length,
    high: filtered.filter(a => a.severity === 'high').length,
    medium: filtered.filter(a => a.severity === 'medium').length,
    low: filtered.filter(a => a.severity === 'low').length,
  };

  res.json({ alerts: filtered, summary });
});

// ── Network Analytics ───────────────────────────────────────
router.get('/analytics/network', (req, res) => {
  const networkAnalytics = generateNetworkAnalytics(traffic);
  res.json(networkAnalytics);
});

// ── Behavior Analytics ──────────────────────────────────────
router.get('/analytics/behavior', (req, res) => {
  const behavior = generateBehaviorAnalytics(users);
  const anomalyAnalysis = analyzeUserBehavior(users, logs);
  res.json({ ...behavior, anomalyAnalysis: anomalyAnalysis.slice(0, 20) });
});

// ── Reports ─────────────────────────────────────────────────
router.get('/reports', (req, res) => {
  res.json({ reports });
});

export default router;

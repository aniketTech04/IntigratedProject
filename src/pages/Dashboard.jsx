import { useState, useEffect } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from 'recharts';
import { Users, Activity, AlertTriangle, Wifi, ShieldCheck, Database, TrendingUp, Zap } from 'lucide-react';
import { API_BASE } from '../config';
import KpiCard from '../components/KpiCard';

const CHART_COLORS = ['#ef4444', '#f97316', '#eab308', '#22d3ee', '#6366f1', '#10b981'];

function formatTime(ts) {
  return new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px', padding: '10px 14px', fontSize: '12px',
    }}>
      <div style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_BASE + '/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="loading-state">
      <div className="loading-spinner" />
      <span>Loading dashboard data...</span>
    </div>
  );

  if (!data) return <div className="empty-state">Failed to load dashboard data. Is the server running?</div>;

  const { kpis, activityByHour, activityByDay, alertsBySeverity, departmentRisk, recentAlerts } = data;

  return (
    <div className="animate-in">
      {/* KPI Cards */}
      <div className="kpi-grid">
        <KpiCard icon={Users} label="Total Users" value={kpis.totalUsers}
          trend={5.2} color="#6366f1" bgColor="rgba(99,102,241,0.12)" />
        <KpiCard icon={Activity} label="Active Sessions" value={kpis.activeSessions}
          trend={12.5} color="#06b6d4" bgColor="rgba(6,182,212,0.12)" />
        <KpiCard icon={AlertTriangle} label="Alerts Today" value={kpis.alertsToday}
          trend={-8.3} trendLabel="vs yesterday" color="#ef4444" bgColor="rgba(239,68,68,0.12)" />
        <KpiCard icon={Wifi} label="Network Traffic" value={`${kpis.totalTrafficGB} GB`}
          trend={3.1} color="#10b981" bgColor="rgba(16,185,129,0.12)" />
        <KpiCard icon={ShieldCheck} label="Blocked Threats" value={kpis.blockedThreats}
          trend={15.7} color="#f97316" bgColor="rgba(249,115,22,0.12)" />
        <KpiCard icon={Database} label="Data Processed" value={`${kpis.dataProcessedTB} TB`}
          trend={7.1} color="#8b5cf6" bgColor="rgba(139,92,246,0.12)" />
        <KpiCard icon={TrendingUp} label="Avg Risk Score" value={kpis.avgRiskScore}
          trend={-2.4} color="#eab308" bgColor="rgba(234,179,8,0.12)" />
        <KpiCard icon={Zap} label="Critical Alerts" value={kpis.criticalAlerts}
          trend={-12} color="#ff2e63" bgColor="rgba(255,46,99,0.12)" />
      </div>

      {/* Charts Row */}
      <div className="chart-grid">
        <div className="glass-card">
          <div className="card-header">
            <h3>Activity Timeline (24h)</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityByHour}>
                  <defs>
                    <linearGradient id="gradActivity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradAnomalies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} interval={3} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="activities" stroke="#6366f1" strokeWidth={2}
                    fill="url(#gradActivity)" name="Activities" />
                  <Area type="monotone" dataKey="anomalies" stroke="#ef4444" strokeWidth={2}
                    fill="url(#gradAnomalies)" name="Anomalies" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="card-header">
            <h3>Alert Severity</h3>
          </div>
          <div className="card-body">
            <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={alertsBySeverity} cx="50%" cy="50%" innerRadius={60} outerRadius={100}
                    paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: '#64748b' }}>
                    {alertsBySeverity.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Activity + Department Risk */}
      <div className="chart-grid-equal">
        <div className="glass-card">
          <div className="card-header">
            <h3>Weekly Activity Trend</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityByDay}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                  <Bar dataKey="totalActivities" fill="#6366f1" radius={[4, 4, 0, 0]} name="Activities" />
                  <Bar dataKey="anomalies" fill="#ef4444" radius={[4, 4, 0, 0]} name="Anomalies" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="card-header">
            <h3>Department Risk Scores</h3>
          </div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentRisk} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
                  <YAxis dataKey="department" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="avgRisk" name="Avg Risk Score" radius={[0, 4, 4, 0]}>
                    {departmentRisk.map((entry, i) => (
                      <Cell key={i} fill={entry.avgRisk >= 50 ? '#ef4444' : entry.avgRisk >= 30 ? '#eab308' : '#10b981'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts Table */}
      <div className="glass-card">
        <div className="card-header">
          <h3>Recent Anomaly Alerts</h3>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Last 8 alerts</span>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>User</th>
                <th>Type</th>
                <th>Severity</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAlerts.map(alert => (
                <tr key={alert.id}>
                  <td style={{ color: 'var(--text-accent)', fontWeight: 600, fontSize: 12 }}>{alert.id}</td>
                  <td>
                    <div className="user-profile-card">
                      <div className="user-avatar-sm">{alert.userName.split(' ').map(n => n[0]).join('')}</div>
                      <div className="user-meta">
                        <div className="user-name">{alert.userName}</div>
                        <div className="user-dept">{alert.department}</div>
                      </div>
                    </div>
                  </td>
                  <td>{alert.typeLabel}</td>
                  <td><span className={`badge badge-${alert.severity}`}>{alert.severity}</span></td>
                  <td style={{ fontSize: 12 }}>{formatTime(alert.timestamp)}</td>
                  <td><span className={`badge ${alert.status === 'resolved' ? 'badge-success' : 'badge-neutral'}`}>{alert.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import { Wifi, ArrowUpDown, Globe } from 'lucide-react';
import KpiCard from '../components/KpiCard';

const PIE_COLORS = ['#6366f1', '#06b6d4', '#10b981', '#eab308', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(17, 24, 39, 0.95)', border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '8px', padding: '10px 14px', fontSize: '12px',
    }}>
      <div style={{ color: '#94a3b8', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</div>
      ))}
    </div>
  );
};

function formatBytes(bytes) {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(2)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

export default function NetworkAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics/network')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-state"><div className="loading-spinner" /><span>Loading network analytics...</span></div>;
  if (!data) return <div className="empty-state">Failed to load network data.</div>;

  const { byProtocol, trafficOverTime, topSources } = data;

  const totalRequests = byProtocol.reduce((s, p) => s + p.value, 0);
  const suspiciousSources = topSources.filter(s => s.status === 'suspicious').length;

  return (
    <div className="animate-in">
      <div className="page-header">
        <h2>Network Traffic Analytics</h2>
        <p>Enterprise network traffic monitoring and analysis</p>
      </div>

      {/* KPIs */}
      <div className="kpi-grid">
        <KpiCard icon={Wifi} label="Total Connections" value={totalRequests.toLocaleString()}
          trend={4.2} color="#6366f1" bgColor="rgba(99,102,241,0.12)" />
        <KpiCard icon={ArrowUpDown} label="Protocols Detected" value={byProtocol.length}
          color="#06b6d4" bgColor="rgba(6,182,212,0.12)" />
        <KpiCard icon={Globe} label="Suspicious Sources" value={suspiciousSources}
          trend={-3.1} color="#ef4444" bgColor="rgba(239,68,68,0.12)" />
      </div>

      {/* Traffic Over Time */}
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <div className="card-header"><h3>Traffic Volume (24h)</h3></div>
        <div className="card-body">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trafficOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} interval={3} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                <Bar dataKey="inbound" fill="#6366f1" name="Inbound" radius={[2, 2, 0, 0]} stackId="a" />
                <Bar dataKey="outbound" fill="#06b6d4" name="Outbound" radius={[2, 2, 0, 0]} stackId="a" />
                <Bar dataKey="blocked" fill="#ef4444" name="Blocked" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="chart-grid-equal">
        {/* Protocol Distribution */}
        <div className="glass-card">
          <div className="card-header"><h3>Protocol Distribution</h3></div>
          <div className="card-body">
            <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byProtocol} cx="50%" cy="50%" innerRadius={55} outerRadius={95}
                    paddingAngle={3} dataKey="value" label={({ name, value }) => `${name}: ${value}`}
                    labelLine={{ stroke: '#64748b' }}>
                    {byProtocol.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Source IPs */}
        <div className="glass-card">
          <div className="card-header"><h3>Top Source IPs by Volume</h3></div>
          <div className="card-body" style={{ padding: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>IP Address</th>
                  <th>Requests</th>
                  <th>Data Volume</th>
                  <th>Protocol</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {topSources.map((src, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{src.ip}</td>
                    <td style={{ fontWeight: 600 }}>{src.requests.toLocaleString()}</td>
                    <td>{formatBytes(src.bytesTransferred)}</td>
                    <td><span className="badge badge-neutral">{src.protocol}</span></td>
                    <td><span className={`badge ${src.status === 'suspicious' ? 'badge-critical' : 'badge-success'}`}>{src.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

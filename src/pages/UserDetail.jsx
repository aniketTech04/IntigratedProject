import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area,
} from 'recharts';
import { ArrowLeft, Mail, MapPin, Briefcase, Calendar, Globe } from 'lucide-react';

const COLORS = ['#6366f1', '#06b6d4', '#10b981', '#eab308', '#f97316', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e'];

function riskColor(score) {
  if (score >= 75) return '#ef4444';
  if (score >= 50) return '#f97316';
  if (score >= 25) return '#eab308';
  return '#10b981';
}

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

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
        <div key={i} style={{ color: p.color || '#f1f5f9', fontWeight: 600 }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  );
};

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loading-state"><div className="loading-spinner" /><span>Loading user profile...</span></div>;
  if (!data?.user) return <div className="empty-state">User not found.</div>;

  const { user, recentActivity, alerts, activityBreakdown, loginDistribution, dailyActivity } = data;

  return (
    <div className="animate-in">
      {/* Back button */}
      <button className="btn btn-ghost" onClick={() => navigate('/users')} style={{ marginBottom: 16 }}>
        <ArrowLeft size={16} /> Back to Users
      </button>

      {/* User Profile Header */}
      <div className="glass-card" style={{ marginBottom: 20 }}>
        <div className="card-body" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 800, color: 'white', flexShrink: 0,
          }}>
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{user.fullName}</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 20px', fontSize: 13, color: 'var(--text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} /> {user.email}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Briefcase size={14} /> {user.department} — {user.role}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} /> {user.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={14} /> {user.ipAddress}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> Joined {formatDate(user.joinDate)}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', padding: '10px 24px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-primary)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Risk Score</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: riskColor(user.riskScore) }}>{user.riskScore}</div>
            <span className={`badge badge-${user.riskLevel}`}>{user.riskLevel} risk</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="chart-grid-equal">
        <div className="glass-card">
          <div className="card-header"><h3>Activity Breakdown</h3></div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={activityBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={90}
                    paddingAngle={3} dataKey="count" label={({ type, count }) => `${type}: ${count}`}
                    labelLine={{ stroke: '#64748b' }}>
                    {activityBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="glass-card">
          <div className="card-header"><h3>Daily Activity (7 Days)</h3></div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyActivity}>
                  <defs>
                    <linearGradient id="gradDA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="activities" stroke="#06b6d4" strokeWidth={2} fill="url(#gradDA)" name="Activities" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="chart-grid-equal">
        <div className="glass-card">
          <div className="card-header"><h3>Login Time Distribution (24h)</h3></div>
          <div className="card-body">
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={loginDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="hour" tick={{ fill: '#64748b', fontSize: 10 }}
                    tickFormatter={h => `${h}:00`} />
                  <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Logins" radius={[3, 3, 0, 0]}>
                    {loginDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.hour < 6 || entry.hour > 22 ? '#ef4444' : '#6366f1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Alerts for this user */}
        <div className="glass-card">
          <div className="card-header"><h3>User Alerts ({alerts.length})</h3></div>
          <div className="card-body" style={{ padding: 0, maxHeight: 300, overflowY: 'auto' }}>
            {alerts.length === 0 ? (
              <div className="empty-state">No alerts for this user</div>
            ) : (
              alerts.map(alert => (
                <div key={alert.id} className="alert-item">
                  <div className="alert-top">
                    <span className="alert-type">{alert.typeLabel}</span>
                    <span className={`badge badge-${alert.severity}`}>{alert.severity}</span>
                  </div>
                  <div className="alert-description">{alert.description}</div>
                  <div className="alert-meta">
                    <span className="alert-time">{formatTime(alert.timestamp)}</span>
                    <span className={`badge ${alert.status === 'resolved' ? 'badge-success' : 'badge-neutral'}`}>{alert.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="glass-card" style={{ marginTop: 16 }}>
        <div className="card-header"><h3>Recent Activity</h3></div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Resource</th>
                <th>Source IP</th>
                <th>Status</th>
                <th>Bytes</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map(log => (
                <tr key={log.id}>
                  <td style={{ fontWeight: 500 }}>{log.type.replace(/_/g, ' ')}</td>
                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{log.resource}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>{log.sourceIP}</td>
                  <td><span className={`badge ${log.status === 'success' ? 'badge-success' : 'badge-critical'}`}>{log.status}</span></td>
                  <td>{(log.bytesTransferred / 1024).toFixed(1)} KB</td>
                  <td style={{ fontSize: 12 }}>{formatTime(log.timestamp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { API_BASE } from '../config';

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function riskColor(score) {
  if (score >= 75) return '#ef4444';
  if (score >= 50) return '#f97316';
  if (score >= 25) return '#eab308';
  return '#10b981';
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [sort, setSort] = useState('risk_desc');
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (department) params.set('department', department);
    if (riskLevel) params.set('riskLevel', riskLevel);
    if (sort) params.set('sort', sort);
    fetch(`${API_BASE}/api/users?${params}`)
      .then(r => r.json())
      .then(d => { setUsers(d.users); setLoading(false); })
      .catch(() => setLoading(false));
  }, [search, department, riskLevel, sort]);

  const departments = ['Engineering', 'Finance', 'HR', 'Marketing', 'Sales', 'IT Security', 'Operations', 'Legal', 'Executive', 'Research'];

  if (loading) return <div className="loading-state"><div className="loading-spinner" /><span>Loading users...</span></div>;

  return (
    <div className="animate-in">
      <div className="page-header">
        <h2>User Behavior Analysis</h2>
        <p>Monitor and assess enterprise user behavior patterns and risk scores</p>
      </div>

      <div className="filter-bar">
        <div className="search-wrapper">
          <Search size={14} className="search-icon" />
          <input
            className="search-input"
            placeholder="Search users by name, email, or ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={department} onChange={e => setDepartment(e.target.value)}>
          <option value="">All Departments</option>
          {departments.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select className="filter-select" value={riskLevel} onChange={e => setRiskLevel(e.target.value)}>
          <option value="">All Risk Levels</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select className="filter-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="risk_desc">Risk: High → Low</option>
          <option value="risk_asc">Risk: Low → High</option>
          <option value="name">Name: A → Z</option>
        </select>
      </div>

      <div className="glass-card">
        <div className="card-header">
          <h3>Enterprise Users ({users.length})</h3>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table" id="user-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Department</th>
                <th>Role</th>
                <th>Location</th>
                <th>Risk Score</th>
                <th>Status</th>
                <th>Last Active</th>
                <th>Activities</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} onClick={() => navigate(`/users/${user.id}`)} style={{ cursor: 'pointer' }}>
                  <td>
                    <div className="user-profile-card">
                      <div className="user-avatar-sm">
                        {user.firstName[0]}{user.lastName[0]}
                      </div>
                      <div className="user-meta">
                        <div className="user-name">{user.fullName}</div>
                        <div className="user-dept">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.department}</td>
                  <td>{user.role}</td>
                  <td>{user.location}</td>
                  <td>
                    <div className="risk-score">
                      <span style={{ color: riskColor(user.riskScore), fontWeight: 700, fontSize: 14, minWidth: 28 }}>
                        {user.riskScore}
                      </span>
                      <div className="risk-bar">
                        <div className="risk-bar-fill" style={{
                          width: `${user.riskScore}%`,
                          background: riskColor(user.riskScore),
                        }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="status-dot" style={{ marginRight: 6,
                      background: user.status === 'active' ? 'var(--color-success)' : 'var(--text-muted)',
                      boxShadow: user.status === 'active' ? '0 0 6px var(--color-success)' : 'none',
                    }} />
                    {user.status}
                  </td>
                  <td style={{ fontSize: 12 }}>{formatDate(user.lastActive)}</td>
                  <td style={{ fontWeight: 600 }}>{user.totalActivities.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

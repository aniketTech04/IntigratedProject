import { useState, useEffect } from 'react';
import { FileText, Download, Clock, CheckCircle, Loader, Calendar } from 'lucide-react';

function formatDate(ts) {
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reports')
      .then(r => r.json())
      .then(d => { setReports(d.reports); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading-state"><div className="loading-spinner" /><span>Loading reports...</span></div>;

  const statusIcon = (status) => {
    if (status === 'completed') return <CheckCircle size={14} style={{ color: 'var(--color-success)' }} />;
    if (status === 'generating') return <Loader size={14} style={{ color: 'var(--color-medium)', animation: 'spin 1s linear infinite' }} />;
    return <Clock size={14} style={{ color: 'var(--text-muted)' }} />;
  };

  return (
    <div className="animate-in">
      <div className="page-header">
        <h2>Security Reports</h2>
        <p>Automated security, compliance, and behavioral analysis reports</p>
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <div className="kpi-card" style={{ '--kpi-color': '#6366f1', '--kpi-bg': 'rgba(99,102,241,0.12)' }}>
          <div className="kpi-icon"><FileText size={20} /></div>
          <div className="kpi-info">
            <div className="kpi-label">Total Reports</div>
            <div className="kpi-value">{reports.length}</div>
          </div>
        </div>
        <div className="kpi-card" style={{ '--kpi-color': '#10b981', '--kpi-bg': 'rgba(16,185,129,0.12)' }}>
          <div className="kpi-icon"><CheckCircle size={20} /></div>
          <div className="kpi-info">
            <div className="kpi-label">Completed</div>
            <div className="kpi-value">{reports.filter(r => r.status === 'completed').length}</div>
          </div>
        </div>
        <div className="kpi-card" style={{ '--kpi-color': '#eab308', '--kpi-bg': 'rgba(234,179,8,0.12)' }}>
          <div className="kpi-icon"><Calendar size={20} /></div>
          <div className="kpi-info">
            <div className="kpi-label">Scheduled</div>
            <div className="kpi-value">{reports.filter(r => r.status === 'scheduled').length}</div>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
        {reports.map(report => (
          <div key={report.id} className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent-primary)',
                  }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 2 }}>{report.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{report.id}</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: 16, fontSize: 12 }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Frequency: </span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{report.frequency}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Format: </span>
                  <span className="badge badge-neutral" style={{ fontSize: 10, padding: '2px 8px' }}>{report.format}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Pages: </span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{report.pages}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Size: </span>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{report.size}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--border-primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                  {statusIcon(report.status)}
                  <span style={{ color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{report.status}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-muted)' }}>
                  <Clock size={12} />
                  {formatDate(report.lastGenerated)}
                </div>
              </div>
            </div>
            <button className="btn btn-ghost" style={{
              width: '100%', borderRadius: 0, borderTop: '1px solid var(--border-primary)',
              justifyContent: 'center', padding: '10px',
            }}>
              <Download size={14} /> Download Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

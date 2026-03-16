import { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    anomalyThreshold: 70,
    zScoreThreshold: 2.0,
    offHoursStart: 22,
    offHoursEnd: 6,
    maxFailedLogins: 5,
    dataRetentionDays: 90,
    emailAlerts: true,
    slackAlerts: false,
    criticalOnly: false,
    autoBlock: false,
    realTimeMonitoring: true,
    geoTracking: true,
    alertEmail: 'security@enterprise.com',
    orgName: 'Enterprise Corp',
  });

  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="animate-in">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Platform Settings</h2>
          <p>Configure anomaly detection parameters, notifications, and preferences</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave}>
          <Save size={16} /> {saved ? 'Saved ✓' : 'Save Changes'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, maxWidth: 1000 }}>
        {/* Anomaly Detection Settings */}
        <div className="glass-card">
          <div className="card-header"><h3>Anomaly Detection Engine</h3></div>
          <div className="card-body">
            <div className="form-group">
              <label>Risk Score Threshold</label>
              <input type="number" value={settings.anomalyThreshold}
                onChange={e => update('anomalyThreshold', Number(e.target.value))} min={0} max={100} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                Users with risk scores above this threshold trigger alerts (0-100)
              </span>
            </div>
            <div className="form-group">
              <label>Z-Score Threshold</label>
              <input type="number" value={settings.zScoreThreshold}
                onChange={e => update('zScoreThreshold', Number(e.target.value))} step={0.1} min={0.5} max={5} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>
                Standard deviations above mean for statistical anomaly detection
              </span>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Off-Hours Start</label>
                <input type="number" value={settings.offHoursStart}
                  onChange={e => update('offHoursStart', Number(e.target.value))} min={0} max={23} />
              </div>
              <div className="form-group">
                <label>Off-Hours End</label>
                <input type="number" value={settings.offHoursEnd}
                  onChange={e => update('offHoursEnd', Number(e.target.value))} min={0} max={23} />
              </div>
            </div>
            <div className="form-group">
              <label>Max Failed Login Attempts</label>
              <input type="number" value={settings.maxFailedLogins}
                onChange={e => update('maxFailedLogins', Number(e.target.value))} min={1} max={50} />
            </div>
            <div className="form-group">
              <label>Data Retention (days)</label>
              <input type="number" value={settings.dataRetentionDays}
                onChange={e => update('dataRetentionDays', Number(e.target.value))} min={7} max={365} />
            </div>
          </div>
        </div>

        {/* Notification & Feature Toggles */}
        <div>
          <div className="glass-card" style={{ marginBottom: 20 }}>
            <div className="card-header"><h3>Notification Preferences</h3></div>
            <div className="card-body">
              <div className="toggle-switch">
                <div className="toggle-label">
                  <strong>Email Alerts</strong>
                  Send alert notifications via email
                </div>
                <div className={`toggle-track ${settings.emailAlerts ? 'active' : ''}`}
                  onClick={() => update('emailAlerts', !settings.emailAlerts)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="toggle-switch">
                <div className="toggle-label">
                  <strong>Slack Integration</strong>
                  Post alerts to Slack channel
                </div>
                <div className={`toggle-track ${settings.slackAlerts ? 'active' : ''}`}
                  onClick={() => update('slackAlerts', !settings.slackAlerts)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="toggle-switch">
                <div className="toggle-label">
                  <strong>Critical Alerts Only</strong>
                  Only send notifications for critical severity
                </div>
                <div className={`toggle-track ${settings.criticalOnly ? 'active' : ''}`}
                  onClick={() => update('criticalOnly', !settings.criticalOnly)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 16 }}>
                <label>Alert Email Address</label>
                <input type="email" value={settings.alertEmail}
                  onChange={e => update('alertEmail', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="glass-card">
            <div className="card-header"><h3>Platform Features</h3></div>
            <div className="card-body">
              <div className="toggle-switch">
                <div className="toggle-label">
                  <strong>Real-Time Monitoring</strong>
                  Enable live activity stream processing
                </div>
                <div className={`toggle-track ${settings.realTimeMonitoring ? 'active' : ''}`}
                  onClick={() => update('realTimeMonitoring', !settings.realTimeMonitoring)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="toggle-switch">
                <div className="toggle-label">
                  <strong>Geo-Location Tracking</strong>
                  Track login locations for impossible travel detection
                </div>
                <div className={`toggle-track ${settings.geoTracking ? 'active' : ''}`}
                  onClick={() => update('geoTracking', !settings.geoTracking)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="toggle-switch">
                <div className="toggle-label">
                  <strong>Auto-Block Suspicious Users</strong>
                  Automatically disable accounts with critical risk scores
                </div>
                <div className={`toggle-track ${settings.autoBlock ? 'active' : ''}`}
                  onClick={() => update('autoBlock', !settings.autoBlock)}>
                  <div className="toggle-thumb" />
                </div>
              </div>
              <div className="form-group" style={{ marginTop: 16 }}>
                <label>Organization Name</label>
                <input type="text" value={settings.orgName}
                  onChange={e => update('orgName', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

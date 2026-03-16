import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Moon, Sun, LogOut, User, Settings, Shield, ChevronDown, X, AlertTriangle, Clock } from 'lucide-react';

const pageInfo = {
  '/': { title: 'Dashboard', subtitle: 'Real-time security overview' },
  '/users': { title: 'User Analysis', subtitle: 'User behavior monitoring & risk assessment' },
  '/alerts': { title: 'Anomaly Alerts', subtitle: 'Detected threats and behavioral anomalies' },
  '/network': { title: 'Network Analytics', subtitle: 'Enterprise network traffic analysis' },
  '/reports': { title: 'Reports', subtitle: 'Generated security and compliance reports' },
  '/settings': { title: 'Settings', subtitle: 'Platform configuration and preferences' },
};

// Sample notifications data
const sampleNotifications = [
  { id: 1, type: 'critical', title: 'Brute Force Detected', message: 'User Maria Novak — 87 failed login attempts in 7 minutes', time: '2 min ago', read: false },
  { id: 2, type: 'high', title: 'Data Exfiltration Risk', message: 'Large compressed file transfer to external IP 192.168.45.12', time: '15 min ago', read: false },
  { id: 3, type: 'medium', title: 'Off-Hours Access', message: 'Raj Patel accessed financial reports at 2:30 AM', time: '1 hour ago', read: false },
  { id: 4, type: 'low', title: 'New User Registered', message: 'User Sofia Martinez joined Engineering department', time: '3 hours ago', read: true },
  { id: 5, type: 'medium', title: 'Unusual Download Volume', message: 'Chen Kim downloaded 120 files (2.4 GB) in the last hour', time: '4 hours ago', read: true },
];

export default function Topbar({ collapsed, theme, onThemeToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const info = pageInfo[basePath] || pageInfo['/'];

  const [showNotifications, setShowNotifications] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);

  const notifRef = useRef(null);
  const adminRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (adminRef.current && !adminRef.current.contains(e.target)) {
        setShowAdminPanel(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const removeNotification = (e, id) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const severityColor = (type) => {
    switch (type) {
      case 'critical': return 'var(--color-critical)';
      case 'high': return 'var(--color-high)';
      case 'medium': return 'var(--color-medium)';
      case 'low': return 'var(--color-low)';
      default: return 'var(--accent-primary)';
    }
  };

  return (
    <header className={`topbar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="topbar-left">
        <div>
          <div className="page-title">{info.title}</div>
          <div className="page-subtitle">{info.subtitle}</div>
        </div>
      </div>

      <div className="topbar-search">
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input type="text" placeholder="Search users, alerts, events..." />
      </div>

      <div className="topbar-right">
        {/* ── Theme Toggle ── */}
        <button
          className="topbar-icon-btn"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          onClick={onThemeToggle}
          style={theme === 'light' ? { background: 'rgba(99,102,241,0.12)', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' } : {}}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* ── Notifications ── */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            className="topbar-icon-btn"
            title="Notifications"
            onClick={() => { setShowNotifications(p => !p); setShowAdminPanel(false); }}
          >
            <Bell size={16} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="dropdown-panel notifications-panel">
              <div className="dropdown-header">
                <h4>Notifications</h4>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  {unreadCount > 0 && (
                    <button className="dropdown-action-btn" onClick={markAllRead}>Mark all read</button>
                  )}
                </div>
              </div>
              <div className="dropdown-body">
                {notifications.length === 0 ? (
                  <div className="dropdown-empty">No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className={`notification-item ${!n.read ? 'unread' : ''}`}
                      onClick={() => { markRead(n.id); navigate('/alerts'); setShowNotifications(false); }}
                    >
                      <div className="notif-indicator" style={{ background: severityColor(n.type) }} />
                      <div className="notif-content">
                        <div className="notif-title">
                          <span>{n.title}</span>
                          <button className="notif-close" onClick={(e) => removeNotification(e, n.id)} title="Dismiss">
                            <X size={12} />
                          </button>
                        </div>
                        <div className="notif-message">{n.message}</div>
                        <div className="notif-time">
                          <Clock size={10} /> {n.time}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="dropdown-footer">
                <button className="dropdown-footer-btn" onClick={() => { navigate('/alerts'); setShowNotifications(false); }}>
                  View All Alerts →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Admin Panel ── */}
        <div ref={adminRef} style={{ position: 'relative' }}>
          <div
            className={`topbar-user ${showAdminPanel ? 'active' : ''}`}
            onClick={() => { setShowAdminPanel(p => !p); setShowNotifications(false); }}
          >
            <div className="user-avatar">AD</div>
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-role">Security Analyst</span>
            </div>
            <ChevronDown size={14} style={{
              color: 'var(--text-muted)',
              transition: 'transform 200ms ease',
              transform: showAdminPanel ? 'rotate(180deg)' : 'rotate(0deg)',
            }} />
          </div>

          {showAdminPanel && (
            <div className="dropdown-panel admin-panel">
              <div className="admin-profile-section">
                <div className="admin-avatar-lg">AD</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>Admin User</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>admin@enterprise.com</div>
                  <span className="badge badge-success" style={{ marginTop: 4, fontSize: 10 }}>
                    <span className="status-dot active" style={{ width: 6, height: 6, marginRight: 4 }} />
                    Online
                  </span>
                </div>
              </div>

              <div className="admin-menu-divider" />

              <div className="admin-menu">
                <button className="admin-menu-item" onClick={() => { navigate('/users'); setShowAdminPanel(false); }}>
                  <User size={16} /> <span>My Profile</span>
                </button>
                <button className="admin-menu-item" onClick={() => { navigate('/settings'); setShowAdminPanel(false); }}>
                  <Settings size={16} /> <span>Settings</span>
                </button>
                <button className="admin-menu-item" onClick={() => { navigate('/alerts'); setShowAdminPanel(false); }}>
                  <Shield size={16} /> <span>Security Center</span>
                  {unreadCount > 0 && <span className="admin-menu-badge">{unreadCount}</span>}
                </button>
              </div>

              <div className="admin-menu-divider" />

              <div className="admin-menu">
                <button className="admin-menu-item" onClick={onThemeToggle}>
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>

              <div className="admin-menu-divider" />

              <div className="admin-menu">
                <button className="admin-menu-item logout" onClick={() => alert('Logged out successfully!')}>
                  <LogOut size={16} /> <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

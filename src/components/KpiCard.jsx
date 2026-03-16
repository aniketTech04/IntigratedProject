export default function KpiCard({ icon: Icon, label, value, trend, trendLabel, color, bgColor }) {
  return (
    <div className="kpi-card" style={{ '--kpi-color': color, '--kpi-bg': bgColor }}>
      <div className="kpi-icon">
        <Icon size={22} />
      </div>
      <div className="kpi-info">
        <div className="kpi-label">{label}</div>
        <div className="kpi-value">{value}</div>
        {trend !== undefined && (
          <div className={`kpi-trend ${trend >= 0 ? 'up' : 'down'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% {trendLabel || 'vs last week'}
          </div>
        )}
      </div>
    </div>
  );
}

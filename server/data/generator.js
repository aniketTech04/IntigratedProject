// ============================================================
// Synthetic Enterprise Data Generator
// Generates realistic user activity, network traffic, and
// security events for the analytics platform demo.
// ============================================================

const DEPARTMENTS = ['Engineering', 'Finance', 'HR', 'Marketing', 'Sales', 'IT Security', 'Operations', 'Legal', 'Executive', 'Research'];
const ROLES = ['Analyst', 'Manager', 'Director', 'Engineer', 'Specialist', 'Coordinator', 'VP', 'Intern'];
const LOCATIONS = ['New York', 'San Francisco', 'London', 'Mumbai', 'Tokyo', 'Berlin', 'Sydney', 'Toronto', 'Singapore', 'Dubai'];
const FIRST_NAMES = ['James', 'Maria', 'Raj', 'Elena', 'Chen', 'Aisha', 'Marcus', 'Yuki', 'Sofia', 'Lars', 'Priya', 'David', 'Fatima', 'Alex', 'Nadia', 'Kofi', 'Isabella', 'Sam', 'Mei', 'Olga', 'Hassan', 'Grace', 'Viktor', 'Lucia', 'Amir', 'Nina', 'Tomas', 'Diana', 'Wei', 'Sara', 'Andre', 'Hana', 'Leo', 'Zara', 'Ravi', 'Emma', 'Omar', 'Kira', 'Dante', 'Ava', 'Noah', 'Liam', 'Mia', 'Ethan', 'Aria', 'Felix', 'Luna', 'Oscar', 'Ivy', 'Hugo'];
const LAST_NAMES = ['Smith', 'Patel', 'Novak', 'Kim', 'Müller', 'Santos', 'O\'Brien', 'Tanaka', 'Zhang', 'Fischer', 'Gupta', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Lewis', 'Lee', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Nelson', 'Carter', 'Mitchell', 'Perez', 'Roberts', 'Turner', 'Phillips', 'Campbell', 'Parker', 'Evans', 'Edwards', 'Collins', 'Stewart', 'Sanchez', 'Morris', 'Rogers', 'Reed', 'Cook'];
const PROTOCOLS = ['HTTP', 'HTTPS', 'FTP', 'SSH', 'DNS', 'SMTP', 'IMAP', 'RDP', 'SMB', 'LDAP'];
const ACTIVITY_TYPES = ['login', 'logout', 'file_access', 'file_download', 'file_upload', 'email_send', 'email_receive', 'web_browse', 'vpn_connect', 'vpn_disconnect', 'admin_action', 'database_query', 'api_call', 'print_job'];
const ANOMALY_TYPES = ['off_hours_access', 'large_data_transfer', 'brute_force_attempt', 'geo_impossible_travel', 'privilege_escalation', 'unusual_download_volume', 'suspicious_email_pattern', 'unauthorized_access_attempt', 'data_exfiltration_risk', 'abnormal_query_pattern'];
const SEVERITY_LEVELS = ['critical', 'high', 'medium', 'low'];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomIP() {
  return `${randomInt(10, 192)}.${randomInt(0, 255)}.${randomInt(0, 255)}.${randomInt(1, 254)}`;
}

function generateId() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

function generateTimestamp(daysBack = 30) {
  const now = new Date();
  const past = new Date(now.getTime() - randomInt(0, daysBack * 24 * 60 * 60 * 1000));
  return past.toISOString();
}

function generateHourlyTimestamp(hoursBack = 24) {
  const now = new Date();
  const past = new Date(now.getTime() - randomInt(0, hoursBack * 60 * 60 * 1000));
  return past.toISOString();
}

// ────────────────────────────────────────────────────────────
// Generate Users
// ────────────────────────────────────────────────────────────
export function generateUsers(count = 50) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
    const lastName = LAST_NAMES[i % LAST_NAMES.length];
    const department = randomChoice(DEPARTMENTS);
    const riskScore = Math.random() < 0.15 ? randomInt(65, 98) : randomInt(5, 55);
    users.push({
      id: `USR-${String(i + 1).padStart(4, '0')}`,
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase().replace("'", "")}@enterprise.com`,
      department,
      role: randomChoice(ROLES),
      location: randomChoice(LOCATIONS),
      riskScore,
      riskLevel: riskScore >= 75 ? 'critical' : riskScore >= 50 ? 'high' : riskScore >= 25 ? 'medium' : 'low',
      status: Math.random() < 0.9 ? 'active' : 'inactive',
      lastActive: generateTimestamp(7),
      ipAddress: randomIP(),
      totalActivities: randomInt(50, 2000),
      joinDate: generateTimestamp(365),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}%20${lastName}&backgroundColor=1a1a2e,16213e,0f3460&textColor=e94560`,
    });
  }
  return users;
}

// ────────────────────────────────────────────────────────────
// Generate Activity Logs
// ────────────────────────────────────────────────────────────
export function generateActivityLogs(users, count = 500) {
  const logs = [];
  for (let i = 0; i < count; i++) {
    const user = randomChoice(users);
    const type = randomChoice(ACTIVITY_TYPES);
    const timestamp = generateTimestamp(30);
    const hour = new Date(timestamp).getHours();
    const isOffHours = hour < 6 || hour > 22;
    logs.push({
      id: generateId(),
      userId: user.id,
      userName: user.fullName,
      department: user.department,
      type,
      timestamp,
      sourceIP: user.ipAddress,
      destIP: randomIP(),
      resource: type.includes('file') ? `/shared/${randomChoice(['reports', 'contracts', 'financials', 'hr_docs', 'engineering', 'configs'])}/${randomChoice(['Q1', 'Q2', 'Q3', 'Q4'])}_${randomChoice(['report', 'data', 'analysis', 'summary'])}.${randomChoice(['pdf', 'xlsx', 'docx', 'csv'])}` :
               type.includes('email') ? `${randomChoice(['Re:', 'Fwd:', ''])} ${randomChoice(['Project Update', 'Meeting Notes', 'Quarterly Report', 'Urgent Request', 'Confidential', 'Budget Review'])}` :
               type.includes('web') ? `https://${randomChoice(['github.com', 'stackoverflow.com', 'docs.google.com', 'dropbox.com', 'pastebin.com', 'drive.google.com', 'slack.com'])}` :
               type === 'database_query' ? `SELECT * FROM ${randomChoice(['users', 'transactions', 'orders', 'employees', 'salaries', 'customers'])}` :
               `${type}_${generateId()}`,
      bytesTransferred: type.includes('download') || type.includes('upload') ? randomInt(1024, 500000000) : randomInt(64, 50000),
      status: Math.random() < 0.92 ? 'success' : randomChoice(['failed', 'blocked', 'timeout']),
      isOffHours,
      location: user.location,
    });
  }
  return logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// ────────────────────────────────────────────────────────────
// Generate Network Traffic
// ────────────────────────────────────────────────────────────
export function generateNetworkTraffic(count = 200) {
  const traffic = [];
  for (let i = 0; i < count; i++) {
    const protocol = randomChoice(PROTOCOLS);
    const bytesIn = randomInt(512, 50000000);
    const bytesOut = randomInt(512, 50000000);
    traffic.push({
      id: generateId(),
      timestamp: generateHourlyTimestamp(48),
      sourceIP: randomIP(),
      destIP: randomIP(),
      sourcePort: randomInt(1024, 65535),
      destPort: randomChoice([80, 443, 22, 21, 25, 53, 3389, 445, 389, 8080]),
      protocol,
      bytesIn,
      bytesOut,
      totalBytes: bytesIn + bytesOut,
      packets: randomInt(10, 50000),
      duration: randomInt(1, 3600),
      flags: randomChoice(['SYN', 'ACK', 'FIN', 'RST', 'SYN-ACK', 'PSH-ACK']),
      status: Math.random() < 0.95 ? 'allowed' : 'blocked',
    });
  }
  return traffic.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}

// ────────────────────────────────────────────────────────────
// Generate Anomaly Alerts
// ────────────────────────────────────────────────────────────
export function generateAlerts(users, logs, count = 40) {
  const alerts = [];
  const highRiskUsers = users.filter(u => u.riskScore >= 50);

  for (let i = 0; i < count; i++) {
    const user = i < highRiskUsers.length ? highRiskUsers[i % highRiskUsers.length] : randomChoice(users);
    const anomalyType = randomChoice(ANOMALY_TYPES);
    const severity = anomalyType.includes('brute_force') || anomalyType.includes('exfiltration') || anomalyType.includes('privilege')
      ? randomChoice(['critical', 'high'])
      : randomChoice(SEVERITY_LEVELS);
    
    const descriptions = {
      off_hours_access: `User ${user.fullName} accessed sensitive files at ${randomInt(1, 5)}:${String(randomInt(0, 59)).padStart(2, '0')} AM from ${user.location}`,
      large_data_transfer: `Anomalous data transfer of ${(randomInt(100, 5000) / 10).toFixed(1)} GB detected from ${user.fullName}'s workstation`,
      brute_force_attempt: `${randomInt(15, 200)} failed login attempts detected for ${user.fullName} within ${randomInt(2, 15)} minutes`,
      geo_impossible_travel: `Login from ${randomChoice(LOCATIONS)} detected ${randomInt(5, 30)} minutes after login from ${user.location}`,
      privilege_escalation: `${user.fullName} attempted to access admin-level resources without proper authorization`,
      unusual_download_volume: `${user.fullName} downloaded ${randomInt(50, 500)} files (${(randomInt(10, 100) / 10).toFixed(1)} GB) in the last hour — ${randomInt(300, 800)}% above baseline`,
      suspicious_email_pattern: `${user.fullName} sent ${randomInt(20, 100)} emails with attachments to external domains in ${randomInt(1, 3)} hours`,
      unauthorized_access_attempt: `${user.fullName} attempted to access restricted ${randomChoice(['database', 'server', 'file share', 'admin panel'])} outside authorized scope`,
      data_exfiltration_risk: `Large volume of compressed files transferred to external IP ${randomIP()} from ${user.fullName}'s session`,
      abnormal_query_pattern: `${user.fullName} executed ${randomInt(50, 300)} database queries against ${randomChoice(['salary', 'customer_pii', 'financial'])} tables in ${randomInt(5, 30)} minutes`,
    };

    alerts.push({
      id: `ALT-${String(i + 1).padStart(4, '0')}`,
      userId: user.id,
      userName: user.fullName,
      department: user.department,
      type: anomalyType,
      typeLabel: anomalyType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      severity,
      description: descriptions[anomalyType],
      timestamp: generateTimestamp(14),
      sourceIP: user.ipAddress,
      status: randomChoice(['open', 'investigating', 'resolved', 'dismissed']),
      assignedTo: randomChoice(['SOC Team', 'IT Security', 'CISO Office', 'Unassigned']),
      confidenceScore: randomInt(60, 99),
    });
  }
  return alerts.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity] || new Date(b.timestamp) - new Date(a.timestamp);
  });
}

// ────────────────────────────────────────────────────────────
// Generate Dashboard KPIs
// ────────────────────────────────────────────────────────────
export function generateDashboardData(users, logs, alerts, traffic) {
  const activeUsers = users.filter(u => u.status === 'active').length;
  const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
  const highAlerts = alerts.filter(a => a.severity === 'high').length;
  const totalTrafficGB = traffic.reduce((sum, t) => sum + t.totalBytes, 0) / (1024 ** 3);

  // Activity by hour (last 24 hours)
  const activityByHour = [];
  for (let h = 23; h >= 0; h--) {
    const hour = new Date(Date.now() - h * 3600000);
    const hourLabel = hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    activityByHour.push({
      time: hourLabel,
      activities: randomInt(20, 150),
      anomalies: randomInt(0, 8),
      logins: randomInt(5, 40),
    });
  }

  // Activity by day (last 7 days)
  const activityByDay = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let d = 6; d >= 0; d--) {
    const day = new Date(Date.now() - d * 86400000);
    activityByDay.push({
      day: dayNames[day.getDay()],
      date: day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      totalActivities: randomInt(200, 800),
      anomalies: randomInt(2, 20),
      uniqueUsers: randomInt(20, activeUsers),
    });
  }

  // Alert breakdown by severity
  const alertsBySeverity = [
    { name: 'Critical', value: criticalAlerts, color: '#ff2e63' },
    { name: 'High', value: highAlerts, color: '#ff6b35' },
    { name: 'Medium', value: alerts.filter(a => a.severity === 'medium').length, color: '#ffa235' },
    { name: 'Low', value: alerts.filter(a => a.severity === 'low').length, color: '#08d9d6' },
  ];

  // Department risk distribution
  const deptRisk = {};
  users.forEach(u => {
    if (!deptRisk[u.department]) deptRisk[u.department] = { total: 0, count: 0 };
    deptRisk[u.department].total += u.riskScore;
    deptRisk[u.department].count += 1;
  });
  const departmentRisk = Object.entries(deptRisk).map(([dept, data]) => ({
    department: dept,
    avgRisk: Math.round(data.total / data.count),
    userCount: data.count,
  })).sort((a, b) => b.avgRisk - a.avgRisk);

  return {
    kpis: {
      totalUsers: users.length,
      activeUsers,
      activeSessions: randomInt(15, activeUsers),
      alertsToday: randomInt(3, 15),
      criticalAlerts,
      highAlerts,
      totalTrafficGB: totalTrafficGB.toFixed(1),
      avgRiskScore: Math.round(users.reduce((s, u) => s + u.riskScore, 0) / users.length),
      blockedThreats: randomInt(10, 50),
      dataProcessedTB: (Math.random() * 5 + 1).toFixed(2),
    },
    activityByHour,
    activityByDay,
    alertsBySeverity,
    departmentRisk,
    recentAlerts: alerts.slice(0, 8),
    recentActivity: logs.slice(0, 10),
  };
}

// ────────────────────────────────────────────────────────────
// Generate Behavior Analytics
// ────────────────────────────────────────────────────────────
export function generateBehaviorAnalytics(users) {
  // Risk trend over past 30 days
  const riskTrend = [];
  for (let d = 29; d >= 0; d--) {
    const date = new Date(Date.now() - d * 86400000);
    riskTrend.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      avgRisk: randomInt(20, 45),
      maxRisk: randomInt(55, 95),
      anomalyCount: randomInt(1, 12),
    });
  }

  // User activity patterns (day of week x hour heatmap)
  const heatmapData = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  days.forEach(day => {
    for (let hour = 0; hour < 24; hour++) {
      const isWorkHour = hour >= 8 && hour <= 18 && !['Sat', 'Sun'].includes(day);
      heatmapData.push({
        day,
        hour,
        value: isWorkHour ? randomInt(30, 100) : randomInt(0, 20),
      });
    }
  });

  return { riskTrend, heatmapData };
}

// ────────────────────────────────────────────────────────────
// Generate Network Analytics
// ────────────────────────────────────────────────────────────
export function generateNetworkAnalytics(traffic) {
  // Traffic by protocol
  const protocolMap = {};
  traffic.forEach(t => {
    if (!protocolMap[t.protocol]) protocolMap[t.protocol] = { bytes: 0, count: 0 };
    protocolMap[t.protocol].bytes += t.totalBytes;
    protocolMap[t.protocol].count += 1;
  });
  const byProtocol = Object.entries(protocolMap).map(([name, data]) => ({
    name,
    value: data.count,
    bytes: data.bytes,
    bytesGB: (data.bytes / (1024 ** 3)).toFixed(2),
  })).sort((a, b) => b.value - a.value);

  // Traffic over time (hourly)
  const trafficOverTime = [];
  for (let h = 23; h >= 0; h--) {
    const hour = new Date(Date.now() - h * 3600000);
    trafficOverTime.push({
      time: hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      inbound: randomInt(500, 5000),
      outbound: randomInt(300, 4000),
      blocked: randomInt(10, 200),
    });
  }

  // Top source IPs
  const topSources = [];
  for (let i = 0; i < 10; i++) {
    topSources.push({
      ip: randomIP(),
      requests: randomInt(100, 10000),
      bytesTransferred: randomInt(1000000, 5000000000),
      protocol: randomChoice(PROTOCOLS),
      status: Math.random() < 0.8 ? 'normal' : 'suspicious',
    });
  }
  topSources.sort((a, b) => b.bytesTransferred - a.bytesTransferred);

  return { byProtocol, trafficOverTime, topSources };
}

// ────────────────────────────────────────────────────────────
// Generate Reports
// ────────────────────────────────────────────────────────────
export function generateReports() {
  const reportTypes = [
    { name: 'Weekly Security Summary', frequency: 'Weekly' },
    { name: 'User Behavior Anomaly Report', frequency: 'Daily' },
    { name: 'Network Traffic Analysis', frequency: 'Weekly' },
    { name: 'Compliance Audit Report', frequency: 'Monthly' },
    { name: 'Incident Response Summary', frequency: 'On-demand' },
    { name: 'Data Loss Prevention Report', frequency: 'Weekly' },
    { name: 'Access Control Review', frequency: 'Monthly' },
    { name: 'Threat Intelligence Digest', frequency: 'Daily' },
    { name: 'Executive Security Briefing', frequency: 'Monthly' },
    { name: 'Vulnerability Assessment Report', frequency: 'Quarterly' },
  ];

  return reportTypes.map((r, i) => ({
    id: `RPT-${String(i + 1).padStart(4, '0')}`,
    name: r.name,
    frequency: r.frequency,
    lastGenerated: generateTimestamp(7),
    status: randomChoice(['completed', 'completed', 'completed', 'generating', 'scheduled']),
    pages: randomInt(5, 35),
    size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
    format: randomChoice(['PDF', 'PDF', 'XLSX', 'CSV']),
  }));
}

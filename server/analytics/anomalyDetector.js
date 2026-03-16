// ============================================================
// Anomaly Detection Engine
// Statistical and rule-based anomaly detection for
// enterprise user behavior analysis.
// ============================================================

// Z-score anomaly detection
function zScore(value, mean, stdDev) {
  if (stdDev === 0) return 0;
  return (value - mean) / stdDev;
}

function mean(arr) {
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stdDev(arr) {
  const avg = mean(arr);
  return Math.sqrt(arr.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / arr.length);
}

// ────────────────────────────────────────────────────────────
// Analyze user activity for anomalies
// ────────────────────────────────────────────────────────────
export function analyzeUserBehavior(users, logs) {
  const analysis = [];

  // Group logs by user
  const userLogs = {};
  logs.forEach(log => {
    if (!userLogs[log.userId]) userLogs[log.userId] = [];
    userLogs[log.userId].push(log);
  });

  // Calculate baseline metrics
  const activityCounts = Object.values(userLogs).map(ul => ul.length);
  const avgActivity = mean(activityCounts);
  const sdActivity = stdDev(activityCounts);

  const bytesPerUser = Object.values(userLogs).map(ul =>
    ul.reduce((sum, l) => sum + (l.bytesTransferred || 0), 0)
  );
  const avgBytes = mean(bytesPerUser);
  const sdBytes = stdDev(bytesPerUser);

  users.forEach(user => {
    const uLogs = userLogs[user.id] || [];
    const metrics = {
      totalActivities: uLogs.length,
      offHoursActivities: uLogs.filter(l => l.isOffHours).length,
      failedAttempts: uLogs.filter(l => l.status === 'failed').length,
      totalBytes: uLogs.reduce((sum, l) => sum + (l.bytesTransferred || 0), 0),
      fileDownloads: uLogs.filter(l => l.type === 'file_download').length,
      uniqueIPs: new Set(uLogs.map(l => l.destIP)).size,
    };

    const activityZ = zScore(metrics.totalActivities, avgActivity, sdActivity);
    const bytesZ = zScore(metrics.totalBytes, avgBytes, sdBytes);

    const flags = [];
    if (activityZ > 2) flags.push({ type: 'high_activity_volume', zScore: activityZ.toFixed(2), detail: `${metrics.totalActivities} activities (z=${activityZ.toFixed(2)})` });
    if (bytesZ > 2) flags.push({ type: 'high_data_transfer', zScore: bytesZ.toFixed(2), detail: `${(metrics.totalBytes / (1024**2)).toFixed(1)} MB transferred (z=${bytesZ.toFixed(2)})` });
    if (metrics.offHoursActivities > 5) flags.push({ type: 'off_hours_activity', count: metrics.offHoursActivities, detail: `${metrics.offHoursActivities} off-hours activities` });
    if (metrics.failedAttempts > 3) flags.push({ type: 'failed_attempts', count: metrics.failedAttempts, detail: `${metrics.failedAttempts} failed access attempts` });
    if (metrics.fileDownloads > 15) flags.push({ type: 'excessive_downloads', count: metrics.fileDownloads, detail: `${metrics.fileDownloads} file downloads` });
    if (metrics.uniqueIPs > 10) flags.push({ type: 'many_dest_ips', count: metrics.uniqueIPs, detail: `Connected to ${metrics.uniqueIPs} unique destination IPs` });

    analysis.push({
      userId: user.id,
      userName: user.fullName,
      department: user.department,
      riskScore: user.riskScore,
      metrics,
      flags,
      isAnomalous: flags.length > 0,
      anomalyScore: Math.min(100, user.riskScore + flags.length * 10),
    });
  });

  return analysis.sort((a, b) => b.anomalyScore - a.anomalyScore);
}

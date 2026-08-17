const pool = require('../config/db');

exports.getAttendanceSummary = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });

  try {
    const result = await pool.query(`
      SELECT u.name, COUNT(a.id) AS total_logs,
             SUM(CASE WHEN a.status='on-time' THEN 1 ELSE 0 END) AS on_time,
             SUM(CASE WHEN a.status='late' THEN 1 ELSE 0 END) AS late,
             SUM(CASE WHEN a.status='missed' THEN 1 ELSE 0 END) AS missed
      FROM users u
      LEFT JOIN attendance_logs a ON u.id = a.user_id
      GROUP BY u.name
      ORDER BY u.name;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExceptionSummary = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });

  try {
    const result = await pool.query(`
      SELECT reason, COUNT(id) AS count
      FROM exceptions
      GROUP BY reason
      ORDER BY count DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaveSummary = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admins only' });

  try {
    const result = await pool.query(`
      SELECT status, COUNT(id) AS count
      FROM leave_requests
      GROUP BY status;
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

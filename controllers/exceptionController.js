const pool = require('../config/db');

exports.addException = async (req, res) => {
  const { log_id, reason, comments } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO exceptions (log_id, reason, comments) VALUES ($1,$2,$3) RETURNING id',
      [log_id, reason, comments]
    );
    res.json({ exceptionId: result.rows[0].id, message: 'Exception logged successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserExceptions = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT e.id, e.reason, e.comments, e.created_at, a.shift_id, a.check_in_time, a.check_out_time
       FROM exceptions e
       JOIN attendance_logs a ON e.log_id = a.id
       WHERE a.user_id=$1
       ORDER BY e.created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

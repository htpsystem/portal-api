const pool = require('../config/db');

exports.createShift = async (req, res) => {
  const { user_id, start_time, end_time, location } = req.body;

  // Only admin can create shifts
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can create shifts' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO shifts (user_id, start_time, end_time, location) VALUES ($1,$2,$3,$4) RETURNING id',
      [user_id, start_time, end_time, location]
    );
    res.json({ shiftId: result.rows[0].id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserShifts = async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM shifts WHERE user_id=$1 ORDER BY start_time ASC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

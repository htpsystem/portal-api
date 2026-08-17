const pool = require('../config/db');

exports.checkIn = async (req, res) => {
  const { shift_id, gps_location } = req.body;
  const checkInTime = new Date();

  try {
    const result = await pool.query(
      'INSERT INTO attendance_logs (user_id, shift_id, check_in_time, gps_location, status) VALUES ($1,$2,$3,$4,$5) RETURNING id',
      [req.user.id, shift_id, checkInTime, gps_location, 'on-time']
    );
    res.json({ logId: result.rows[0].id, message: 'Check-in successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.checkOut = async (req, res) => {
  const { log_id } = req.body;
  const checkOutTime = new Date();

  try {
    await pool.query(
      'UPDATE attendance_logs SET check_out_time=$1 WHERE id=$2',
      [checkOutTime, log_id]
    );
    res.json({ message: 'Check-out successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserAttendance = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM attendance_logs WHERE user_id=$1 ORDER BY check_in_time DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

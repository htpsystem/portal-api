const pool = require('../config/db');

exports.applyLeave = async (req, res) => {
  const { start_date, end_date } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO leave_requests (user_id, start_date, end_date, status) VALUES ($1,$2,$3,$4) RETURNING id',
      [req.user.id, start_date, end_date, 'pending']
    );
    res.json({ leaveId: result.rows[0].id, message: 'Leave request submitted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Only admin can approve/reject
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admins can update leave status' });
  }

  try {
    await pool.query(
      'UPDATE leave_requests SET status=$1 WHERE id=$2',
      [status, id]
    );
    res.json({ message: `Leave request ${status}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getUserLeaves = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM leave_requests WHERE user_id=$1 ORDER BY start_date DESC',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const pool = require('../config/db');

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, role, department, email FROM users WHERE id=$1',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, department } = req.body;
  try {
    await pool.query(
      'UPDATE users SET name=$1, department=$2 WHERE id=$3',
      [name, department, id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

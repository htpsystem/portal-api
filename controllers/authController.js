const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { name, role, department, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, role, department, email, password_hash) VALUES ($1,$2,$3,$4,$5) RETURNING id',
      [name, role, department, email, hashedPassword]
    );
    res.json({ userId: result.rows[0].id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
    if (result.rows.length === 0) return res.status(401).send('User not found');

    const { password_hash, ...user } = result.rows[0];
    const validPassword = await bcrypt.compare(password, password_hash);
    if (!validPassword) return res.status(401).send('Invalid credentials');

    const token = jwt.sign(
      { 
        id: user.id, 
        role: user.role 
      }, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: process.env.JWT_EXPIRES_IN
      }
    );
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

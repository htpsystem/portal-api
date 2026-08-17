const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER || 'yourusername',
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE || 'employee_management',
  password: process.env.PASSWORD || 'yourpassword',
  port: process.env.PORT || 5432,
});

module.exports = pool;

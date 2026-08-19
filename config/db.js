const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'yourusername',
  host: process.env.DB_HOST || 'localhost',
  database: `${process.env.DB_NAME}_${process.env.ENV}` || 'employee_management_dev',
  password: process.env.DB_PASS || 'yourpassword',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;

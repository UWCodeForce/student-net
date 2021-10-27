const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
})

module.exports.pool = pool;

module.exports.query = async function(q, values) {
  try {
    const results = await pool.query(q, values)
    return results
  } catch (e) {
    throw Error(e.message)
  }
}
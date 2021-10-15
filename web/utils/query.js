require('dotenv').config(); //Load from the .env file
const mysql = require('mysql2');

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
})

export async function query(q, values) {
  try {
    const results = await pool.query(q, values)
    await pool.end()
    return results
  } catch (e) {
    throw Error(e.message)
  }
}
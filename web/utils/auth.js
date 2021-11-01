const { pool, query } = require('./query')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const sessionStore = new MySQLStore({
  expiration: 3600, 
  createDatabaseTable: false, // probably should create it manually
  schema: {
    tableName: 'sessions',
    columnNames: {
        session_id: 'session_id',
        expires: 'session_expiry',
        data: 'session_data'
    }
  }
}, pool)

const auth = session({
            name: "sid",
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: false,
                maxAge: 300 
            },
            store: sessionStore
            })

const getUserById = (id) => {
  var results = await query(`
    SELECT email FROM users WHERE id = ?
  `, [id])

  if (results[0].length<1) return null
  const { email } = JSON.parse(JSON.stringify(results[0][0]))
  const user = { id: id, email: email }

  return user
}

module.exports = { auth, getUserById }
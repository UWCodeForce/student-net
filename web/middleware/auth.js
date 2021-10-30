const { pool } = require('../utils/query')
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

module.exports = auth
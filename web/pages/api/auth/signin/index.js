import nextConnect from 'next-connect'
import bcrypt from 'bcrypt'
import { query, pool } from '../../../../utils/query'
import session from 'express-session'
import MySQLStore from 'express-mysql-session'

const store = MySQLStore(session) 
const sessionStore = new store({
  expiration: 3600, 
  createDatabaseTable: false, // probably should create it manually
  schema: {
    tableName: 'sessions_test',
    columnNames: {
        session_id: 'session_id',
        expires: 'session_expires',
        data: 'session_data'
    }
  }
}, pool)

const handler = nextConnect()

    .use(session({
            name: "sid",
            secret: process.env.SESSION_SECRET,
            resave: false, // no need to store the session again everytime for every user
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600 // 1 hr, might want to add to serverconstants.js later
            },
            store: sessionStore
        }))

    .post(async (req, res) => {
        const { email, password } = req.body 

        if (!email || !password) return res.status(400).json({ error: 'Email or Password cannot be blank' })

        try {
            const results = await query(`
              SELECT password FROM users WHERE email = ?
            `, [email])

            if (results[0].length<1) return res.status(401).json({ error: 'Email not found!' })

            // will need to find a better way to do this in the future
            // currently cannot directly parse the 'RowPacket' that mysql2 returns by using results[0].password
            const hashedPW = JSON.parse(JSON.stringify(results[0][0].password))
            
            const valid = await bcrypt.compare(password, hashedPW)            

            if (valid) {
              // because req.session.saveUninitialized = false, the session won't send a cookie & store the data until
              // we make changes to it. which only happens inside this validation check 
              req.session.userId = email

              return res.status(200).json({ message: 'Success!', session: req.session })
            }

            else if (!valid) return res.status(401).json({ error: 'Incorrect Password!' })
    
          } catch (e) {
            res.status(500).json({ error: e.message })
          }
    })

export default handler
import nextConnect from 'next-connect'
import bcrypt from 'bcrypt'
import { query } from '../../../utils/query'

const handler = nextConnect()

    .post(async (req, res) => {
        const { email, password } = req.body 

        if (!email || !password) res.status(400).json({ error: 'Email or Password cannot be blank' })

        try {
            const results = await query(`
              SELECT password FROM users WHERE email = ?
            `, [email])

            // will need to find a better way to do this in the future
            // currently cannot directly parse the 'RowPacket' that mysql2 returns by using results[0].password
            const hashedPW = JSON.parse(JSON.stringify(results[0][0].password))

            if (!results[0]) return res.status(401).json({ error: 'Email not found!' })

            const valid = await bcrypt.compare(password, hashedPW)            

            if (valid) {  
              /*
                todo: 
                  - create a session for the user, store it in db
                  - store session in cookie/localstorage/sessionstorage
                  - check session with server upon refresh 
                  - two factor authentication ?
              */
              return res.status(200).json({ message: 'Success!' })
            }

            else if (!valid) return res.status(401).json({ error: 'Incorrect Password!' })
    
          } catch (e) {
            res.status(500).json({ error: e.message })
          }
    })

export default handler
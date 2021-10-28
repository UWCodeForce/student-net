import nextConnect from 'next-connect'
import cookie from 'cookie'

const handler = nextConnect()
    .post(async (req, res) => {
    /* remove cookies from request header */
        res.setHeader('Set-Cookie', cookie.serialize('sid', '', { maxAge: -1, path: '/' }))
        res.end()
    })

export default handler
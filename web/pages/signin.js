import React, { useState } from 'react'
import styles from '../styles/auth.module.css'
import { useRouter } from 'next/router'
import { validateSignIn } from '../utils/formvalidation'

export default function signin() {
    const Router = useRouter()
    const [response, setResponse] = useState()
    
    async function onSubmit(e) {
        e.preventDefault()

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        const validationError = validateSignIn(email, password)
        if (validationError) {
            setResponse(validate)
            return
        }

        const body = {
            email: email,
            password: password,
        }

        let res = await fetch('./api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        res = await res.json()
        setResponse(res)
    }

    return (
        <div className={[styles.auth, "noselect"].join(' ')}> {/* hacky way to add multiple classes */}

            <h1>Sign In</h1>

            {response && response.message && <p style={{color: "green"}}>{response.message}</p>}
            {response && response.error && <p style={{color: "red"}}>{response.error}</p>}
 
                <form className={styles.form} onSubmit={e => onSubmit(e)} >
                    <input className={styles.field} /* type="email" -> html5 email validation, probably not very secure */ 
                    name="email" placeholder="Email"/>
                    <input className={styles.field} type="password" name="password" placeholder="Password"/>
                    <button className={styles.submit} type="submit">Sign In</button>
                </form>
            
            <div className={styles.links}>
                <a onClick={() => Router.push('/signup')}><p>Sign Up</p></a>
                <a><p>Forgot Password</p></a>
            </div>

        </div>
    )
}
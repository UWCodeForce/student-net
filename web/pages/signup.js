import React, { useState } from 'react'
import styles from '../styles/auth.module.css'

export default function signup() {
    const [response, setResponse] = useState()
    
    async function onSubmit(e) {
        e.preventDefault()

        const pass1 = e.currentTarget.password1.value
        const pass2 = e.currentTarget.password2.value

        if (pass1!==pass2) {
            setResponse({ error: 'Passwords do not match!' })
            return
        } else if (!pass1 || !pass2) {
            setResponse({ error: 'Please enter and confirm a password.' })
            return
        }

        const body = {
            email: e.currentTarget.email.value,
            password: pass1,
        }

        let res = await fetch('./api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        res = await res.json()
        setResponse(res)
    }



    return (
        <div className={[styles.auth, "noselect"].join(' ')}> {/* hacky way to add multiple classes */}
        
            <h1>Sign Up</h1>

            {response && response.message && <p className={styles.submitMessage} style={{color: "green"}}>{response.message}</p>}
            {response && response.error && <p  className={styles.submitMessage} style={{color: "red"}}>{response.error}</p>}

            {/* could use Formik or another library in the future */}
            <form className={styles.form} onSubmit={e => onSubmit(e)}>
                <input className={styles.field} name="email" placeholder="Email"/>
                <input className={styles.field} type="password" name="password1" placeholder="Password"/>
                <input className={styles.field} type="password" name="password2" placeholder="Confirm Password"/>
                <button className={styles.submit} type="submit">Sign Up</button>
            </form>

        </div>
    )
}


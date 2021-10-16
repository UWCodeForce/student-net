import React, { useState } from 'react'
import styles from '../styles/auth.module.css'
import { useRouter } from 'next/router'

export default function signin() {
    const Router = useRouter()
    const [response, setResponse] = useState()
    
    async function onSubmit(e) {
        e.preventDefault()

        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        }

        let res = await fetch('./api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (res.status===200) {
            // store session in cookie/localstorage/sessionstorage
            Router.push('/')
        } else {
            res = await res.json()
            setResponse(res)
        }
    }

    return (
        <div className={[styles.auth, "noselect"].join(' ')}> {/* hacky way to add multiple classes */}

            <h1>Sign In</h1>

            {response && response.message && <p style={{color: "green"}}>{response.message}</p>}
            {response && response.error && <p style={{color: "red"}}>{response.error}</p>}

            {/* could use Formik or another library in the future */}
            <form className={styles.form} onSubmit={e => onSubmit(e)} >
                <input className={styles.field} name="email" placeholder="Email"/>
                <input className={styles.field} type="password" name="password" placeholder="Password"/>
                <button className={styles.submit} type="submit">Sign In</button>
            </form>

        </div>
    )
}


import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { validateSignIn } from '../../utils/formvalidation'
import styles from '../../styles/auth.module.css'

export default function SignIn() {
    const Router = useRouter()
    const [response, setResponse] = useState()

    async function onSubmit(e) {
        e.preventDefault()

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        const validationError = validateSignIn(email, password)
        if (validationError) {
            setResponse(validationError)
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

        if (res.status===200) Router.reload()

        else { 
            res = await res.json()
            setResponse(res)
        }
    }

    return (
        <div className={[styles.auth, "noselect"].join(' ')}>

            <h1>Sign In</h1>

            {response && response.message && 
            <div className={styles.alert} style={{backgroundColor: "green"}}>
                <p>{response.message}</p>
            </div>}

            {response && response.error && 
            <div className={styles.alert} style={{backgroundColor: "red"}}>
                <p>{response.error}</p>
            </div>}
 
            <form className={styles.form} onSubmit={e => onSubmit(e)} >
                <div className={styles.field}>
                    <input /* type="email" -> html5 email validation, probably not very secure */ 
                    name="email" placeholder="Email"/>
                </div>
                <div className={styles.field}>
                    <input className={styles.field} type="password" name="password" placeholder="Password"/>
                </div>
                <button className={styles.submit} type="submit">Sign In</button>
            </form>

            <div className={styles.links}>
                <a onClick={() => Router.push('/signup')}><p>Sign Up</p></a>
                <a><p>Forgot Password</p></a>
            </div>
            
        </div>
    )
}

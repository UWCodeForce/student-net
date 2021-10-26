import React, { useState } from 'react'
import styles from '../../styles/auth.module.css'
import { useRouter } from 'next/router'
import { validateSignUp } from '../../utils/formvalidation'

export default function SignUp() {
    const [response, setResponse] = useState()
    const Router = useRouter()
    
    async function onSubmit(e) {
        e.preventDefault()

        const email = e.currentTarget.email.value
        const pass1 = e.currentTarget.password1.value
        const pass2 = e.currentTarget.password2.value

        const validationError = validateSignUp(email, pass1, pass2)

        if (validationError) {
            setResponse(validationError)
            return
        } 

        const body = {
            email: email,
            password: pass1,
        }

        let res = await fetch('./api/auth/signup', {
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

            {response && response.message && 
            <div className={styles.alert} style={{backgroundColor: "green"}}>
                <p>{response.message}</p>
            </div>}

            {response && response.error && 
            <div className={styles.alert} style={{backgroundColor: "red"}}>
                <p>{response.error}</p>
            </div>}

            {/* could use Formik or another library in the future */}
            <form className={styles.form} onSubmit={e => onSubmit(e)}>
                <div className={styles.field}>    
                    <input name="email" placeholder="Email"/>
                </div>
                <div className={styles.field}>
                    <input className={styles.field} type="password" name="password1" placeholder="Password"/>
                </div>
                <div className={styles.field}>
                    <input className={styles.field} type="password" name="password2" placeholder="Confirm Password"/>
                </div>
                <button className={styles.submit} type="submit">Sign Up</button>
            </form>

            <div className={styles.links}>
                <p>or <a onClick={() => Router.push('/signin')}>Sign In</a></p>
            </div>

        </div>
    )
}

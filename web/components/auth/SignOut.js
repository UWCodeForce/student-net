import React from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/auth.module.css'

export default function SignOut({ data }) {
    const Router = useRouter()
    
    async function onSignout(e) {
        e.preventDefault()

        await fetch('./api/auth/signout', { method: 'POST' })
        Router.reload()
    }

    return (
        <div className={[styles.auth, "noselect"].join(' ')}>
            <h1>You are signed in as {data.email}</h1>
            <button onClick={onSignout} className={styles.submit}>Sign Out</button>
        </div>
    )
}

import React from 'react'
import SignIn from '../components/auth/SignIn'


export default function signin({ data }) {
    //if (data) return <SignOut data={data}/>
    return <SignIn/>
}

//export async function getServerSideProps({ req }) {
    /**
     * Enter server side code for verifying a user
     */
//}
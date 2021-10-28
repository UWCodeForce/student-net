import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { validateSignIn } from '../../utils/formvalidation'
import styles from '../../styles/auth.module.css'
import { 
    Input,
    Box,
    Flex,
    Button,
    Heading,
    Divider
} from "@chakra-ui/react"

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
        <Flex height="100vh" alignItems="center" justifyContent="Center" backgroundColor="gray.700">

            {response && response.message && 
            <Box className={styles.alert} style={{backgroundColor: "green"}}>
                <p>{response.message}</p>
            </Box>}

            {response && response.error && 
            <Box >
                <p>{response.error}</p>
            </Box>}
 
            <Flex direction="column" background="gray.100" p={12} rounded={6} onSubmit={e => onSubmit(e)}>
                <Heading>Sign In</Heading>
                <span>&nbsp;</span>
                <Box>
                    <Input /* type="email" -> html5 email validation, probably not very secure */ 
                    name="email" placeholder="Email"/>
                </Box>
                <Box className={styles.field}>
                    <Input type="password" name="password" placeholder="Password"/>
                </Box>
                <Button type="submit">Sign In</Button>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Box className={styles.links}>
                <Box><a onClick={() => Router.push('/signup')}>Sign Up</a></Box>
                <Box><a>Forgot Password</a></Box>
                </Box>
            </Flex>
            
        </Flex>
    )
}

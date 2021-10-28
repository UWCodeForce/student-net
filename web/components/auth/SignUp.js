import React, { useState } from 'react'
import styles from '../../styles/auth.module.css'
import { useRouter } from 'next/router'
import { validateSignUp } from '../../utils/formvalidation'
import { 
    Input,
    Box,
    Flex,
    Button,
    Heading,
    Divider
} from "@chakra-ui/react"

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
        <Flex height="100vh" alignItems="center" justifyContent="Center" backgroundColor="gray.700"> {/* hacky way to add multiple classes */}

            {response && response.message && 
            <Box>
                <p>{response.message}</p>
            </Box>}

            {response && response.error && 
            <Box>
                <p>{response.error}</p>
            </Box>}

            {/* could use Formik or another library in the future */}
            <Flex direction="column" background="gray.100" p={12} rounded={6} onSubmit={e => onSubmit(e)}>
                <Heading mb={6}>Sign Up</Heading>
                <Box>    
                    <Input name="email" placeholder="Email"/>
                </Box>
                <Box>
                    <Input type="password" name="password1" placeholder="Password"/>
                </Box>
                <Box>
                    <Input type="password" name="password2" placeholder="Confirm Password"/>
                </Box>
                <Button type="submit">Sign Up</Button>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Box className={styles.links}>
                <Box>or <a onClick={() => Router.push('/signin')}>Sign In</a></Box>
                </Box>
            </Flex>
        </Flex>
    )
}

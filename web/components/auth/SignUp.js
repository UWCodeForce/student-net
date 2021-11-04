import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
	Input,
	Flex,
	VStack,
	Button,
	Heading,
	FormControl,
	FormLabel,
	Alert,
	AlertIcon,
	AlertDescription,
	HStack,
	Box,
	Link,
} from '@chakra-ui/react';

export default function SignUp() {
	const [response, setResponse] = useState();
	const Router = useRouter();

	async function onSubmit(e) {
		e.preventDefault();

		const email = e.currentTarget.email.value;
		const pass1 = e.currentTarget.password1.value;
		const pass2 = e.currentTarget.password2.value;

		const doPasswordsMatch = pass1 === pass2;

		if (!doPasswordsMatch) {
			setResponse({ error: 'Passwords do not match' });
			return;
		}

		const body = {
			email: email,
			password: pass1,
		};

		let res = await fetch('./api/auth/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		res = await res.json();
		setResponse(res);
	}

	return (
		<Flex height="100vh" align="center" justify="center" backgroundColor="gray.700">
			<VStack
				className="noselect"
				background="gray.100"
				p="3rem"
				align="center"
				justify="center"
				spacing="1rem"
			>
				<Heading>Sign Up</Heading>

				{response && response.message && (
					<Alert
						status="success"
						rounded="1.5rem"
						p="0.75rem 1rem"
						justify="center"
						align="center"
						width="fit-content"
						maxWidth="100%"
					>
						<AlertIcon />
						<AlertDescription>{response.message}</AlertDescription>
					</Alert>
				)}

				{response && response.error && (
					<Alert
						status="error"
						rounded="1rem"
						justify="center"
						align="center"
						width="fit-content"
					>
						<AlertIcon />
						<AlertDescription>{response.error}</AlertDescription>
					</Alert>
				)}

				<form onSubmit={(e) => onSubmit(e)}>
					<VStack justify="center" align="center" spacing="0.5rem">
						<FormControl isRequired>
							<FormLabel>Email</FormLabel>
							<Input name="email" />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<Input type="password" name="password1" />
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Confirm Password</FormLabel>
							<Input type="password" name="password2" />
						</FormControl>
						<Box>
							<Button mt="0.5rem" colorScheme="red" type="submit">
								Sign Up
							</Button>
						</Box>
					</VStack>
				</form>

				<HStack spacing="0.5rem" justify="center">
					<p>
						Or{' '}
						<Link
							style={{ textDecoration: 'inherit' }}
							onClick={() => Router.push('/signin')}
						>
							Sign In
						</Link>
					</p>
				</HStack>
			</VStack>
		</Flex>
	);
}

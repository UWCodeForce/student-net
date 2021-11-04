import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
	Input,
	InputGroup,
	InputRightElement,
	Flex,
	VStack,
	Button,
	Heading,
	FormControl,
	FormLabel,
	Alert,
	AlertIcon,
	AlertDescription,
	Link,
	Box,
} from '@chakra-ui/react';

export default function SignIn() {
	const Router = useRouter();
	const [response, setResponse] = useState();

	async function onSubmit(e) {
		e.preventDefault();

		const body = {
			email: e.currentTarget.email.value,
			password: e.currentTarget.password.value,
		};

		let res = await fetch('./api/auth/signin', {
			method: 'POST',
			credentials: 'include',
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
				<Heading>Sign In</Heading>

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
							<PasswordInput name="password" />
						</FormControl>
						<Box>
							<Button mt="1rem" colorScheme="red" type="submit">
								Sign In
							</Button>
						</Box>
					</VStack>
				</form>

				<Flex justify="space-between" width="100%" direction="row">
					<p>
						<Link
							style={{ textDecoration: 'inherit' }}
							onClick={() => Router.push('/signup')}
						>
							Sign Up
						</Link>
					</p>
					<p>
						<Link style={{ textDecoration: 'inherit' }}>Forgot Password</Link>
					</p>
				</Flex>
			</VStack>
		</Flex>
	);
}

function PasswordInput({ name }) {
	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<InputGroup>
			<Input type={show ? 'text' : 'password'} name={name} />
			<InputRightElement width="4.5rem">
				<Button h="75%" size="sm" onClick={handleClick}>
					{show ? 'Hide' : 'Show'}
				</Button>
			</InputRightElement>
		</InputGroup>
	);
}

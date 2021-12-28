import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInputField from '../components/auth/CustomInputField';
import {
	Flex,
	VStack,
	Button,
	Heading,
	Alert,
	AlertIcon,
	AlertDescription,
	Link,
	Box,
} from '@chakra-ui/react';

const initialValues = {
	email: '',
	password: '',
};

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Required'),
	// .email('Invalid Email') disabled for debugging and testing
	password: Yup.string().required('Required'),
});

export default function SignIn() {
	const Router = useRouter();
	const [response, setResponse] = useState();

	async function onSignIn(values) {
		const body = {
			email: values.email,
			password: values.password,
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
				color="black"
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

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={async (values, actions) => {
						await onSignIn(values);
						actions.setSubmitting(false);
					}}
				>
					{({ errors, touched, isSubmitting, isValid }) => (
						<Form>
							<VStack justify="center" align="flex-start" spacing="0.5rem">
								<CustomInputField
									name="email"
									label="Email"
									error={errors.email}
									touched={touched.email}
									bg="white"
								/>
								<CustomInputField
									name="password"
									type="password"
									label="Password"
									error={errors.password}
									touched={touched.password}
									bg="white"
								/>
								<Box w="100%" align="center">
									<Button
										disabled={!isValid}
										isLoading={isSubmitting}
										mt="0.5rem"
										colorScheme="red"
										type="submit"
									>
										Sign In
									</Button>
								</Box>
							</VStack>
						</Form>
					)}
				</Formik>

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

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInputField from "./CustomInputField";
import {
  Flex,
  VStack,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertDescription,
  HStack,
  Box,
  Link,
} from "@chakra-ui/react";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    //.email('Invalid email') disabled for debugging and testing
    .required("Required"),
  password: Yup.string()
    .min(6, "Too short")
    .max(20, "Too long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Must match password")
    .min(6, "Too short")
    .max(30, "Too long")
    .required("Required"),
});

export default function SignUp() {
  const [response, setResponse] = useState();
  const Router = useRouter();

  async function onSignUp(values) {
    const body = {
      email: values.email,
      password: values.confirmPassword, // confirm password will only be sent to this method if it matches with password
    };

    let res = await fetch("./api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    res = await res.json();
    setResponse(res);
  }

  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      backgroundColor="gray.700"
    >
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

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            await onSignUp(values);
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
                />
                <CustomInputField
                  name="password"
                  type="password"
                  label="Password"
                  error={errors.password}
                  touched={touched.password}
                />
                <CustomInputField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
                <Box w="100%" align="center">
                  <Button
                    disabled={!isValid}
                    isLoading={isSubmitting}
                    mt="0.5rem"
                    colorScheme="red"
                    type="submit"
                  >
                    Sign Up
                  </Button>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>

        <HStack spacing="0.5rem" justify="center">
          <p>
            Or{" "}
            <Link
              style={{ textDecoration: "inherit" }}
              onClick={() => Router.push("/signin")}
            >
              Sign In
            </Link>
          </p>
        </HStack>
      </VStack>
    </Flex>
  );
}

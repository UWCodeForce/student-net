import React, {useState} from 'react';
import {FormControl, 
		Button, 
		Flex, 
		Heading, 
		VStack, 
		Box, 
		Alert,
  AlertIcon,
  AlertDescription,} from '@chakra-ui/react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import ContactInputField from '../components/InputField/ContactInputField';

const initialValues = {
  	email: '',
			name: '',
   description: '',
};

function Contact() {
  const [response, setResponse] = useState();

  const contactSchema = Yup.object().shape({
    email: Yup.string()
      .required('Required'),
    name: Yup.string().min(2, 'Too short').required('Required'),
    description: Yup.string()
      .max(1000, 'Too long')
      .required('Required'),
  });

  async function onContacts(values) {
		const body = {
			email: values.email,
			name: values.name,
   description: values.description,
		};

		let res = await fetch('./api/contacts', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		res = await res.json();
		setResponse(res);
		console.log(response);
		initialValues = {initialValues};
	}
  return( 
  <>
  <Flex align="center" justify="center" maxH='auto'>
			<VStack
				className="noselect"
				background="gray.100"
				p='9.25rem'
				align="center"
				justify="center"
				spacing="1.5rem"
				color="black"
			
			>
  <Heading align='center'>Contact Us</Heading>
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

    <FormControl>
      <Formik
        initialValues = {initialValues}
        validationSchema = {contactSchema}
        onSubmit ={ async (values,actions) =>{
          await onContacts(values);
          actions.setSubmitting(false);
										actions.resetForm({initialValues})
        }}
      >
     {({ errors, touched, isSubmitting, isValid }) => (
            
						<Form >
							<VStack w='50rem' spacing="1.75rem"  >

								<ContactInputField
									name="email"
									label="Email"
									error={errors.email}
									touched={touched.email}
									tag='Input'
									bg="white"
								/>
								<ContactInputField
									name="name"
									type="text"
									label="Name"
									error={errors.name}
									touched={touched.name}
									tag='Input'
									bg="white"
								/>

									<ContactInputField
									name="description"
									type="text"
									label="Description"
									error={errors.description}
									touched={touched.description}
									tag='Textarea'
									bg="white"
								/>
								
								<Box style={({marginLeft: 'auto', marginRight: '0'})} >								
									<Button
          disabled={!isValid}
										isLoading={isSubmitting}
										type="submit"
          colorScheme='teal' size='lg'
									>
										 Send Message
									</Button>
								</Box>
							</VStack>
						</Form>
					)}
      </Formik>
     </FormControl>
			</VStack>
  </Flex>
  
  </>
  );
}

export default Contact;

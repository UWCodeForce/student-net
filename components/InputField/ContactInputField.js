import React from 'react';
import { Field } from 'formik';
import {
	FormControl,
	FormLabel,
	FormErrorMessage,
	Input,
	Textarea,
	IconButton,
} from '@chakra-ui/react';
import InputPopover from './InputPopover';
import { RiErrorWarningFill } from 'react-icons/ri';

function ContactInputField({ type, label, name, error, touched, tag }) {
	return (
		<Field type={type} name={name}>
			{({ field }) => (
				<FormControl isInvalid={error && touched}>
					<FormLabel htmlFor={name}>
						{label}
						{error && touched ? (
							<InputPopover
								header="Error"
								content={<FormErrorMessage>{error} </FormErrorMessage>}
								trigger={
									<IconButton fontSize="20px" size="sm" isRound="true">
										<RiErrorWarningFill color="#F65656" />
									</IconButton>
								}
							/>
						) : (
							''
						)}
					</FormLabel>
					{tag === 'Input' ? (
						<Input {...field} type={type} id={name} />
					) : (
						<Textarea
							placeholder="Send us a message!"
							{...field}
							type={type}
							id={name}
							height="250px"
						/>
					)}
				</FormControl>
			)}
		</Field>
	);
}

export default ContactInputField;

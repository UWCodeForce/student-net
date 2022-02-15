import React from 'react';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverBody,
	PopoverArrow,
	PopoverCloseButton,
	Portal,
} from '@chakra-ui/react';

function InputPopover({ header, trigger, content, openOn }) {
	return (
		<Popover defaultIsOpen={openOn}>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<Portal>
				<PopoverContent>
					<PopoverArrow />
					<PopoverHeader>{header}</PopoverHeader>
					<PopoverCloseButton />
					<PopoverBody>{content}</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	);
}

export default InputPopover;

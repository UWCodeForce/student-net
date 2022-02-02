import React from 'react';
import {
	Box,
	Heading,
	Link,
	List,
	ListItem,
	Text,
	Divider,
	Center,
	Accordion,
	AccordionButton,
	AccordionPanel,
	AccordionItem,
} from '@chakra-ui/react';

function Content(props) {
	return (
		<AccordionItem width="40%" height="200px" margin="100px" right="700" spacing="5">
			<AccordionButton
				boxShadow="0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)"
				p="6"
				rounded="md"
				borderRadius="10px"
			>
				<List>
					<ListItem key={props.id}>
						<Link href={props.link} fontSize="24px" fontWeight="500">
							{props.title}
						</Link>
						<br />
						<Text fontSize="16px" fontWeight="400" textDecoration="underline">
							{props.company}
						</Text>
						<Text fontSize="16px">{props.location}</Text>
						<br />
						<Text fontSize="12px">{props.jobDescription}</Text>
						<br />
						<Text fontSize="12px">{props.dateString}</Text>
						<br />
					</ListItem>
				</List>
			</AccordionButton>
			<AccordionPanel
				position="absolute"
				left="925"
				height="70%"
				top="275"
				boxShadow="0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)"
				p="6"
				rounded="md"
				borderRadius="10px"
				overflow="auto"
				width="50%"
			>
				<Link href={props.link} fontSize="36px" fontWeight="500">
					{props.title}
				</Link>
				<Divider />
				<br />
				<Center>
					<Text width="80%" fontSize="20px">
						<p dangerouslySetInnerHTML={{ __html: props.fullDesc }} />
					</Text>
				</Center>
			</AccordionPanel>
		</AccordionItem>
	);
}

const Posts = ({ posts, loading }) => {
	if (loading) {
		return <Heading>Loading...</Heading>;
	}

	if (posts.length < 1) {
		return <Box><Divider /><Heading>No Jobs Found.</Heading></Box>;
	}

	return (
		<Box>
			<Accordion>
				{posts.map((post) => (
					<Content
						id={post.id}
						link={post.link}
						title={post.title}
						company={post.company}
						location={post.location}
						jobDescription={post.jobDescription}
						dateString={post.dateString}
						fullDesc={post.fullDesc}
					/>
				))}
				;
			</Accordion>
		</Box>
	);
};

export default Posts;

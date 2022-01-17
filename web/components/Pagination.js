import React from 'react';
import { Grid, GridItem, Link, Center } from '@chakra-ui/react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<Center>
			<Grid
				templateColumns="repeat(6, 1fr)"
				gap={40}
				backgroundColor="blue.100"
				width="100%"
				border="1px"
			>
				{pageNumbers.map((number) => (
					<Link
						onClick={() => paginate(number)}
						_hover={{ backgroundColor: 'gray.500' }}
						padding="25px"
					>
						<GridItem key={number}>{number}</GridItem>
					</Link>
				))}
			</Grid>
		</Center>
	);
};

export default Pagination;

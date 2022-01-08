import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';

const App = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const res = await fetch('http://localhost:3000/api/jobs').then((response) =>
				response.json()
			);
			setPosts(res);
			setLoading(false);
		};

		fetchPosts();
	}, []);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	return (
		<Box textAlign="center">
			<br />
			<Heading fontSize="48" margin="10px">
				Available Jobs
			</Heading>
			<Posts posts={currentPosts} loading={loading} />
			<br />
			<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
			<br />
		</Box>
	);
};

export default App;

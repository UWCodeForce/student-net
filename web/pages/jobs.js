import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Posts from '../components/Posts';
import Pagination from '../components/Pagination';

const Jobs = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(5);

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true);
			const res = await (await fetch('/api/jobs')).json();
			setPosts(res);
			setLoading(false);
		};

		fetchPosts();
	}, []);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	let currentPosts = [];

	if (posts.length >= 1) {
		currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
	}

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

export default Jobs;

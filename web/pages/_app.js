import { useState } from 'react'
import '../styles/globals.css';
import '../styles/utilities.css';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';
import { UserContext } from '../utils/UserContext';

export default function MyApp({ Component, pageProps }) {
	const [user, setUser] = useState(null)
	return (
		<UserContext.Provider value={{ user, setUser }} >
			<ChakraProvider>
				<NavBar />
				<Component {...pageProps} />
				<Footer />
			</ChakraProvider>
		</UserContext.Provider>
	);
}


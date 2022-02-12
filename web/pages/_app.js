import '../styles/globals.css';
import '../styles/utilities.css';
import { ChakraProvider } from '@chakra-ui/react';
import Footer from '../components/Footer';
import NavBar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</ChakraProvider>
	);
}

export default MyApp;

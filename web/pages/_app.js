import '../styles/globals.css'
import '../styles/utilities.css'
import { ChakraProvider } from "../node_modules/@chakra-ui/react"

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
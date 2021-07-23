import "../styles/globals.css";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import theme from "../theme";
import "../styles/Card.css";

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;

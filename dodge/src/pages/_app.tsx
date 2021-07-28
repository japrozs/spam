import "../styles/globals.css";
import { ChakraProvider, useColorMode } from "@chakra-ui/react";
import theme from "../theme";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
import "../styles/Card.css";
import "../styles/Hero.css";
import "../styles/Features.css";
import "../styles/Usage.css";
import "../styles/GetStarted.css";
import "../styles/postStyles.css";
import "../styles/text.css";
import "../styles/Nav.css";

const TopProgressBar = dynamic(
    () => {
        return import("../components/ProgressBar");
    },
    { ssr: false }
);

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider resetCSS theme={theme}>
            <TopProgressBar />
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;

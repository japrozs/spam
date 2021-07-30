import { Text } from "@chakra-ui/react";
import Head from "next/head";
import router from "next/router";
import React from "react";
import { Wrapper } from "src/components/Wrapper";

interface WrongTokenProps {}

const WrongToken: React.FC<WrongTokenProps> = ({}) => {
    return (
        <Wrapper>
            <Head>
                <title>Incorrect link • Spam</title>
            </Head>
            <Text fontSize="3xl" fontWeight="bold">
                Incorrect link
            </Text>
            <Text>The link that you used is either corrupted or incorect.</Text>
        </Wrapper>
    );
};

export default WrongToken;

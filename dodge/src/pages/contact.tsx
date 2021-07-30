import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import Head from "next/head";
import React from "react";
import { Wrapper } from "src/components/Wrapper";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
    return (
        <Wrapper variant="medium">
            <Head>
                <title>Contact • Spam</title>
            </Head>
            <NextLink href="/">
                <Text
                    py={2}
                    backgroundColor="white"
                    cursor="pointer"
                    mb={5}
                    fontSize="large"
                    fontWeight="semibold"
                    borderRadius={"0.4rem"}
                    color="gray.700"
                    _hover={{
                        color: "#000",
                        backgroundColor: "#F8F4F0",
                    }}
                >
                    <ChevronLeftIcon /> Go Back
                </Text>
            </NextLink>
            <Text fontSize="4xl" fontWeight="bold">
                Contact
            </Text>
            <Text fontSize="xl">
                Hi there, I{"'"}m Japroz Saini and I am the developer of Spam
                and manage all your data to make it secure against breaches and
                hacks.
                <br /> If you have any complaints or any feature suggestions,
                email me at{" "}
                <span style={{ fontWeight: 500 }}>sainijaproz@gmail.com</span>
            </Text>
        </Wrapper>
    );
};

export default Contact;

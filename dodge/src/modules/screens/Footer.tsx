import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";

interface FooterProps {}

export const Footer: React.FC<FooterProps> = ({}) => {
    return (
        <Box py={5} textAlign="center" backgroundColor="#111111">
            <Image src={logo} alt="Logo" width="100" height="100" />
            <Flex
                wrap="wrap"
                mt={1}
                justifyContent="center"
                alignItems="center"
            >
                <Text
                    transition={"all 0.05s ease"}
                    cursor="pointer"
                    _hover={{
                        color: "gray.500",
                    }}
                    color="gray.700"
                    fontWeight="semibold"
                    px={"3vw"}
                >
                    PRIVACY POLICY
                </Text>
                <Text
                    transition={"all 0.05s ease"}
                    cursor="pointer"
                    _hover={{
                        color: "gray.500",
                    }}
                    color="gray.700"
                    fontWeight="semibold"
                    px={"3vw"}
                >
                    TERMS {"&"} CONDITIONS
                </Text>
                <Text
                    transition={"all 0.05s ease"}
                    cursor="pointer"
                    _hover={{
                        color: "gray.500",
                    }}
                    color="gray.700"
                    fontWeight="semibold"
                    px={"3vw"}
                >
                    CONTACT
                </Text>
            </Flex>
            <Text mt={4} color="gray.600">
                © 2021 Japroz Saini, LLC All Rights Reserved.
            </Text>
        </Box>
    );
};

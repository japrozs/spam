import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { useRouter } from "next/router";

interface IndexNavProps {}

export const IndexNav: React.FC<IndexNavProps> = ({}) => {
    const router = useRouter();
    return (
        <Flex p={2} borderBottom={"1px solid #AAAAAA"} alignItems="center">
            <Box ml={2} width="50px" height="50px" cursor="pointer">
                <Image
                    onClick={() => {
                        router.push("/");
                    }}
                    src={logo}
                    alt="Logo"
                />
            </Box>
            <Flex ml={"auto"} mr={1} alignItems="center">
                <Text
                    transition="color 0.2s ease"
                    cursor="pointer"
                    mr={5}
                    fontWeight="semibold"
                    color="gray.500"
                    _hover={{
                        color: "#000",
                    }}
                >
                    Contact
                </Text>
                <Button variant="outline" color="#000" mr={5}>
                    Sign In
                </Button>
                <Button
                    _hover={{
                        backgroundColor: "#000",
                        color: "white",
                    }}
                    backgroundColor="#fff"
                    border={"1px solid #000"}
                >
                    Sign up
                </Button>
            </Flex>
        </Flex>
    );
};

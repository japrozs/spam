import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo.png";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface IndexNavProps {}

export const IndexNav: React.FC<IndexNavProps> = ({}) => {
    const router = useRouter();
    const [colored, setColored] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 1) {
                setColored(true);
            } else setColored(false);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            // window.removeEventListener('scroll');
            window.removeEventListener("scroll", handleScroll, {});
        };
    }, []);

    return (
        <Flex
            position={"sticky"}
            top="0"
            zIndex={"1000"}
            p={2}
            borderBottom={"1px solid lightgray"}
            alignItems="center"
            backgroundColor={colored ? "rgba(255, 255, 255, 0.94)" : "#fff"}
        >
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
                <NextLink href="/login">
                    <Button variant="outline" color="#000" mr={5}>
                        Sign In
                    </Button>
                </NextLink>
                <NextLink href="/register">
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
                </NextLink>
            </Flex>
        </Flex>
    );
};

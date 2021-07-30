import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../../public/logo_svg.svg";
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
            <Flex width="100px" alignItems="center" ml={2} cursor="pointer">
                <Image
                    onClick={() => {
                        router.push("/");
                    }}
                    src={logo}
                    alt="Logo"
                />
            </Flex>
            <Flex ml={"auto"} mr={1} alignItems="center">
                <NextLink href="/contact">
                    <Text
                        transition="color 0.2s ease"
                        cursor="pointer"
                        mr={5}
                        px={3}
                        py={2}
                        className="contact"
                        fontWeight="semibold"
                        borderRadius={"0.4rem"}
                        color="gray.500"
                        _hover={{
                            color: "#000",
                            backgroundColor: "#F8F4F0",
                        }}
                    >
                        Contact
                    </Text>
                </NextLink>
                <NextLink href="/login">
                    <Button
                        className="signin"
                        variant="outline"
                        color="#000"
                        mr={5}
                    >
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

import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { ChevronRightIcon } from "@chakra-ui/icons";

interface GetStartedProps {}

export const GetStarted: React.FC<GetStartedProps> = ({}) => {
    return (
        <Box className="get">
            <Text
                color={"#201626"}
                lineHeight={"65px"}
                fontWeight="bold"
                fontSize="6xl"
            >
                Get started
                <br /> for free today
            </Text>
            <NextLink href="/register">
                <Button
                    my={5}
                    color="#fff"
                    _hover={{
                        backgroundColor: "rgb(28, 28, 28)",
                    }}
                    className="start"
                    backgroundColor="#000"
                >
                    Get Started
                    <ChevronRightIcon ml={1} fontSize="xl" />
                </Button>
            </NextLink>
        </Box>
    );
};

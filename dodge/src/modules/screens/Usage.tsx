import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface UsageProps {}

export const Usage: React.FC<UsageProps> = ({}) => {
    return (
        <Box py={"50px"} backgroundColor={"#f0f0f0"}>
            <Flex className="usage" alignItems="center">
                <Box className="use" width="100%" maxW="330px">
                    <Text fontSize="4xl" fontWeight="bold">
                        Post easily
                    </Text>
                    <Text fontWeight="medium" fontSize="xl" color="#323232">
                        With a modern editor and a clean UI, you can get start
                        creating newslette- rs for your subscribers in no time
                    </Text>
                </Box>

                <Box className="use" width="100%" maxW="330px">
                    <Text fontSize="4xl" fontWeight="bold">
                        The plan for you
                    </Text>
                    <Text fontWeight="medium" fontSize="xl" color="#323232">
                        With a modern editor and a clean UI, you can get start
                        creating newslette- rs for your subscribers in no time
                    </Text>
                </Box>
                <Box className="use" width="100%" maxW="330px">
                    <Text fontSize="4xl" fontWeight="bold">
                        Organize people
                    </Text>
                    <Text fontWeight="medium" fontSize="xl" color="#323232">
                        With a modern editor and a clean UI, you can get start
                        creating newslette- rs for your subscribers in no time
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

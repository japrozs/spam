import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import hike from "../../../public/icons/hike.png";
import group from "../../../public/icons/group.png";
import lock from "../../../public/icons/lock.png";

interface UsageProps {}

export const Usage: React.FC<UsageProps> = ({}) => {
    return (
        <Box py={"50px"} backgroundColor={"#fff"}>
            <Flex className="usage" alignItems="stretch">
                <Box
                    textAlign="center"
                    className="use"
                    width="100%"
                    maxW="330px"
                >
                    <Box justifyContent="center" textAlign="center">
                        <Image width="60" height="60" src={lock} alt="Lock" />
                    </Box>
                    <Text fontSize="4xl" fontWeight="bold">
                        Security first
                    </Text>
                    <Text fontWeight="medium" fontSize="xl" color="#323232">
                        All your files are stored encrypted on the cloud, so no
                        one can access it even if someone breaks into our
                        systems
                    </Text>
                </Box>
                <Divider className="use_divider" />
                <Box
                    textAlign="center"
                    className="use"
                    width="100%"
                    maxW="330px"
                >
                    <Box justifyContent="center" textAlign="center">
                        <Image width="60" height="60" src={hike} alt="Lock" />
                    </Box>
                    <Text fontSize="4xl" fontWeight="bold">
                        The plan for you
                    </Text>
                    <Text fontWeight="medium" fontSize="xl" color="#323232">
                        You can create unlimited posts and then upgrade to a
                        paid version for more customization and extended
                        features
                    </Text>
                </Box>
                <Divider className="use_divider" />
                <Box
                    textAlign="center"
                    className="use"
                    width="100%"
                    maxW="330px"
                >
                    <Box justifyContent="center" textAlign="center">
                        <Image width="60" height="60" src={group} alt="Lock" />
                    </Box>
                    <Text fontSize="4xl" fontWeight="bold">
                        Organize people
                    </Text>
                    <Text fontWeight="medium" fontSize="xl" color="#323232">
                        With groups functionality, organize your recipients into
                        groups so only the group you choose gets the post that
                        you send.
                    </Text>
                </Box>
            </Flex>
        </Box>
    );
};

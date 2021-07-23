import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

interface UserlistProps {
    name: string;
    email: string;
    createdAt: Date;
}

export const Userlist: React.FC<UserlistProps> = ({
    name,
    email,
    createdAt,
}) => {
    return (
        <Box
            backgroundColor={"gray.200"}
            p={0}
            width="300px"
            borderRadius={"0.2rem"}
        >
            <Box p={4}>
                <Text fontWeight="medium">{name}</Text>
                <Text fontWeight="medium">{email}</Text>
                <Text>
                    <span style={{ color: "gray" }}>Joined</span>{" "}
                    {dayjs(createdAt).fromNow()}
                </Text>
            </Box>
        </Box>
    );
};

import { Box, Heading, Text, Divider } from "@chakra-ui/react";
import React from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { truncate } from "../utils/truncate";
import { msToDate } from "../utils/msToDate";
import { times } from "../utils/times";
dayjs.extend(relativeTime);

interface UserlistProps {
    name: string;
    email: string;
    createdAt: Date;
    length: number;
}

export const Userlist: React.FC<UserlistProps> = ({
    name,
    email,
    createdAt,
    length,
}) => {
    return (
        <Box
            style={{
                position: "sticky",
                top: "100px;",
            }}
            borderRadius={"0.2rem"}
            width="300px"
            border="1px solid lightgray"
        >
            <Box
                borderTopRadius={"0.2rem"}
                // backgroundColor={"gray.100"}
                py={2}
                px={4}
            >
                <Text fontSize="24px" fontWeight="semibold">
                    User Info
                </Text>
            </Box>
            <Box py={2} px={4}>
                <Text fontSize="20px" fontWeight="semibold">
                    <span
                        dangerouslySetInnerHTML={{ __html: times("&nbsp;", 3) }}
                    ></span>
                    <span style={{ color: "#909090" }}>Name</span>
                    <span
                        dangerouslySetInnerHTML={{ __html: times("&emsp;", 2) }}
                    ></span>
                    <span>{truncate(name, 14)}</span>
                </Text>
                <Text fontSize="20px" fontWeight="semibold">
                    <span
                        dangerouslySetInnerHTML={{ __html: times("&nbsp;", 3) }}
                    ></span>
                    <span style={{ color: "#909090" }}>Email</span>
                    <span
                        dangerouslySetInnerHTML={{ __html: times("&emsp;", 2) }}
                    ></span>
                    <span>{truncate(email, 14)}</span>
                </Text>
                <Text fontSize="20px" fontWeight="semibold">
                    <span style={{ color: "#909090" }}>Joined</span>
                    <span
                        dangerouslySetInnerHTML={{ __html: times("&emsp;", 2) }}
                    ></span>
                    <span>{createdAt.toLocaleDateString()}</span>
                </Text>
            </Box>
            <Box
                borderBottomRadius={"0.2rem"}
                // backgroundColor={"gray.100"}
                py={2}
                px={4}
            >
                <Text fontSize="18px">
                    You have created{" "}
                    <span style={{ color: "#1B153A", fontWeight: 600 }}>
                        {length} stories
                    </span>{" "}
                    so far
                </Text>
            </Box>
        </Box>
    );
};

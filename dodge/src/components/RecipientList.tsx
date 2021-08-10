import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React, { useState } from "react";
import { useGetPostsQuery } from "../generated/graphql";
import { genRecipientList } from "../utils/genRecipientList";
import { EmailIcon } from "@chakra-ui/icons";

interface RecipientListProps {}

export const RecipientList: React.FC<RecipientListProps> = ({}) => {
    const [{ data, fetching }] = useGetPostsQuery();
    return (
        <Box
            width={"23vw"}
            borderLeft={"1px solid lightgray"}
            px={5}
            style={{
                position: "sticky",
                top: "100px",
            }}
            textAlign="left"
        >
            <Text fontSize="xl" fontWeight="semibold">
                All Recipients
            </Text>
            <Divider my={2} />
            {fetching && (
                <Spinner
                    position={"relative"}
                    top={"50"}
                    left={"100"}
                    color="gray.600"
                />
            )}
            {data &&
                genRecipientList(data.getPosts).map((a) => (
                    <Flex key={a.id} alignItems="center">
                        <EmailIcon key={a.id} color="gray.400" mr={2} />
                        <Text
                            key={a.id}
                            color="gray.600"
                            py={0.5}
                            px={2}
                            borderRadius={"0.4rem"}
                            _hover={{
                                color: "gray.800",
                                backgroundColor: "#F8F4F0",
                            }}
                            fontWeight="medium"
                        >
                            {a.email}
                        </Text>
                    </Flex>
                ))}
            {data && genRecipientList(data.getPosts).length == 0 && (
                <Text color="gray.500" fontWeight="medium">
                    You have not sent any newsletters to anyone
                </Text>
            )}
        </Box>
    );
};

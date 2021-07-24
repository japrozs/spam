import { Box, Divider, Text } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import React, { useState } from "react";
import { useGetPostsQuery } from "../generated/graphql";
import { genRecipientList } from "../utils/genRecipientList";

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
                    <Text
                        color="gray.600"
                        _hover={{
                            color: "gray.800",
                        }}
                        fontWeight="medium"
                        key={a.id}
                    >
                        {a.email}
                    </Text>
                ))}
            {data && genRecipientList(data.getPosts).length == 0 && (
                <Text fontWeight="medium">You havent sent any newsletters</Text>
            )}
        </Box>
    );
};

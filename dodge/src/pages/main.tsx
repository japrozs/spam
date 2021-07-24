import { Box, Flex, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Card } from "../components/Card";
import { GroupList } from "../components/GroupList";
import { Navbar } from "../components/Navbar";
import { useGetPostsQuery, useGetGroupsQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { createUrqlClient } from "../utils/createUrqlClient";
import { RecipientList } from "../components/RecipientList";
import { Spinner } from "@chakra-ui/spinner";

interface mainProps {}

const Main: React.FC<mainProps> = ({}) => {
    useIsAuth();
    const [{ data, fetching }] = useGetPostsQuery();
    const [{ data: d, fetching: f }] = useGetGroupsQuery();
    console.log(d);
    return (
        <Box>
            <Navbar />
            <Box>
                <Flex justifyContent="center" justifyItems="center">
                    <Box mr={"3vw"}>
                        <GroupList />
                    </Box>
                    <Box margin={0} padding={0}>
                        <Text mb={3} fontWeight="semibold" fontSize="4xl">
                            😃 Your Newsletters
                        </Text>
                        {data &&
                            data.getPosts.map((post) => (
                                <Card
                                    key={post.id}
                                    subject={post.title}
                                    body={post.body}
                                    receivers={post.receivers}
                                    createdAt={post.createdAt}
                                />
                            ))}
                        {fetching && (
                            <Spinner
                                position={"relative"}
                                top={"50"}
                                left={"100"}
                                color="gray.600"
                            />
                        )}
                    </Box>
                    <Box ml={"auto"} mr={"30px"}>
                        <RecipientList />
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
};

export default withUrqlClient(createUrqlClient)(Main);

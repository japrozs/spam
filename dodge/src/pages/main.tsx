import { Box, Flex } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Card } from "../components/Card";
import { Navbar } from "../components/Navbar";
import { Userlist } from "../components/Userlist";
import { useGetPostsQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { createUrqlClient } from "../utils/createUrqlClient";

interface mainProps {}

const Main: React.FC<mainProps> = ({}) => {
    useIsAuth();
    const [{ data, fetching }] = useGetPostsQuery();
    return (
        <Box>
            <Navbar />
            <Flex pl={10}>
                <Box margin={0} padding={0}>
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
                    {/* <Card
                        subject="How to react.js with Next.js"
                        body="In this tutorial we are going to learn how can you make your website very SEO friendly using Next.js . Next.js is just a superset of a React.js with better production level features."
                        receivers={[
                            "ben@ben.com",
                            "sainijaproz@gmail.com",
                            "a@b.com",
                        ]}
                    /> */}
                </Box>
                <Box ml={"auto"} mr={4}>
                    <Userlist
                        name="Japroz Saini"
                        email="sainijaproz@gmail.com"
                        createdAt={new Date()}
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default withUrqlClient(createUrqlClient)(Main);

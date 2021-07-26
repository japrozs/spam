import { Text, Box, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { useGetPostsQuery } from "../generated/graphql";
import { searchPost } from "../utils/searchPost";
import { Spinner } from "@chakra-ui/spinner";
import { useMediaQuery } from "react-responsive";
import { useScreenType } from "../hooks/useScreenType";
import { Layout } from "./Layout";

interface MainLayoutProps {}

export const MiddleSection: React.FC<MainLayoutProps> = ({}) => {
    const [{ data, fetching }] = useGetPostsQuery();
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <Box margin={0} padding={0}>
            <Text mb={3} fontWeight="semibold" fontSize="4xl">
                😃 Your Newsletters
            </Text>
            <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fontWeight="semibold"
                mb={3}
                mt={2}
                width={"97%"}
                placeholder="Find a group"
            />
            {data &&
                searchQuery.length == 0 &&
                data.getPosts.map((post) => (
                    <Card
                        key={post.id}
                        subject={post.title}
                        body={post.body}
                        receivers={post.receivers}
                        createdAt={post.createdAt}
                        id={post.id}
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
            {data && data.getPosts.length == 0 && (
                <Text color="gray.500" fontWeight="medium">
                    You don{"'"}t have any posts
                </Text>
            )}
            {data &&
                searchQuery.length != 0 &&
                searchPost(searchQuery, data).map((post) => (
                    <Card
                        key={post.id}
                        subject={post.title}
                        body={post.body}
                        receivers={post.receivers}
                        createdAt={post.createdAt}
                        id={post.id}
                    />
                ))}
        </Box>
    );
};

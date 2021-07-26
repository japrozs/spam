import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { Card } from "../components/Card";
import { GroupList } from "../components/GroupList";
import { Navbar } from "../components/Navbar";
import { useGetPostsQuery, useGetGroupsQuery } from "../generated/graphql";
import { useIsAuth } from "../hooks/useIsAuth";
import { createUrqlClient } from "../utils/createUrqlClient";
import { RecipientList } from "../components/RecipientList";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";
import Head from "next/head";
import { searchPost } from "../utils/searchPost";
import { useScreenType } from "../hooks/useScreenType";
import { MiddleSection } from "../layouts/MiddleSection";
import { Layout } from "../layouts/Layout";

interface mainProps {}

const Main: React.FC<mainProps> = ({}) => {
    useIsAuth();
    const [{ data: d, fetching: f }] = useGetGroupsQuery();

    return (
        <Box>
            <Head>
                <title>Dashboard • Spam</title>
            </Head>
            <Navbar />
            <Flex wrap="wrap" justifyContent="center" justifyItems="center">
                <Box mr={"3vw"}>
                    <GroupList />
                </Box>
                <MiddleSection />
                <Box ml={"auto"} mr={"30px"}>
                    <RecipientList />
                </Box>
            </Flex>
        </Box>
    );
};

export default withUrqlClient(createUrqlClient)(Main);

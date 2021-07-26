import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import { GroupList } from "../components/GroupList";
import { Navbar } from "../components/Navbar";
import { RecipientList } from "../components/RecipientList";
import { useScreenType } from "../hooks/useScreenType";
import { MiddleSection } from "./MiddleSection";

interface LayoutProps {}

export const Layout: React.FC<LayoutProps> = ({}) => {
    const layout = useScreenType();
    console.log(layout);
    let Data;
    if (layout == "3-cols" || layout == "fullscreen") {
        Data = (
            <Flex wrap="wrap" justifyContent="center" justifyItems="center">
                <Box mr={"3vw"}>
                    <GroupList />
                </Box>
                <MiddleSection />
                <Box ml={"auto"} mr={"30px"}>
                    <RecipientList />
                </Box>
            </Flex>
        );
    } else if (layout == "2-cols") {
        Data = (
            <Flex justifyContent="center" justifyItems="center">
                <Box mr={"3vw"}>
                    <GroupList />
                </Box>
                <MiddleSection />
            </Flex>
        );
    } else if (layout == "1-cols") {
        Data = (
            <Box>
                <MiddleSection />
            </Box>
        );
    }
    return (
        <Box>
            <Head>
                <title>Dashboard • Spam</title>
            </Head>
            <Navbar />
            <Box>{Data}</Box>
        </Box>
    );
};

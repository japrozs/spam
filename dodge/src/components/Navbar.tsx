import { AlertDescription } from "@chakra-ui/core";
import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import logo from "../../public/logo.png";
import { useRouter } from "next/router";
import { truncate } from "../utils/truncate";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();

    return (
        <Flex className="nav" p={2} mb={5} alignItems="center">
            {data && data.me != null && (
                <>
                    <Box
                        ml={8}
                        className="nav_icon"
                        width="50px"
                        height="50px"
                        cursor="pointer"
                    >
                        <Image
                            onClick={() => {
                                router.push("/main");
                            }}
                            src={logo}
                            alt="Logo"
                        />
                    </Box>
                    <Flex ml={"auto"} mr={"20px"} alignItems="center">
                        <Box mr={5}>
                            <Menu>
                                {/* <AddIcon /> */}
                                <MenuButton
                                    backgroundColor="white"
                                    as={Button}
                                    variant="solid"
                                    border="1px solid lightgray"
                                >
                                    <AddIcon />
                                </MenuButton>
                                <MenuList>
                                    <NextLink href="/create-post">
                                        <MenuItem fontWeight="medium">
                                            New Post
                                        </MenuItem>
                                    </NextLink>
                                    <NextLink href="/create-group">
                                        <MenuItem fontWeight="medium">
                                            New Group
                                        </MenuItem>
                                    </NextLink>
                                </MenuList>
                            </Menu>
                        </Box>
                        <Box>
                            <Menu>
                                <MenuButton
                                    backgroundColor="white"
                                    variant="solid"
                                    border="1px solid lightgray"
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {truncate(data?.me.name, 18)}
                                </MenuButton>
                                <MenuList>
                                    <NextLink href="/pref">
                                        <MenuItem fontWeight="medium">
                                            Settings
                                        </MenuItem>
                                    </NextLink>
                                    <MenuDivider />
                                    <MenuItem
                                        fontWeight="medium"
                                        color={"red.500"}
                                        onClick={() => {
                                            logout();
                                            router.push("/");
                                        }}
                                    >
                                        Log out
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>
                    </Flex>
                </>
            )}
        </Flex>
    );
};

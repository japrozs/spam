import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { AddIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuIcon,
    MenuCommand,
    MenuDivider,
} from "@chakra-ui/react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <Flex className="nav" p={2} mb={5} alignItems="center">
            <Heading pl={8} fontSize="3xl">
                Spam
            </Heading>
            <Flex ml={"auto"} mr={1} alignItems="center">
                <Box mr={5}>
                    <Menu>
                        {/* <AddIcon /> */}
                        <MenuButton
                            as={Button}
                            variant="solid"
                            border="1px solid lightgray"
                        >
                            <AddIcon />
                        </MenuButton>
                        <MenuList>
                            <NextLink href="/create-post">
                                <MenuItem>New Post</MenuItem>
                            </NextLink>
                        </MenuList>
                    </Menu>
                </Box>
                <Box>
                    <Menu>
                        <MenuButton
                            variant="solid"
                            border="1px solid lightgray"
                            as={Button}
                        >
                            ben@ben.com
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Settings</MenuItem>
                            <MenuDivider />
                            <MenuItem color={"red.500"}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
        </Flex>
    );
};

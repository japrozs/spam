import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
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
import Image from "next/image";
import logo from "../public/logo.png";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
    return (
        <Flex className="nav" p={2} mb={5} alignItems="center">
            <Box ml={8} width="50px" height="50px">
                <Image src={logo} alt="Logo" />
            </Box>
            <Flex ml={"auto"} mr={"20px"} alignItems="center">
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
                            rightIcon={<ChevronDownIcon />}
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

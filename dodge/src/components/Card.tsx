import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { generateReceiverList } from "../utils/generateReceiverList";
import { truncate } from "../utils/truncate";
import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
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
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { msToDate } from "../utils/msToDate";
import NextLink from "next/link";
import { useDeletePostMutation } from "../generated/graphql";
import Router from "next/router";

dayjs.extend(relativeTime);

interface CardProps {
    subject: string;
    body: string;
    receivers: string[];
    createdAt: string;
    id: number;
}

export const Card: React.FC<CardProps> = ({
    subject,
    body,
    receivers,
    createdAt,
    id,
}) => {
    const router = useRouter();
    const [, deletePost] = useDeletePostMutation();
    return (
        <Box
            borderRadius="0.2rem"
            border="1px solid #ADACAC"
            width="47vw"
            mr={5}
            mb={5}
            className="card"
            p={5}
            backgroundColor="#fff"
            _hover={{
                backgroundColor: "rgb(247, 247, 247)",
            }}
        >
            <Flex alignItems="center">
                <Flex alignItems="center">
                    {subject.length == 0 ? (
                        <Text
                            color="gray"
                            fontFamily="Lora"
                            fontWeight="semibold"
                            fontSize="35px"
                            onClick={() => {
                                router.push(`/p/${id}`);
                            }}
                            cursor="pointer"
                        >
                            No subject
                        </Text>
                    ) : (
                        <Text
                            cursor="pointer"
                            fontFamily="Lora"
                            fontWeight="semibold"
                            fontSize="35px"
                            onClick={() => {
                                router.push(`/p/${id}`);
                            }}
                        >
                            {truncate(subject, 13)}
                        </Text>
                    )}
                    <Text color="#909090" px={3} fontSize="3xl">
                        •
                    </Text>
                    <Text color="#909090" fontWeight="semibold" fontSize="20px">
                        {dayjs(msToDate(createdAt)).fromNow()}
                    </Text>
                </Flex>
                <Box ml={"auto"} mr={1}>
                    <Menu>
                        <MenuButton
                            variant="solid"
                            border="1px solid lightgray"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <SettingsIcon fontSize="large" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                fontWeight="semibold"
                                onClick={async () => {
                                    deletePost({
                                        id,
                                    });
                                    Router.reload();
                                }}
                            >
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
            {body.length == 0 ? (
                <Text
                    onClick={() => {
                        router.push(`/p/${id}`);
                    }}
                    fontFamily="Lora"
                    color="gray.500"
                    fontSize="xl"
                    cursor="pointer"
                >
                    No body
                </Text>
            ) : (
                <Text
                    fontFamily="Lora"
                    fontSize="xl"
                    cursor="pointer"
                    color="#353434"
                    onClick={() => {
                        router.push(`/p/${id}`);
                    }}
                >
                    {truncate(body.replace(/(<([^>]+)>)/gi, ""), 84)}
                </Text>
            )}

            <Text
                fontWeight="semibold"
                color="gray.500"
                dangerouslySetInnerHTML={{
                    __html: generateReceiverList(receivers),
                }}
            ></Text>
        </Box>
    );
};

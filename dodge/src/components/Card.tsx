import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { generateReceiverList } from "../utils/generateReceiverList";
import { truncate } from "../utils/truncate";
import { ChevronDownIcon, SettingsIcon } from "@chakra-ui/icons";
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

dayjs.extend(relativeTime);

interface CardProps {
    subject: string;
    body: string;
    receivers: string[];
    createdAt: string;
}

export const Card: React.FC<CardProps> = ({
    subject,
    body,
    receivers,
    createdAt,
}) => {
    return (
        <Box
            borderRadius="0.2rem"
            border="1px solid #ADACAC"
            width="700px"
            mr={5}
            mb={5}
            className="card"
            cursor="pointer"
            p={5}
            backgroundColor="#EDEFF1"
            _hover={{
                backgroundColor: "#F8F9FB",
            }}
        >
            <Flex alignItems="center">
                <Flex alignItems="center">
                    {subject.length == 0 ? (
                        <Text
                            color="gray"
                            fontWeight="semibold"
                            fontSize="35px"
                        >
                            No subject
                        </Text>
                    ) : (
                        <Text fontWeight="semibold" fontSize="35px">
                            {truncate(subject, 30)}
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
                            <MenuItem>Delete</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </Flex>
            {body.length == 0 ? (
                <Text color="gray.500" fontSize="xl">
                    No body
                </Text>
            ) : (
                <Text fontSize="xl" color="#353434">
                    {truncate(body.replace(/(<([^>]+)>)/gi, ""), 150)}
                </Text>
            )}

            <Text
                fontWeight="semibold"
                color="#909090"
                dangerouslySetInnerHTML={{
                    __html: generateReceiverList(receivers),
                }}
            ></Text>
        </Box>
    );
};

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
            width="700px"
            mr={5}
            mb={5}
            className="card"
            p={5}
            backgroundColor="gray.100"
        >
            <Flex alignItems="center">
                <Flex alignItems="center">
                    {subject.length == 0 ? (
                        <Text color="gray" fontWeight="bold" fontSize="3xl">
                            No subject
                        </Text>
                    ) : (
                        <Text fontWeight="bold" fontSize="3xl">
                            {truncate(subject, 30)}
                        </Text>
                    )}
                    <Text color="gray.600" px={3} fontSize="3xl">
                        •
                    </Text>
                    <Text color="gray.500" fontSize="large">
                        {dayjs(msToDate(createdAt)).fromNow()}
                    </Text>
                </Flex>
                <Box ml={"auto"} mr={1}>
                    <Menu>
                        <MenuButton
                            variant="solid"
                            border="1px solid lightgray"
                            as={Button}
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
                <Text fontSize="xl" color="gray.500">
                    {truncate(body, 150)}
                </Text>
            )}

            <Text>{truncate(generateReceiverList(receivers), 150)}</Text>
        </Box>
    );
};

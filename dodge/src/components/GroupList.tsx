import { Box, Flex, Button, Text, Input, Divider } from "@chakra-ui/react";
import React from "react";
import { useGetGroupsQuery } from "../generated/graphql";
import { Spinner } from "@chakra-ui/spinner";
import NextLink from "next/link";

interface GroupListProps {}

export const GroupList: React.FC<GroupListProps> = ({}) => {
    const [{ data, fetching }] = useGetGroupsQuery();
    return (
        <Box
            width={"23vw"}
            // height={"100vh"}
            borderRight={"1px solid lightgray"}
            px={5}
            style={{
                position: "sticky",
                top: "100px",
            }}
        >
            <Flex alignItems="center">
                <Text fontSize="xl" fontWeight="semibold">
                    Your Groups
                </Text>
                <NextLink href="/create-group">
                    <Button ml={"auto"} mr={2}>
                        New
                    </Button>
                </NextLink>
            </Flex>
            <Divider my={2} />
            <Input
                fontWeight="semibold"
                mb={3}
                mt={2}
                placeholder="Find a group"
            />
            {fetching && (
                <Spinner
                    position={"relative"}
                    top={"50"}
                    left={"100"}
                    color="gray.600"
                />
            )}
            {data &&
                data.getGroups.map((grp) => (
                    <NextLink key={grp.id} href={`/grp/${grp.id}`}>
                        <Flex alignItems="center">
                            <Text
                                cursor="pointer"
                                color="gray.600"
                                _hover={{
                                    color: "gray.800",
                                }}
                                fontSize="medium"
                                pl={1}
                                mt={1}
                                fontWeight="semibold"
                            >
                                {grp.name}
                            </Text>
                            <Text color="gray" ml={"auto"} mr={"1px"}>
                                {grp.emails.length} members
                            </Text>
                        </Flex>
                    </NextLink>
                ))}
        </Box>
    );
};

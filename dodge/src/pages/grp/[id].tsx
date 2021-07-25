import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import { Wrapper } from "../../components/Wrapper";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useRouter } from "next/router";
import {
    useDeleteGroupMutation,
    useGetGroupQuery,
} from "../../generated/graphql";
import NextLink from "next/link";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/spinner";
import Head from "next/head";

interface GrpProps {}

const Grp: React.FC<GrpProps> = ({}) => {
    const router = useRouter();
    const intId =
        typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
    const [{ data, fetching }] = useGetGroupQuery({
        variables: {
            id: intId,
        },
    });
    const ems = [];
    const [, deleteGroup] = useDeleteGroupMutation();
    for (let i = 0; i < data?.getGroup.emails.length; i++) {
        ems.push({ email: data?.getGroup.emails[i], key: i });
    }
    return (
        <Box>
            <Wrapper variant="medium">
                {data && (
                    <>
                        <Head>
                            <title>{data.getGroup.name} group • Spam</title>
                        </Head>
                        <NextLink href="/main">
                            <Text
                                cursor="pointer"
                                color="gray.700"
                                mb={5}
                                fontSize="large"
                                fontWeight="medium"
                            >
                                <ChevronLeftIcon /> Go Back
                            </Text>
                        </NextLink>
                        <Flex>
                            <Text fontWeight="semibold" fontSize="3xl">
                                {data.getGroup.name}
                            </Text>
                            <Button
                                onClick={async () => {
                                    const id =
                                        typeof router.query.id == "string"
                                            ? parseInt(router.query.id)
                                            : -1;
                                    deleteGroup({
                                        id,
                                    });
                                    router.push("/main");
                                }}
                                variant="outline"
                                ml={"auto"}
                                mr={"5px"}
                            >
                                Delete group
                            </Button>
                        </Flex>
                        <Text
                            color="gray"
                            fontSize="large"
                            fontWeight="medium"
                            mt={2}
                        >
                            Recipients
                        </Text>
                        {ems.map((em) => (
                            <Text my={1} fontWeight="medium" key={em.key}>
                                {em.email}
                            </Text>
                        ))}
                    </>
                )}
                {fetching && (
                    <Spinner
                        position={"absolute"}
                        top={"50%"}
                        left={"50%"}
                        color="gray.600"
                    />
                )}
            </Wrapper>
        </Box>
    );
};

export default withUrqlClient(createUrqlClient)(Grp);

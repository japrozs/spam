import { Box, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "../../components/Wrapper";
import { useGetPostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Spinner } from "@chakra-ui/spinner";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import NextLink from "next/link";
import { msToDate } from "../../utils/msToDate";
import { generateReceiverList } from "../../utils/generateReceiverList";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import Head from "next/head";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
    const router = useRouter();
    const id =
        typeof router.query.id == "string" ? parseInt(router.query.id) : -1;
    const [{ data, fetching }] = useGetPostQuery({
        variables: {
            id,
        },
    });
    return (
        <Wrapper variant="medium">
            {data && (
                <Box>
                    <Head>
                        <title>{data.getPost.title} • Spam</title>
                    </Head>
                    <NextLink href="/main">
                        <Text
                            width={"100%"}
                            py={2}
                            position="sticky"
                            top="0"
                            backgroundColor="white"
                            cursor="pointer"
                            color="gray.700"
                            mb={5}
                            fontSize="large"
                            fontWeight="medium"
                        >
                            <ChevronLeftIcon /> Go Back
                        </Text>
                    </NextLink>
                    <Text fontSize="4xl" fontWeight="semibold">
                        {data.getPost.title}
                    </Text>
                    {data.getPost.body.length == 0 ? (
                        <Text fontFamily="Lora" color="gray.500" fontSize="xl">
                            No body
                        </Text>
                    ) : (
                        <Text
                            fontFamily="Lora"
                            fontSize="xl"
                            className="post_body"
                            color="#353434"
                            dangerouslySetInnerHTML={{
                                __html: data.getPost.body,
                            }}
                        ></Text>
                    )}
                    <Text
                        my={10}
                        fontSize="xl"
                        fontWeight="semibold"
                        color="gray.500"
                        dangerouslySetInnerHTML={{
                            __html: generateReceiverList(
                                data.getPost.receivers
                            ),
                        }}
                    ></Text>
                </Box>
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
    );
};

export default withUrqlClient(createUrqlClient)(Post);

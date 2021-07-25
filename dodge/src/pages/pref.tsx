import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Wrapper } from "../components/Wrapper";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Head from "next/head";

interface PrefProps {}

const Pref: React.FC<PrefProps> = ({}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [{ data, fetching }] = useMeQuery();
    const [email, setEmail] = useState("");

    const deleteAccount = () => {};

    return (
        <Wrapper variant="medium">
            <Head>
                <title>Preferences • Spam</title>
            </Head>
            {data && (
                <Box m={2}>
                    <NextLink href="/main">
                        <Text
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
                    <Text mb={3} fontWeight="semibold" fontSize="4xl">
                        😃 Preferences
                    </Text>
                    <Text fontWeight="semibold" mb={1} fontSize="xl">
                        Email
                    </Text>
                    <Box
                        mb={5}
                        fontWeight="semibold"
                        fontSize="large"
                        borderRadius={"0.2rem"}
                        p={2}
                        color="gray.700"
                        backgroundColor={"gray.200"}
                    >
                        {data.me.email}
                    </Box>
                    <Text fontWeight="semibold" mb={1} fontSize="xl">
                        Name
                    </Text>
                    <Input
                        fontWeight="semibold"
                        fontSize="large"
                        borderRadius={"0.2rem"}
                        p={2}
                        value={data.me.name}
                        color="gray.700"
                        backgroundColor={"gray.200"}
                    />
                    <Button variant="outline" onClick={onOpen} mt={10}>
                        Delete account
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete account?</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody fontWeight="medium">
                                Once you delete your account, there{"'"}s no
                                going back. Make sure you want to do this by
                                entering your email below:
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    mt={2}
                                    placeholder={data.me.email}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    colorScheme="gray"
                                    mr={3}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="outline"
                                    disabled={email !== data.me.email}
                                    onClick={deleteAccount}
                                >
                                    Yes, delete account
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
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

export default withUrqlClient(createUrqlClient)(Pref);

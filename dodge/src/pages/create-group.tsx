import { useState } from "react";
import { Box, Button, Flex, FormLabel, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { EditorField } from "../components/EditorField";
import {
    useCreateGroupMutation,
    useCreatePostMutation,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../hooks/useIsAuth";
import { Wrapper } from "../components/Wrapper";
import { TextField } from "../components/TextField";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Editor } from "@tinymce/tinymce-react";
import { extractEmails } from "../utils/extractEmails";
import NextLink from "next/link";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Meta } from "../components/Meta";

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createGroup] = useCreateGroupMutation();
    const [body, setBody] = useState("");

    const handleEditorChange = (e) => {
        // console.log("Content was updated:", e.target.getContent());
        setBody(e.target.getContent());
    };

    return (
        <>
            <Navbar />
            <Wrapper variant="regular">
                <Head>
                    <title>Create New Group • Spam</title>
                    <Meta
                        title="Create your own mailing group"
                        description="Create your own mailing group • Spam • Publish your thoughts to other peoples inbox"
                    />
                </Head>
                <Formik
                    initialValues={{
                        name: "",
                        receivers: "",
                    }}
                    onSubmit={async (values) => {
                        const emails = extractEmails(values.receivers);
                        // console.log("Name : ", values.name);
                        // console.log("Recipients : ", emails);
                        const { error } = await createGroup({
                            input: {
                                name: values.name,
                                emails: emails,
                            },
                        });
                        if (!error) {
                            router.push("/main");
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <EditorField
                                name="name"
                                placeholder="Name"
                                label="Name"
                            />
                            <Box mt={4}>
                                <EditorField
                                    name="receivers"
                                    placeholder="johndoe@gmail.com, janedo@gmail.com, abc@gmail.com"
                                    label="Receivers (seperated by commas)"
                                />
                            </Box>
                            <Flex>
                                <Button
                                    mt={4}
                                    mb={4}
                                    variant="solid"
                                    border="1px solid lightgray"
                                    type="submit"
                                    colorScheme="gray"
                                    isLoading={isSubmitting}
                                >
                                    Create Group
                                </Button>
                                <Button
                                    ml={"auto"}
                                    mr={0}
                                    mt={10}
                                    onClick={() => {
                                        router.push("/main");
                                    }}
                                    mb={20}
                                    variant="solid"
                                    border="1px solid lightgray"
                                    color="red.500"
                                >
                                    Cancel
                                </Button>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    );
};
export default withUrqlClient(createUrqlClient)(CreatePost);

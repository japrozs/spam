import { useState } from "react";
import { Box, Button, Divider, Flex, FormLabel, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { EditorField } from "../components/EditorField";
import {
    Group,
    useCreatePostMutation,
    useGetGroupsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../hooks/useIsAuth";
import { Wrapper } from "../components/Wrapper";
import { TextField } from "../components/TextField";
import { ChevronLeftIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Editor } from "@tinymce/tinymce-react";
import { extractEmails } from "../utils/extractEmails";
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
import { Select } from "@chakra-ui/react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import { Meta } from "../components/Meta";
import { parse } from "node-html-parser";
import { addStyles } from "../utils/addStyles";

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    const [{ data, fetching }] = useGetGroupsQuery();
    const [body, setBody] = useState("<p>Once upon a time ...</p>");
    const [group, setGroup] = useState("");

    console.log();

    const handleEditorChange = (e) => {
        // console.log("Content was updated:", e.target.getContent());
        setBody(e.target.getContent());
    };

    const extract = (name: string) => {
        if (data) {
            return data.getGroups.filter((grp) => grp.name == name)[0].emails;
        } else {
            return [];
        }
    };

    return (
        <>
            <Navbar />
            <Wrapper variant="regular">
                <Head>
                    <title>Create New Post • Spam</title>
                    <Meta
                        title="Create a new post"
                        description="Create a new post • Spam • Publish your thoughts to other peoples inbox"
                    />
                </Head>
                {data && (
                    <Formik
                        initialValues={{
                            group: "",
                            receivers: "",
                            title: "",
                        }}
                        onSubmit={async (values) => {
                            let emails;
                            if (values.receivers.trim().length > 0) {
                                emails = extractEmails(values.receivers);
                            } else {
                                emails = extract(group);
                            }
                            // console.log("title : ", values.title);
                            // console.log("body : ", body);
                            // console.log("Recipients : ", emails);
                            const bodyWithStyles = addStyles(body);
                            setBody(bodyWithStyles);
                            console.log(body);
                            if (body.trim().length == 0) {
                                alert("The content body cannot be empty!");
                                return;
                            }
                            const { error } = await createPost({
                                input: {
                                    title: values.title,
                                    body: body,
                                    receivers: emails,
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
                                    name="title"
                                    placeholder="Title"
                                    label="Title"
                                />
                                {/* <Box mt={4}>
                            <TextField
                                name="body"
                                placeholder="Body..."
                                label="Body"
                            />
                        </Box> */}
                                <Box mt={4}>
                                    <FormLabel
                                        fontSize="xl"
                                        fontWeight="bold"
                                        htmlFor={"Content"}
                                    >
                                        Content
                                    </FormLabel>
                                    <Editor
                                        apiKey={
                                            process.env
                                                .NEXT_PUBLIC_TINYMCE_API_KEY
                                        }
                                        initialValue="<p>Once upon a time ...</p>"
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                "advlist autolink lists link image",
                                                "charmap print preview anchor help",
                                                "searchreplace visualblocks codDont forget to e",
                                                "insertdatetime media table paste wordcount",
                                            ],
                                            toolbar:
                                                "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
                                            content_style:
                                                "a { color : pink !important;}",
                                        }}
                                        onChange={handleEditorChange}
                                    />
                                </Box>
                                <Box mt={4}>
                                    <Text
                                        fontSize="xl"
                                        mb={2}
                                        fontWeight="semibold"
                                    >
                                        Recipients
                                    </Text>
                                    {data.getGroups.length != 0 && (
                                        <Select
                                            name="group"
                                            value={group}
                                            onChange={(e) => {
                                                setGroup(e.target.value);
                                            }}
                                            fontWeight="semibold"
                                            placeholder="Select group"
                                        >
                                            {data &&
                                                data.getGroups.map((grp) => (
                                                    <option
                                                        key={grp.id}
                                                        value={grp.name}
                                                    >
                                                        {grp.name}
                                                    </option>
                                                ))}
                                        </Select>
                                    )}
                                    {data.getGroups.length == 0 && (
                                        <Box mt={4}>
                                            <EditorField
                                                name="receivers"
                                                placeholder="johndoe@gmail.com, janedo@gmail.com, abc@gmail.com"
                                                label="Receivers (seperated by commas)"
                                            />
                                        </Box>
                                    )}
                                </Box>
                                <Divider my={2} />
                                <Flex>
                                    <Button
                                        mt={10}
                                        mb={20}
                                        variant="solid"
                                        border="1px solid lightgray"
                                        type="submit"
                                        colorScheme="gray"
                                        isLoading={isSubmitting}
                                    >
                                        Create Post
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
                )}
            </Wrapper>
        </>
    );
};
export default withUrqlClient(createUrqlClient)(CreatePost);

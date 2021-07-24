import { useState } from "react";
import { Box, Button, FormLabel, Text } from "@chakra-ui/react";
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

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    const [{ data, fetching }] = useGetGroupsQuery();
    const [body, setBody] = useState("");

    const handleEditorChange = (e) => {
        // console.log("Content was updated:", e.target.getContent());
        setBody(e.target.getContent());
    };

    return (
        <Wrapper variant="regular">
            <NextLink href="/">
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
            <Formik
                initialValues={{
                    title: "",
                    receivers: "",
                }}
                onSubmit={async (values) => {
                    const emails = extractEmails(values.receivers);
                    // console.log("title : ", values.title);
                    // console.log("body : ", body);
                    // console.log("Recipients : ", emails);
                    const { error } = await createPost({
                        input: {
                            title: values.title,
                            body: body,
                            receivers: emails,
                        },
                    });
                    if (!error) {
                        router.push("/");
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
                                apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                                initialValue="<p>Initial content</p>"
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        "advlist autolink lists link image",
                                        "charmap print preview anchor help",
                                        "searchreplace visualblocks code",
                                        "insertdatetime media table paste wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
                                }}
                                onChange={handleEditorChange}
                            />
                        </Box>
                        <Box mt={4}>
                            <Text fontSize="xl" mb={2} fontWeight="semibold">
                                Recipients
                            </Text>
                            <Menu>
                                {/* <AddIcon /> */}
                                <MenuButton
                                    backgroundColor="white"
                                    as={Button}
                                    variant="solid"
                                    border="1px solid lightgray"
                                >
                                    New Group {<ChevronDownIcon />}
                                </MenuButton>
                                <MenuList>
                                    {data &&
                                        data.getGroups.map((grp) => (
                                            <MenuItem key={grp.id}>
                                                {grp.name}
                                            </MenuItem>
                                        ))}
                                </MenuList>
                            </Menu>
                        </Box>
                        <Button
                            mt={4}
                            mb={4}
                            variant="solid"
                            border="1px solid lightgray"
                            type="submit"
                            colorScheme="gray"
                            isLoading={isSubmitting}
                        >
                            Create Post
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};
export default withUrqlClient(createUrqlClient)(CreatePost);

import { useState } from "react";
import { Box, Button, Divider, FormLabel, Text } from "@chakra-ui/react";
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

const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    const [{ data, fetching }] = useGetGroupsQuery();
    const [body, setBody] = useState("");
    const [group, setGroup] = useState("");

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
        <Wrapper variant="regular">
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
                        console.log(emails);
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
                                    apiKey={
                                        process.env.NEXT_PUBLIC_TINYMCE_API_KEY
                                    }
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
            )}
        </Wrapper>
    );
};
export default withUrqlClient(createUrqlClient)(CreatePost);

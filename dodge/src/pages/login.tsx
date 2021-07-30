import { Form } from "formik";
import React from "react";
import { Formik } from "formik";
import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import NextLink from "next/link";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Head from "next/head";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const Login: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant="small">
            <NextLink href="/">
                <Text
                    py={2}
                    backgroundColor="white"
                    cursor="pointer"
                    color="gray.700"
                    mb={5}
                    fontSize="large"
                    fontWeight="semibold"
                >
                    <ChevronLeftIcon /> Go Back
                </Text>
            </NextLink>
            <Head>
                <title>Login • Spam</title>
            </Head>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);

                    if (response.error?.message.includes("User not found")) {
                        setErrors({
                            email: "That user doesn't exist",
                        });
                    }
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
                        if (typeof router.query.next === "string") {
                            router.push(router.query.next);
                        } else {
                            // login worked
                            router.push("/main");
                        }
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="email"
                            placeholder="Email"
                            label="Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Flex>
                            <NextLink href="/forgot-password">
                                <Link mt={2} ml={"auto"} fontWeight="medium">
                                    Forgot password?
                                </Link>
                            </NextLink>
                        </Flex>
                        <Button
                            mt={4}
                            type="submit"
                            colorScheme="gray"
                            isLoading={isSubmitting}
                            variant="solid"
                        >
                            Login
                        </Button>
                        <Text mt={5} color={"gray.600"}>
                            Don{"'"}t have an account?{" "}
                            <NextLink href="/register">
                                <Link color={"blue.700"} fontWeight="medium">
                                    Create one
                                </Link>
                            </NextLink>
                        </Text>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login);

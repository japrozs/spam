import { Form } from "formik";
import React from "react";
import { Formik } from "formik";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import Head from "next/head";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();

    return (
        <Wrapper variant="small">
            <Head>
                <title>Sign up • Spam</title>
            </Head>
            <Formik
                initialValues={{ email: "", name: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await register({ options: values });
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        // registration worked
                        router.push(`/check-email?e=${values.email}`);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="name"
                            placeholder="Name"
                            label="Name"
                        />
                        <Box mt={4}>
                            <InputField
                                name="email"
                                placeholder="Email"
                                label="Email"
                            />
                        </Box>
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="Password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            colorScheme="gray"
                            isLoading={isSubmitting}
                            variant="solid"
                        >
                            Register
                        </Button>
                        <Text mt={5} color={"gray.600"}>
                            Already have an account?{" "}
                            <NextLink href="/login">
                                <Link color={"blue.700"} fontWeight="medium">
                                    Log in
                                </Link>
                            </NextLink>
                        </Text>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Register);

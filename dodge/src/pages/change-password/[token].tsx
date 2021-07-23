import { Box, Link } from "@chakra-ui/core";
import { Button, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = () => {
    const [, changePassword] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState("");
    const router = useRouter();
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await changePassword({
                        newPassword: values.newPassword,
                        token:
                            typeof router.query.token === "string"
                                ? router.query.token
                                : "",
                    });
                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(
                            response.data.changePassword.errors
                        );
                        if ("token" in errorMap) {
                            setTokenError(errorMap.token);
                        }
                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        // login worked
                        router.push("/");
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="New Password"
                            label="New Password"
                            type="password"
                        />
                        {tokenError ? (
                            <Box>
                                <Text
                                    mt={1}
                                    mr={2}
                                    fontFamily="Menlo"
                                    color="red.400"
                                >
                                    {tokenError}
                                </Text>
                                <NextLink href="/forgot-password">
                                    <Link fontFamily="Menlo">
                                        Click here to get a new one
                                    </Link>
                                </NextLink>
                            </Box>
                        ) : null}
                        {/* <Button
                            mt={4}
                            type="submit"
                            colorScheme="gray"
                            isLoading={isSubmitting}
                            variant="solid"
                        >
                            Change Password
                        </Button> */}
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(
    ChangePassword as any
);

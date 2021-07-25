import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useForgotPasswordMutation } from "../generated/graphql";
import Head from "next/head";

interface forgotPasswordProps {}

const ForgotPassword: React.FC<forgotPasswordProps> = ({}) => {
    const [complete, setComplete] = useState(false);
    const [email, setEmail] = useState("");
    const [, forgotPassword] = useForgotPasswordMutation();
    return (
        <Wrapper variant="small">
            <Head>
                <title>Forgot Password • Spam</title>
            </Head>
            <Formik
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    await forgotPassword(values);
                    setEmail(values.email);
                    setComplete(true);
                }}
            >
                {({ isSubmitting }) =>
                    complete ? (
                        <Box>
                            We sent you a link at {email}. The link expires in 3
                            days.
                        </Box>
                    ) : (
                        <Form>
                            <InputField
                                name="email"
                                placeholder="Email"
                                label="Email"
                            />
                            <Button
                                mt={4}
                                type="submit"
                                colorScheme="gray"
                                isLoading={isSubmitting}
                                variant="solid"
                            >
                                Send Email
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);

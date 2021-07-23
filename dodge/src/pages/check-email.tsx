import { Heading } from "@chakra-ui/core";
import { Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";

interface CheckEmailProps {}

const CheckEmail: React.FC<CheckEmailProps> = ({}) => {
    const router = useRouter();

    return (
        <Wrapper>
            <Text fontSize="3xl" fontWeight="bold">
                Check your email
            </Text>
            <Text>
                An email has just been been sent to{" "}
                <span style={{ fontFamily: "menlo", color: "#38A169" }}>
                    {router.query?.e}
                </span>{" "}
                . Please click on the link in that email to verify your account
            </Text>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(CheckEmail);

import React from "react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { Text, Input, Box } from "@chakra-ui/react";

interface prefProps {}

const Pref: React.FC<prefProps> = ({}) => {
    return (
        <Wrapper variant="medium">
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
                sainijaproz@gmail.com
            </Box>
            <Text fontWeight="semibold" mb={1} fontSize="xl">
                Name
            </Text>
            <Input
                fontWeight="semibold"
                fontSize="large"
                borderRadius={"0.2rem"}
                p={2}
                value={"Japroz Saini"}
                color="gray.700"
                backgroundColor={"gray.200"}
            />
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Pref);

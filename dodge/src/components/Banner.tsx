import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";

interface BannerProps {}

export const Banner: React.FC<BannerProps> = ({}) => {
    const [open, setOpen] = useState(true);
    return (
        <>
            {open ? (
                <Box
                    backgroundColor="black"
                    p={2}
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    fontWeight="semibold"
                >
                    <Text textAlign="center" mx={"auto"}>
                        {" "}
                        👋 &nbsp;&nbsp;Sign up now to get unlimited newsletters
                        for free!
                    </Text>
                    <CloseIcon
                        onClick={() => setOpen(!open)}
                        zIndex={"100000"}
                        position={"absolute"}
                        top={3}
                        right={2}
                        cursor="pointer"
                        fontSize="md"
                        ml={"auto"}
                        mr={"10px"}
                    />
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};

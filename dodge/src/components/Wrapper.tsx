import { Box } from "@chakra-ui/layout";
import React from "react";

export type WrapperVariant = "small" | "regular";

interface WrapperProps {
    variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
    return (
        <Box
            maxW={variant === "regular" ? "800px" : "400px"}
            mx="auto"
            w="100%"
            mt={8}
        >
            {children}
        </Box>
    );
};

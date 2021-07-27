import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
import Image from "next/image";
import screenshot from "../../../public/screenshot.png";

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {
    return (
        <Box>
            <div className="hero">
                <div className="text">
                    <Text className="intro" fontWeight="bold" fontSize="5xl">
                        Post your{" "}
                        <span style={{ color: "#46C3DB" }}>thoughts</span> to
                        peoples{" "}
                        <span style={{ color: "#46C3DB" }}>inboxes</span>
                    </Text>
                    <Text fontWeight="medium" color="#323232" fontSize="xl">
                        Save your favorite recipes in one place. Import just the
                        recipe from any website without the distractions or
                        clutter. Create meal plans, and generate grocery
                        lists—Saffron’s everything a cook needs.
                    </Text>
                    <Button
                        my={5}
                        color="#fff"
                        _hover={{
                            backgroundColor: "rgb(28, 28, 28)",
                        }}
                        backgroundColor="#000"
                    >
                        Create account
                    </Button>
                </div>
                <div className="img">
                    <Image src={screenshot} alt="Screenshot" />
                </div>
            </div>
        </Box>
    );
};

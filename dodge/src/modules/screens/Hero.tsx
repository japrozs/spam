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
                        Ever wanted to create content for your large userbase
                        but couldn{"'"}t find the software or the platform was
                        too confusing? Fear not, Spam is here for you. With a
                        easy-to-use interface and many features, you cam get
                        started in minutes.
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

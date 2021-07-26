import React from "react";
import Image from "next/image";
import screenshot from "../../../public/screenshot.png";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
    return (
        <Box>
            <Flex className="features" alignItems="center">
                <div className="img">
                    <Image src={screenshot} alt="Image" />
                </div>
                <div className="text">
                    <Box>
                        <Text fontWeight="semibold" fontSize="3xl">
                            Make recipes your own
                        </Text>
                        <Text>
                            With Saffron’s recipe editor, you can easily edit
                            recipes, save adjustments to ingredients, and add
                            additional steps or tips to your preparation.
                        </Text>
                        <Divider className="divider" py={1.5} width={"40%"} />
                    </Box>
                    <Box>
                        <Text fontWeight="semibold" fontSize="3xl">
                            All in one place
                        </Text>
                        <Text>
                            Storing your recipes in Saffron allows you to
                            quickly search, find, and select what you want to
                            cook.
                        </Text>
                        <Divider className="divider" py={1.5} width={"40%"} />
                    </Box>
                    <Box>
                        <Text fontWeight="semibold" fontSize="3xl">
                            Cook from your favorite device
                        </Text>
                        <Text>
                            Saffron stores your recipes in the Cloud so you can
                            access them on any device through our website or
                            Android/iOS app.
                        </Text>
                    </Box>
                </div>
            </Flex>
        </Box>
    );
};

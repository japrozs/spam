import React from "react";
import Image from "next/image";
import editor from "../../../public/editor.png";
import { Box, Divider, Flex, Text } from "@chakra-ui/react";

interface FeaturesProps {}

export const Features: React.FC<FeaturesProps> = ({}) => {
    return (
        <Box>
            <Flex className="features" alignItems="center">
                <div className="img">
                    <Image src={editor} alt="Image" />
                </div>
                <div className="text">
                    <Box>
                        <Text fontWeight="semibold" fontSize="3xl">
                            Rich text editor
                        </Text>
                        <Text>
                            With Spam{"'"}s rich text editor, you can easily
                            create posts, add images, and add your own
                            customized subscription links to your content
                            easily.
                        </Text>
                        <Divider className="divider" py={2} width={"40%"} />
                    </Box>
                    <Box>
                        <Text fontWeight="semibold" fontSize="3xl">
                            All in one place
                        </Text>
                        <Text>
                            Storing all your written content in Spam allows you
                            to quickly search, find, and select what you want to
                            post.
                        </Text>
                        <Divider className="divider" py={2} width={"40%"} />
                    </Box>
                    <Box>
                        <Text fontWeight="semibold" fontSize="3xl">
                            Access from your favorite device
                        </Text>
                        <Text>
                            Spam stores all your posts in the Cloud yo you can
                            access them on any device throigh the website or the
                            iOS/Android app.
                        </Text>
                    </Box>
                </div>
            </Flex>
        </Box>
    );
};

import React from "react";

interface MetaProps {
    title: string;
    owner?: string;
    description?: string;
}

export const Meta: React.FC<MetaProps> = ({ title, owner, description }) => {
    return (
        <>
            <meta name="description" content={description} />
            {owner ? <meta name="author" content={owner} /> : ""}
            <meta
                name="keywords"
                content={`Spam, SpamMail, Newsletters, post, inboxes, etc.`}
            />
            <meta name="og:title" content={title || "Spam"} />
            <meta
                name="og:type"
                content={owner ? "saas.newsletters" : "website"}
            />
            <meta
                name="og:description"
                content={description != null ? description : "Spam"}
            />
            <meta name="og:site_name" content="Spam" />
            <meta name="og:image" content={`../../public/logo.png`} />
        </>
    );
};

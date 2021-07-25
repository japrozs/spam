import React from "react";
import Head from "next/head";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
    return (
        <div>
            <Head>
                <title>
                    Spam • Publish your thoughts to other peoples inbox
                </title>
            </Head>
            <h1>mobile landing page</h1>
        </div>
    );
};

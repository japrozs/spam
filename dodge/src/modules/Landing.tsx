import React from "react";
import { Head } from "next/document";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
    return (
        <>
            <Head>
                <title>
                    Spam • Publish your thoughts to other peoples inbox
                </title>
            </Head>
            <div>
                <h1>mobile landing page</h1>
            </div>
        </>
    );
};

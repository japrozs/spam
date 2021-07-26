import React from "react";
import Head from "next/head";
import { Meta } from "../../components/Meta";
import { IndexNav as Navbar } from "./IndexNav";
import { Hero } from "../screens/Hero";
import { Features } from "../screens/Features";
import { Usage } from "../screens/Usage";
import { GetStarted } from "../screens/GetStarted";
import { Footer } from "../screens/Footer";

interface LandingProps {}

export const Landing: React.FC<LandingProps> = ({}) => {
    return (
        <>
            <Head>
                <title>
                    Spam • Publish your thoughts to other peoples inbox
                </title>
                <Meta title="Spam • Publish your thoughts to other peoples inbox" />
            </Head>
            <Navbar />
            <Hero />
            <Features />
            <Usage />
            <GetStarted />
            <Footer />
        </>
    );
};

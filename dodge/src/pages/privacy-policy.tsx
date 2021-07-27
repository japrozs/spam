import { Text } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Meta } from "../components/Meta";
import { Wrapper } from "../components/Wrapper";
import NextLink from "next/link";
import { ChevronLeftIcon } from "@chakra-ui/icons";

interface PrivacyPolicyProps {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({}) => {
    return (
        <Wrapper variant="medium">
            <Head>
                <title>Contact • Spam</title>
                <Meta title="Contact" />
            </Head>
            <NextLink href="/">
                <Text
                    py={2}
                    position="sticky"
                    top="0"
                    backgroundColor="white"
                    cursor="pointer"
                    color="gray.700"
                    mb={5}
                    fontSize="large"
                    fontWeight="semibold"
                >
                    <ChevronLeftIcon /> Go Back
                </Text>
            </NextLink>
            <div className="pandp">
                <h1 id="privacy-policy">Privacy Policy</h1>
                <p>
                    [[&quot;We&quot; or &quot;I&quot;, or Spam or Spam]] takes
                    your privacy seriously. To better protect your privacy
                    [[&quot;we&quot; or &quot;I&quot;]] provide this privacy
                    policy notice explaining the way your personal information
                    is collected and used.
                </p>
                <h2 id="collection-of-routine-information">
                    Collection of Routine Information
                </h2>
                <p>
                    This [[&quot;website&quot; or &quot;app&quot;]] track basic
                    information about their [[&quot;visitors&quot; or
                    &quot;users&quot;]]. This information includes, but is not
                    limited to, IP addresses, [[&quot;browser&quot; or
                    &quot;app&quot;]] details, timestamps and referring pages.
                    None of this information can personally identify specific
                    [[&quot;visitors&quot; or &quot;user&quot;]] to this
                    [[&quot;website&quot; or &quot;app&quot;]]. The information
                    is tracked for routine administration and maintenance
                    purposes.
                </p>
                <h2 id="cookies">Cookies</h2>
                <p>
                    Where necessary, this [[&quot;website&quot; or
                    &quot;app&quot;]] uses cookies to store information about a
                    visitor’s preferences and history in order to better serve
                    the [[&quot;visitor&quot; or &quot;user&quot;]] and/or
                    present the [[&quot;visitor&quot; or &quot;user&quot;]] with
                    customized content.
                </p>
                <h2 id="advertisement-and-other-third-parties">
                    Advertisement and Other Third Parties
                </h2>
                <p>
                    Advertising partners and other third parties may use
                    cookies, scripts and/or web beacons to track
                    [[&quot;visitors&quot; or &quot;user&quot;]] activities on
                    this [[&quot;website&quot; or &quot;app&quot;]] in order to
                    display advertisements and other useful information. Such
                    tracking is done directly by the third parties through their
                    own servers and is subject to their own privacy policies.
                    This [[&quot;website&quot; or &quot;app&quot;]] has no
                    access or control over these cookies, scripts and/or web
                    beacons that may be used by third parties. Learn how to{" "}
                    <a href="http://www.google.com/privacy_ads.html">
                        opt out of Google’s cookie usage
                    </a>
                    .
                </p>
                <h2 id="links-to-third-party-websites">
                    Links to Third Party Websites
                </h2>
                <p>
                    [[&quot;We&quot; or &quot;I&quot;]] have included links on
                    this [[&quot;website&quot; or &quot;app&quot;]] for your use
                    and reference. [[&quot;We&quot; or &quot;I&quot;]] are not
                    responsible for the privacy policies on these websites. You
                    should be aware that the privacy policies of these websites
                    may differ from [[&quot;our&quot; or &quot;my&quot;]] own.
                </p>
                <h2 id="security">Security</h2>
                <p>
                    The security of your personal information is important to
                    [[&quot;us&quot; or &quot;me&quot;]], but remember that no
                    method of transmission over the Internet, or method of
                    electronic storage, is 100% secure. While [[&quot;we&quot;
                    or &quot;I&quot;]] strive to use commercially acceptable
                    means to protect your personal information, [[&quot;we&quot;
                    or &quot;I&quot;]] cannot guarantee its absolute security.
                </p>
                <h2 id="changes-to-this-privacy-policy">
                    Changes To This Privacy Policy
                </h2>
                <p>
                    This Privacy Policy is effective as of [[Date]] and will
                    remain in effect except with respect to any changes in its
                    provisions in the future, which will be in effect
                    immediately after being posted on this page.
                </p>
                <p>
                    [[&quot;We&quot; or &quot;I&quot;]] reserve the right to
                    update or change [[&quot;our&quot; or &quot;my&quot;]]
                    Privacy Policy at any time and you should check this Privacy
                    Policy periodically. If [[&quot;we&quot; or &quot;I&quot;]]
                    make any material changes to this Privacy Policy,
                    [[&quot;we&quot; or &quot;I&quot;]] will notify you either
                    through the email address you have provided [[&quot;us&quot;
                    or &quot;me&quot;]], or by placing a prominent notice on
                    [[&quot;our&quot; or &quot;my&quot;]] [[&quot;website&quot;
                    or &quot;app&quot;]].
                </p>
                <h2 id="contact-information">Contact Information</h2>
                <p>
                    For any questions or concerns regarding the privacy policy,
                    please send [[&quot;us&quot; or &quot;me&quot;]] an email to
                    sainijaproz@gmail.com.
                </p>
            </div>
        </Wrapper>
    );
};

export default PrivacyPolicy;

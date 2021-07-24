import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useGetGroupsQuery, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { isMobile } from "react-device-detect";
import { Landing as DesktopLanding } from "../modules/Desktop/Landing";
import { Landing as MobileLanding } from "../modules/Mobile/Landing";

function Index() {
    const [{ data, fetching }] = useMeQuery();
    const [{ data: d, fetching: f }] = useGetGroupsQuery();
    console.log(d);
    console.log(data);
    const router = useRouter();
    if (data?.me) {
        router.push("/main");
    }
    if (isMobile) {
        return <MobileLanding />;
    } else {
        return <DesktopLanding />;
    }
}

export default withUrqlClient(createUrqlClient)(Index);

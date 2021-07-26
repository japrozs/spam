import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useGetGroupsQuery, useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Landing } from "../modules/Landing/Landing";

function Index() {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();
    if (!fetching && data?.me != null) {
        router.push("/main");
    }
    return <Landing />;
}

export default withUrqlClient(createUrqlClient)(Index);

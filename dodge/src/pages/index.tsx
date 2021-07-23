import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

function Index() {
    const [{ data, fetching }] = useMeQuery();
    const router = useRouter();
    if (data?.me) {
        router.push("/main");
    }
    return (
        <div>
            <h1>index page</h1>
            <code>{JSON.stringify(data)}</code>
        </div>
    );
}

export default withUrqlClient(createUrqlClient)(Index);

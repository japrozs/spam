import { GetPostsQuery } from "../generated/graphql";

export const searchPost = (query: string, data: GetPostsQuery) => {
    const arr = data.getPosts.filter((p) =>
        p.title.toLowerCase().trim().includes(query.toLowerCase().trim())
    );
    console.log(arr);
    return arr;
};

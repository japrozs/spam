import { GetGroupsQuery } from "../generated/graphql";

export const search = (query: string, data: GetGroupsQuery) => {
    const arr = data.getGroups.filter((g) =>
        g.name.toLowerCase().trim().includes(query.toLowerCase().trim())
    );
    return arr;
};

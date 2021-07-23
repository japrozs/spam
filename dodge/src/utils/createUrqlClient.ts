import { cacheExchange, Cache } from "@urql/exchange-graphcache";
import Router from "next/router";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { pipe, tap } from "wonka";
import {
    GetPostsDocument,
    GetPostsQuery,
    LoginMutation,
    LogoutMutation,
    MeDocument,
    MeQuery,
    CreatePostMutation,
    RegisterMutation,
    CreatePostDocument,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

export const errorExchange: Exchange =
    ({ forward }) =>
    (ops$) => {
        return pipe(
            forward(ops$),
            tap(({ error }) => {
                if (error) {
                    if (error?.message.includes("not authenticated")) {
                        Router.replace("/login");
                    }
                }
            })
        );
    };

function invalidateAllPosts(cache: Cache) {
    const allFields = cache.inspectFields("Query");
    const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
    fieldInfos.forEach((fi) => {
        cache.invalidate("Query", "posts", fi.arguments || {});
    });
}

export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include" as const,
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        betterUpdateQuery<LogoutMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            () => ({ me: null })
                        );
                    },
                    login: (_result, args, cache, info) => {
                        betterUpdateQuery<LoginMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.login.user,
                                    };
                                }
                            }
                        );
                    },

                    register: (_result, args, cache, info) => {
                        betterUpdateQuery<RegisterMutation, MeQuery>(
                            cache,
                            { query: MeDocument },
                            _result,
                            (result, query) => {
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        me: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                    createPost: (_result, args, cache, info) => {
                        invalidateAllPosts(cache);
                    },
                },
            },
        }),
        errorExchange,
        ssrExchange,
        fetchExchange,
    ],
});

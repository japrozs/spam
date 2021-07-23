import { Post } from "../entities/Post";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
    Ctx,
    Field,
    Query,
    Resolver,
    UseMiddleware,
    Mutation,
    Arg,
    InputType,
} from "type-graphql";
import { sendLetter } from "../utils/sendLetter";

@InputType()
class PostInput {
    @Field()
    title: string;

    @Field()
    body: string;

    @Field(() => [String])
    receivers: string[];
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    @UseMiddleware(isAuth)
    async getPosts(@Ctx() { req }: MyContext) {
        const posts = await Post.find({
            where: { creatorId: req.session.userId },
            order: {
                createdAt: "DESC",
            },
        });
        return posts;
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post | null> {
        input.receivers.forEach((rec) => {
            sendLetter(rec, input.body, input.title);
        });
        return Post.create({ ...input, creatorId: req.session.userId }).save();
    }
}

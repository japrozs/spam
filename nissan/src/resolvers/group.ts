import { Group } from "../entities/Group";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";
import {
    Arg,
    Ctx,
    InputType,
    Mutation,
    Field,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";

@InputType()
class GroupInput {
    @Field()
    name: string;

    @Field(() => [String])
    emails: string[];
}

@Resolver()
export class GroupResolver {
    @Query(() => [Group])
    @UseMiddleware(isAuth)
    getGroups(@Ctx() { req }: MyContext) {
        return Group.find({
            where: { creatorId: req.session.userId },
            order: { createdAt: "DESC" },
        });
    }

    @Mutation(() => Group)
    createGroup(@Arg("input") input: GroupInput, @Ctx() { req }: MyContext) {
        return Group.create({ ...input, creatorId: req.session.userId }).save();
    }
}

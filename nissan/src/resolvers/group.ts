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
    Int,
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

    @Query(() => Group)
    getGroup(@Arg("id", () => Int) id: number, @Ctx() { req }: MyContext) {
        return Group.findOne({ where: { id, creatorId: req.session.userId } });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteGroup(
        @Arg("id", () => Int) id: number,
        @Ctx() { req }: MyContext
    ) {
        await Group.delete({ id, creatorId: req.session.userId });
        return true;
    }
}

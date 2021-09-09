import "reflect-metadata";
import "dotenv-safe/config";
import { createConnection } from "typeorm";
import express from "express";
import Redis from "ioredis";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import connectRedis from "connect-redis";
import session from "express-session";
import path from "path";
import { VERIFY_EMAIL, __prod__ } from "./constants";
import { UserResolver } from "./resolvers/user";
import { PostResolver } from "./resolvers/post";
import { buildSchema } from "type-graphql";
import { User } from "./entities/User";
import { Post } from "./entities/Post";
import { Group } from "./entities/Group";
import { GroupResolver } from "./resolvers/group";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: "spam",
        url: process.env.DATABASE_URL,
        entities: [User, Post, Group],
        migrations: [path.join(__dirname, "./migrations/*")],
        synchronize: true,
        logging: true,
    });
    conn.runMigrations();
    const app = express();
    // connect redis to our session
    // to store session variables in redis cache
    const RedisStore = connectRedis(session);
    // initialise a new redis cache
    const redis = new Redis(process.env.REDIS_URL);
    app.set("trust proxy", 1);
    app.use(
        cors({
            origin: process.env.WEBSITE_URL,
            credentials: true,
        })
    );

    // create a new session
    app.use(
        session({
            name: "",
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: true, // cookie only works in https (turn this off if not using https in production)
                domain: __prod__ ? ".japrozsaini.me" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PostResolver, GroupResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    //* CONFIRM EMAIL PATH
    app.get("/confirmation/:token", async (req, res) => {
        const key = VERIFY_EMAIL + req.params.token;
        const userId = await redis.get(key);

        if (!userId) {
            return res.redirect(`${process.env.WEBSITE_URL}/wrong-token`);
            // this will page will show that the token is expired of corrupted
        }
        const userIdNum = parseInt(userId);
        const user = await User.findOne(userIdNum);
        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User no longer exists",
                    },
                ],
            };
        }

        await User.update(
            { id: userIdNum },
            {
                confirmed: true,
            }
        );

        await redis.del(key);
        return res.redirect(`${process.env.WEBSITE_URL}/login`);
    });
    //* END CONFIRM EMAIL PATH

    app.listen(parseInt(process.env.PORT), () => {
        console.log(`🚀 Server started on ${process.env.SERVER_URL}`);
    });
};
main().catch((err) => console.log("Error : " + err));

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
import morgan from "morgan";
import { Post } from "./entities/Post";

const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        database: "spam",
        username: "postgres",
        password: "postgres",
        entities: [User, Post],
        migrations: [path.join(__dirname, "./migrations/*")],
        synchronize: true,
        logging: true,
    });
    conn.runMigrations();
    const app = express();
    app.use(morgan("dev"));
    // connect redis to our session
    // to store session variables in redis
    const RedisStore = connectRedis(session);
    // initialise a new redis cache
    const redis = new Redis();

    app.use(
        cors({
            origin: "http://localhost:3000",
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
                secure: __prod__, // cookie only works in https (turn this off if not using https in production)
            },
            saveUninitialized: false,
            secret: "uixerw7923sh28y235sm19s934dh3785sh",
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, PostResolver],
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
            return res.redirect("http://localhost:3000/wrong-token");
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
        return res.redirect("http://localhost:3000/login");
    });
    //* END CONFIRM EMAIL PATH

    app.listen(4000, () => {
        console.log("🚀 Server started on http://localhost:4000");
    });
};
main().catch((err) => console.log("Error : " + err));

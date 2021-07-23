"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const constants_1 = require("./constants");
const user_1 = require("./resolvers/user");
const post_1 = require("./resolvers/post");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./entities/User");
const morgan_1 = __importDefault(require("morgan"));
const Post_1 = require("./entities/Post");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield typeorm_1.createConnection({
        type: "postgres",
        database: "spam",
        username: "postgres",
        password: "postgres",
        entities: [User_1.User, Post_1.Post],
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        synchronize: true,
        logging: true,
    });
    conn.runMigrations();
    const app = express_1.default();
    app.use(morgan_1.default("dev"));
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.use(cors_1.default({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    app.use(express_session_1.default({
        name: "",
        store: new RedisStore({
            client: redis,
            disableTouch: true,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            sameSite: "lax",
            secure: constants_1.__prod__,
        },
        saveUninitialized: false,
        secret: "uixerw7923sh28y235sm19s934dh3785sh",
        resave: false,
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield type_graphql_1.buildSchema({
            resolvers: [user_1.UserResolver, post_1.PostResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis }),
    });
    yield apolloServer.start();
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    app.get("/confirmation/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const key = constants_1.VERIFY_EMAIL + req.params.token;
        const userId = yield redis.get(key);
        if (!userId) {
            return res.redirect("http://localhost:3000/wrong-token");
        }
        const userIdNum = parseInt(userId);
        const user = yield User_1.User.findOne(userIdNum);
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
        yield User_1.User.update({ id: userIdNum }, {
            confirmed: true,
        });
        yield redis.del(key);
        return res.redirect("http://localhost:3000/login");
    }));
    app.listen(4000, () => {
        console.log("🚀 Server started on http://localhost:4000");
    });
});
main().catch((err) => console.log("Error : " + err));
//# sourceMappingURL=index.js.map
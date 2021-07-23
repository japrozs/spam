import { Request, Response } from "express";
import session from "express-session";
import { Redis } from "ioredis";

declare module "express-session" {
    interface SessionData {
        userId: any;
    }
}

export type MyContext = {
    req: Request & { session: session.Session };
    redis: Redis;
    res: Response;
};

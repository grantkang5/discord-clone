import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import passport from "passport";
import { createConnection } from "typeorm";
import schema from "./modules/schema";
import nodePath from "path";
import "./config/passport";
import auth from "./modules/auth";
import Redis from "ioredis";
import { onConnect, onDisconnect } from "./config/subscriptions";
import redisConf from "./config/redisConf";
import rateLimit from "express-rate-limit";
import "./config/passport";

const PORT = process.env.PORT || 4000;
const path = "/graphql";
// Setup redis
export const redisClient =
  process.env.NODE_ENV === "production"
    ? new Redis(process.env.REDIS_URL)
    : new Redis(redisConf);

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: "Too many authentication requests, please try again in 5 minutes"
});

createConnection()
  .then(async () => {
    const app = express()
      .use(cors())
      .use(bodyParser.json())
      .use("/images", express.static(nodePath.join(__dirname, "images")));

    app.enable("trust proxy");
    app.use(passport.initialize());
    app.get("/check", (_, res) => res.status(200).send("hello"));
    app.use("/auth", authLimiter, auth);

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res, connection }: any) => ({ req, res, connection }),
      subscriptions: {
        onConnect,
        onDisconnect
      }
    });

    app.use(path, passport.authenticate("jwt", { session: false }));
    apolloServer.applyMiddleware({ app, path });

    const ws = createServer(app);
    apolloServer.installSubscriptionHandlers(ws);

    app.get("/", (_req, res) => res.send("discord-clone api"));

    ws.listen(PORT, () => {
      console.log(
        `--------------- Listening on PORT ${PORT} -----------------`
      );
    });
  })
  .catch(error => {
    console.error(`Typeorm Connection error: `, error);
    console.log(
      "Make sure to run yarn docker or npm run docker to start db instances"
    );
  });

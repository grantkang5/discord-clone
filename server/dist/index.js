"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const passport_1 = __importDefault(require("passport"));
const typeorm_1 = require("typeorm");
const schema_1 = __importDefault(require("./modules/schema"));
const path_1 = __importDefault(require("path"));
require("./config/passport");
const auth_1 = __importDefault(require("./modules/auth"));
const ioredis_1 = __importDefault(require("ioredis"));
const subscriptions_1 = require("./config/subscriptions");
const redisConf_1 = __importDefault(require("./config/redisConf"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
require("./config/passport");
const PORT = 5000;
const path = '/graphql';
exports.redisClient = new ioredis_1.default(redisConf_1.default);
const authLimiter = express_rate_limit_1.default({
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: "Too many authentication requests, please try again in 5 minutes"
});
typeorm_1.createConnection().then(() => __awaiter(this, void 0, void 0, function* () {
    const app = express_1.default()
        .use(cors_1.default())
        .use(body_parser_1.default.json())
        .use('/images', express_1.default.static(path_1.default.join(__dirname, 'images')));
    app.enable('trust proxy');
    app.use(passport_1.default.initialize());
    app.get('/check', (_, res) => res.status(200).send('hello'));
    app.use('/auth', authLimiter, auth_1.default);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: schema_1.default,
        context: ({ req, res, connection }) => ({ req, res, connection }),
        subscriptions: {
            onConnect: subscriptions_1.onConnect,
            onDisconnect: subscriptions_1.onDisconnect
        }
    });
    app.use(path, passport_1.default.authenticate('jwt', { session: false }));
    apolloServer.applyMiddleware({ app, path });
    const ws = http_1.createServer(app);
    apolloServer.installSubscriptionHandlers(ws);
    app.get('/', (_req, res) => res.send('discord-clone api'));
    ws.listen(PORT, () => {
        console.log(`--------------- Listening on PORT ${PORT} -----------------`);
    });
})).catch(error => {
    console.error(`Typeorm Connection error: `, error);
    console.log('Make sure to run yarn docker or npm run docker to start db instances');
});

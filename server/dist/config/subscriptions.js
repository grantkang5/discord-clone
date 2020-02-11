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
const subscriptions_1 = require("../modules/subscriptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = require("./passport");
const __1 = require("..");
const User_1 = require("../entity/User");
exports.onConnect = (connectionParams) => __awaiter(this, void 0, void 0, function* () {
    const authToken = connectionParams.authToken;
    try {
        const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET, passport_1.jwtConfig.jwt.options);
        __1.redisClient.hset('users', authToken, decoded.user);
        const verifiedUser = yield User_1.User.findOne({ id: decoded.user });
        subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_IN, { userLoggedIn: verifiedUser });
        return { authToken };
    }
    catch (error) {
        if (error.name === 'TokenExpiredError') {
            const userId = yield __1.redisClient.hget('users', authToken);
            __1.redisClient.hdel('users', authToken);
            if (userId) {
                const verifiedUser = yield User_1.User.findOne({ id: parseInt(userId) });
                subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_OUT, {
                    userLoggedOut: verifiedUser
                });
            }
            throw new Error('Token expired');
        }
        else {
            throw new Error('Missing token');
        }
    }
});
exports.onDisconnect = (_, webSocket) => __awaiter(this, void 0, void 0, function* () {
    const ws = yield webSocket['initPromise'];
    const authToken = ws.authToken;
    if (authToken) {
        try {
            const decoded = jsonwebtoken_1.default.verify(authToken, process.env.JWT_SECRET, passport_1.jwtConfig.jwt.options);
            __1.redisClient.hdel('users', authToken);
            const verifiedUser = yield User_1.User.findOne({ id: decoded.user });
            subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_OUT, {
                userLoggedOut: verifiedUser
            });
        }
        catch (error) {
            if (error.name === 'TokenExpiredError') {
                __1.redisClient.hdel('users', authToken);
                const userId = yield __1.redisClient.hget('users', authToken);
                if (!userId)
                    throw new Error('No user');
                const verifiedUser = yield User_1.User.findOne({ id: parseInt(userId) });
                subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_OUT, {
                    userLoggedOut: verifiedUser
                });
            }
            throw new Error('Token expired');
        }
    }
});

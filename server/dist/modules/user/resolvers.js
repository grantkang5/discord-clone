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
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
const repository_1 = __importDefault(require("./repository"));
const subscriptions_1 = require("../subscriptions");
const __1 = require("../..");
exports.resolvers = {
    Query: {
        users: () => __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.User.find();
            if (!users.length) {
                return new Error('No users found');
            }
            return users;
        }),
        onlineUsers: (_, { serverId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).onlineUsers({ serverId });
        }),
        user: (_, { id }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).findById(id);
        }),
        me: (_, __, { req }) => __awaiter(this, void 0, void 0, function* () {
            return req.user;
        }),
        usersByName: (_, { name }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).getUsersByName({ name });
        })
    },
    Mutation: {
        editName: (_, { userId, name }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).editName({
                userId,
                name
            });
        }),
        logOut: (_, __, { req, res }) => __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            yield req.logout();
            yield __1.redisClient.hdel('users', req.headers.authorization.slice(7));
            const verifiedUser = yield User_1.User.findOne({ id: user.id });
            subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_OUT, { userLoggedOut: verifiedUser });
            yield res.clearCookie('jwt', { path: '/' });
            return user;
        }),
        editUser: (_, { userId, email, name, currentPassword, newPassword, avatar }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).editUser({
                userId,
                email,
                name,
                currentPassword,
                newPassword,
                avatar
            });
        })
    },
    Subscription: {
        userLoggedIn: {
            subscribe: () => subscriptions_1.redisPubSub.asyncIterator(subscriptions_1.USER_LOGGED_IN)
        },
        userLoggedOut: {
            subscribe: () => subscriptions_1.redisPubSub.asyncIterator(subscriptions_1.USER_LOGGED_OUT)
        }
    }
};
exports.default = exports.resolvers;

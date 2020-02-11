"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const ioredis_1 = __importDefault(require("ioredis"));
const redisConf_1 = __importDefault(require("../../config/redisConf"));
exports.USER_CREATED = 'USER_CREATED';
exports.USER_LOGGED_IN = 'USER_LOGGED_IN';
exports.USER_LOGGED_OUT = 'USER_LOGGED_OUT';
exports.SERVER_DELETED = 'SERVER_DELETED';
exports.USER_JOINED_SERVER = 'USER_JOINED_SERVER';
exports.USER_LEFT_SERVER = 'USER_LEFT_SERVER';
exports.INVITATION_SENT = 'INVITATION_SENT';
exports.INVITATION_DELETED = 'INVITATION_DELETED';
exports.CHANNEL_CREATED = 'CHANNEL_CREATED';
exports.CHANNEL_DELETED = 'CHANNEL_DELETED';
exports.CHANNEL_CHANGED = 'CHANNEL_CHANGED';
exports.MESSAGE_POSTED = 'MESSAGE_POSTED';
exports.MESSAGE_DELETED = 'MESSAGE_DELETED';
exports.MESSAGE_CHANGED = 'MESSAGE_CHANGED';
exports.pubsub = new apollo_server_express_1.PubSub();
exports.redisPubSub = new graphql_redis_subscriptions_1.RedisPubSub({
    publisher: new ioredis_1.default(redisConf_1.default),
    subscriber: new ioredis_1.default(redisConf_1.default)
});

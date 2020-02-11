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
const repository_1 = __importDefault(require("./repository"));
const subscriptions_1 = require("../subscriptions");
const resolvers = {
    Query: {
        channel: (_, { channelId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).channel({ channelId });
        }),
        getServerChannels: (_, { serverId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).getServerChannels({ serverId });
        })
    },
    Mutation: {
        createChannel: (_, { serverId, type, name }, { req }) => __awaiter(this, void 0, void 0, function* () {
            const channel = yield typeorm_1.getCustomRepository(repository_1.default).createChannel({ serverId, type, name, req });
            subscriptions_1.pubsub.publish(subscriptions_1.CHANNEL_CREATED, { createdChannel: channel });
            return channel;
        }),
        deleteChannel: (_, { channelId }, { req }) => __awaiter(this, void 0, void 0, function* () {
            const channel = yield typeorm_1.getCustomRepository(repository_1.default).deleteChannel({ channelId, req });
            subscriptions_1.pubsub.publish(subscriptions_1.CHANNEL_DELETED, { deletedChannel: channel });
            return channel;
        }),
        changeChannel: (_, { channelId, name }, { req }) => __awaiter(this, void 0, void 0, function* () {
            const channel = yield typeorm_1.getCustomRepository(repository_1.default).changeChannel({ channelId, name, req });
            subscriptions_1.pubsub.publish(subscriptions_1.CHANNEL_CHANGED, { changedChannel: channel });
            return channel;
        })
    },
    Subscription: {
        deletedChannel: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.CHANNEL_DELETED])
        },
        changedChannel: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.CHANNEL_CHANGED])
        },
        createdChannel: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.CHANNEL_CREATED])
        }
    }
};
exports.default = resolvers;

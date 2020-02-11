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
        getMessages: (_, { channelId, cursor }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).getMessages({ channelId, cursor });
        }),
    },
    Mutation: {
        postMessage: (_, { channelId, message }, { req }) => __awaiter(this, void 0, void 0, function* () {
            const postedMessage = yield typeorm_1.getCustomRepository(repository_1.default).postMessage({ channelId, message, req });
            subscriptions_1.pubsub.publish(subscriptions_1.MESSAGE_POSTED, { postedMessage });
            return postedMessage;
        }),
    },
    Subscription: {
        postedMessage: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.MESSAGE_POSTED])
        }
    }
};
exports.default = resolvers;

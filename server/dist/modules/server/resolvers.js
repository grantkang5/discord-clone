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
const Server_1 = require("../../entity/Server");
const repository_1 = __importDefault(require("./repository"));
const subscriptions_1 = require("../subscriptions");
const resolvers = {
    Query: {
        server: (_, { serverId }, { req }) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield typeorm_1.getCustomRepository(repository_1.default).server({
                    serverId,
                    req
                });
            }
            catch (error) {
                throw new Error(error);
            }
        }),
        servers: () => __awaiter(this, void 0, void 0, function* () {
            try {
                const servers = yield Server_1.Server.find();
                return servers;
            }
            catch (error) {
                return new Error(error);
            }
        }),
        userServers: (_, { userId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).getUserServers(userId);
        })
    },
    Mutation: {
        createServer: (_, { name, userId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).createServer({
                name,
                userId
            });
        }),
        deleteServer: (_, { serverId }) => __awaiter(this, void 0, void 0, function* () {
            const deletedServer = yield typeorm_1.getCustomRepository(repository_1.default).deleteServer({ serverId });
            subscriptions_1.pubsub.publish(subscriptions_1.SERVER_DELETED, { deletedServer });
            return deletedServer;
        }),
        joinServer: (_, { serverId, userId }) => __awaiter(this, void 0, void 0, function* () {
            const server = yield typeorm_1.getCustomRepository(repository_1.default).joinServer({
                serverId,
                userId
            });
            return yield server;
        }),
        acceptServerInvitation: (_, { invitationId }) => __awaiter(this, void 0, void 0, function* () {
            const server = yield typeorm_1.getCustomRepository(repository_1.default).acceptServerInvitation({ invitationId });
            return yield server;
        }),
        removeUserFromServer: (_, { serverId, userId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(repository_1.default).removeUserFromServer({
                serverId,
                userId
            });
        })
    },
    Subscription: {
        deletedServer: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.SERVER_DELETED])
        },
        userJoinedServer: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.USER_JOINED_SERVER])
        },
        removedUser: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.USER_LEFT_SERVER])
        }
    }
};
exports.default = resolvers;

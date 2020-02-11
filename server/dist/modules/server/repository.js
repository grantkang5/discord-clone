"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Server_1 = require("../../entity/Server");
const User_1 = require("../../entity/User");
const Channel_1 = require("../../entity/Channel");
const Invitation_1 = require("../../entity/Invitation");
const lodash_1 = require("lodash");
const subscriptions_1 = require("../subscriptions");
const lodash_2 = require("lodash");
let ServerRepository = class ServerRepository extends typeorm_1.Repository {
    server({ serverId, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req || !req.user)
                    throw new Error('Not authenticated');
                const server = yield this.findOne({
                    where: { id: serverId }
                });
                if (!server)
                    throw new Error('Server could not be found');
                if (!lodash_2.find(server.users, user => user.id === req.user.id)) {
                    throw new Error('Unauthorized');
                }
                return server;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getUserServers(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userServers = yield this.createQueryBuilder('server')
                    .leftJoinAndSelect('server.host', 'host')
                    .innerJoin('server.users', 'user')
                    .where('user.id = :id', { id: userId })
                    .leftJoinAndSelect('server.users', 'users')
                    .getMany();
                return userServers;
            }
            catch (error) {
                return new Error(error);
            }
        });
    }
    createServer({ name, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const host = yield User_1.User.findOne({ id: userId });
            if (!host)
                throw new Error('No host could be found');
            const server = yield this.create({
                name,
                host,
                users: [host]
            }).save();
            const generalChannel = yield Channel_1.Channel.create({
                server,
                type: 'text',
                name: 'general'
            });
            const voiceChannel = yield Channel_1.Channel.create({
                server,
                type: 'voice',
                name: 'general'
            });
            server.channels = [generalChannel, voiceChannel];
            return yield server.save();
        });
    }
    deleteServer({ serverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const serverToDelete = yield this.findOne({ id: serverId });
                if (!serverToDelete)
                    throw new Error('No server could be found');
                serverToDelete.remove();
                return serverToDelete;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    joinServer({ serverId, userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const server = yield this.findOne({ id: serverId });
                const user = yield User_1.User.findOne({ id: userId });
                if (!server || !user)
                    throw new Error('Data could not be found');
                const findUser = lodash_1.findIndex(server.users, serverUser => serverUser.id === user.id);
                if (findUser > 0) {
                    throw new Error("You're already joined into this server");
                }
                server.users = [...server.users, user];
                const joinedServer = yield server.save();
                subscriptions_1.pubsub.publish(subscriptions_1.USER_JOINED_SERVER, {
                    userJoinedServer: { server: joinedServer, user }
                });
                return joinedServer;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    acceptServerInvitation({ invitationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invitation = yield Invitation_1.Invitation.findOne({ id: invitationId });
                if (!invitation)
                    throw new Error('Invitation could not be found');
                const user = yield User_1.User.findOne({ id: invitation.receiver.id });
                const server = yield this.findOne({ id: invitation.server.id });
                if (!server || !user)
                    throw new Error('Data could not be found');
                server.users = [...server.users, user];
                invitation.remove();
                const joinedServer = yield server.save();
                subscriptions_1.pubsub.publish(subscriptions_1.USER_JOINED_SERVER, {
                    userJoinedServer: { server: joinedServer, user }
                });
                return joinedServer;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    removeUserFromServer({ userId, serverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.findOne({ id: serverId });
            const user = yield User_1.User.findOne({ id: userId });
            if (!server || !user)
                throw new Error('Data could not be found');
            server.users = server.users.filter(serverUser => serverUser.id !== user.id);
            const leftServer = yield server.save();
            subscriptions_1.pubsub.publish(subscriptions_1.USER_LEFT_SERVER, {
                removedUser: { server: leftServer, user }
            });
            return leftServer;
        });
    }
};
ServerRepository = __decorate([
    typeorm_1.EntityRepository(Server_1.Server)
], ServerRepository);
exports.default = ServerRepository;

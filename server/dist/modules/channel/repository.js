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
const Channel_1 = require("../../entity/Channel");
const Server_1 = require("../../entity/Server");
let ChannelRepository = class ChannelRepository extends typeorm_1.Repository {
    channel({ channelId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.findOne({ id: channelId });
            return channel;
        });
    }
    getServerChannels({ serverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield Server_1.Server.findOne({ id: serverId });
            if (!server)
                throw new Error('Server could not be found');
            return server.channels;
        });
    }
    createChannel({ type, name, serverId, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const server = yield Server_1.Server.findOne({ id: serverId });
                if (!server)
                    throw new Error('Server could not be found');
                if (server.host.id !== req.user.id) {
                    throw new Error('Unauthorized');
                }
                const channel = this.create({ type, name, server });
                server.channels = [...server.channels, channel];
                return yield channel.save();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    deleteChannel({ channelId, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield Channel_1.Channel.findOne({
                    where: { id: channelId },
                    relations: ['server']
                });
                if (!channel)
                    throw new Error('Channel could not be found');
                if (channel.server.host.id !== req.user.id) {
                    throw new Error('Unauthorized');
                }
                channel.remove();
                return channel;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    changeChannel({ channelId, name, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const channel = yield Channel_1.Channel.findOne({
                    where: { id: channelId },
                    relations: ['server']
                });
                if (!channel)
                    throw new Error('Channel could not be found');
                if (channel.server.host.id !== req.user.id) {
                    throw new Error('Unauthorized');
                }
                channel.name = name;
                return yield channel.save();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
ChannelRepository = __decorate([
    typeorm_1.EntityRepository(Channel_1.Channel)
], ChannelRepository);
exports.default = ChannelRepository;

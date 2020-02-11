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
const Message_1 = require("../../entity/Message");
const Channel_1 = require("../../entity/Channel");
const User_1 = require("../../entity/User");
const lodash_1 = require("lodash");
let MessageRepository = class MessageRepository extends typeorm_1.Repository {
    getMessages({ channelId, cursor }) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                where: cursor
                    ? { channel: { id: channelId }, createdAt: typeorm_1.LessThan(cursor) }
                    : { channel: { id: channelId } },
                relations: ["sender", "channel"],
                order: {
                    createdAt: "DESC"
                },
                take: 35
            };
            const messages = yield this.find(options);
            return messages;
        });
    }
    postMessage({ channelId, message, req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req || !req.user)
                throw new Error('Not authenticated');
            const channel = yield Channel_1.Channel.findOne({
                where: { id: channelId },
                relations: ["server"]
            });
            if (!channel)
                throw new Error("Channel could not be found");
            if (!lodash_1.find(channel.server.users, user => user.id === req.user.id)) {
                throw new Error("This server no longer exists or you've been kicked from the server");
            }
            const sender = yield User_1.User.findOne({ id: req.user.id });
            const newMessage = yield this.create({
                message,
                channel,
                sender
            }).save();
            return newMessage;
        });
    }
};
MessageRepository = __decorate([
    typeorm_1.EntityRepository(Message_1.Message)
], MessageRepository);
exports.default = MessageRepository;

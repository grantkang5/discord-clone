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
const Invitation_1 = require("../../entity/Invitation");
const User_1 = require("../../entity/User");
const Server_1 = require("../../entity/Server");
let InvitationRepository = class InvitationRepository extends typeorm_1.Repository {
    getSentInvitations({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({ sender: { id: userId } });
        });
    }
    getReceivedInvitations({ userId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({ receiver: { id: userId } });
        });
    }
    sendInvitation({ senderId, receiverId, serverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (receiverId === senderId) {
                throw new Error('Cannot send invites to yourself');
            }
            const receiver = yield User_1.User.findOne({ id: receiverId });
            const sender = yield User_1.User.findOne({ id: senderId });
            const server = yield Server_1.Server.findOne({ id: serverId });
            if (!receiver || !sender || !server)
                throw new Error('Data could not be found');
            const existingInvitation = yield this.findOne({
                server: {
                    id: server.id
                },
                sender: {
                    id: senderId
                },
                receiver: {
                    id: receiverId
                }
            });
            if (existingInvitation) {
                throw new Error("You've already sent this invitation");
            }
            return yield this.create({
                server,
                sender,
                receiver
            }).save();
        });
    }
    deleteInvitation({ invitationId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invitationToDelete = yield this.findOne({ id: invitationId });
                if (!invitationToDelete)
                    throw new Error('Invitation could not be found');
                invitationToDelete.remove();
                return invitationToDelete;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
};
InvitationRepository = __decorate([
    typeorm_1.EntityRepository(Invitation_1.Invitation)
], InvitationRepository);
exports.default = InvitationRepository;

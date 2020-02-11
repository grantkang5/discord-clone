"use strict";
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
const _1 = require(".");
const subscriptions_1 = require("../subscriptions");
const resolvers = {
    Query: {
        getSentInvitations: (_, { userId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(_1.InvitationRepository).getSentInvitations({ userId });
        }),
        getReceivedInvitations: (_, { userId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(_1.InvitationRepository).getReceivedInvitations({ userId });
        })
    },
    Mutation: {
        sendInvitation: (_, { senderId, receiverId, serverId }) => __awaiter(this, void 0, void 0, function* () {
            const sentInvitation = yield typeorm_1.getCustomRepository(_1.InvitationRepository).sendInvitation({ senderId, receiverId, serverId });
            subscriptions_1.pubsub.publish(subscriptions_1.INVITATION_SENT, { sentInvitation });
            return sentInvitation;
        }),
        deleteInvitation: (_, { invitationId }) => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getCustomRepository(_1.InvitationRepository).deleteInvitation({ invitationId });
        })
    },
    Subscription: {
        sentInvitation: {
            subscribe: () => subscriptions_1.pubsub.asyncIterator([subscriptions_1.INVITATION_SENT])
        }
    }
};
exports.default = resolvers;

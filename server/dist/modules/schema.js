"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = require("lodash");
const user_1 = require("./user");
const server_1 = require("./server");
const channel_1 = require("./channel");
const invitation_1 = require("./invitation");
const message_1 = require("./message");
const schema = apollo_server_express_1.makeExecutableSchema({
    typeDefs: [
        user_1.UserSchema,
        server_1.ServerSchema,
        channel_1.ChannelSchema,
        invitation_1.InvitationSchema,
        message_1.MessageSchema
    ],
    resolvers: lodash_1.merge(user_1.UserResolvers, server_1.ServerResolvers, channel_1.ChannelResolvers, invitation_1.InvitationResolvers, message_1.MessageResolvers)
});
exports.default = schema;

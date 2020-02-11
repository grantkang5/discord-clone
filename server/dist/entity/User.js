"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Server_1 = require("./Server");
const Invitation_1 = require("./Invitation");
const Message_1 = require("./Message");
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ default: 'Goober' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.OneToMany(() => Server_1.Server, server => server.host),
    __metadata("design:type", Array)
], User.prototype, "hostedServers", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Server_1.Server, server => server.users),
    __metadata("design:type", Array)
], User.prototype, "joinedServers", void 0);
__decorate([
    typeorm_1.OneToMany(() => Invitation_1.Invitation, invitation => invitation.sender),
    __metadata("design:type", Array)
], User.prototype, "sentInvitations", void 0);
__decorate([
    typeorm_1.OneToMany(() => Invitation_1.Invitation, invitation => invitation.receiver),
    __metadata("design:type", Array)
], User.prototype, "receivedInvitations", void 0);
__decorate([
    typeorm_1.OneToMany(() => Message_1.Message, message => message.sender, {
        cascade: ['insert', 'update'],
        eager: false
    }),
    __metadata("design:type", Array)
], User.prototype, "senderMessages", void 0);
User = __decorate([
    typeorm_1.Unique(['email']),
    typeorm_1.Entity()
], User);
exports.User = User;

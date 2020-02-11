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
const User_1 = require("./User");
const Channel_1 = require("./Channel");
const Invitation_1 = require("./Invitation");
let Server = class Server extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Server.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Server.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.hostedServers, {
        cascade: ['insert', 'update'],
        eager: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", User_1.User)
], Server.prototype, "host", void 0);
__decorate([
    typeorm_1.ManyToMany(() => User_1.User, user => user.joinedServers, {
        cascade: true,
        eager: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Server.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => Channel_1.Channel, channel => channel.server, {
        cascade: ['insert', 'update'],
        eager: true
    }),
    __metadata("design:type", Array)
], Server.prototype, "channels", void 0);
__decorate([
    typeorm_1.OneToMany(() => Invitation_1.Invitation, invitation => invitation.id, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Array)
], Server.prototype, "invitations", void 0);
Server = __decorate([
    typeorm_1.Unique(['name']),
    typeorm_1.Entity()
], Server);
exports.Server = Server;

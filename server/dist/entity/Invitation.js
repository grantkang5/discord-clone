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
const Server_1 = require("./Server");
let Invitation = class Invitation extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Invitation.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Invitation.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Server_1.Server, server => server.id, {
        cascade: ['insert', 'update'],
        eager: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Server_1.Server)
], Invitation.prototype, "server", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.sentInvitations, {
        cascade: ['insert', 'update'],
        eager: true
    }),
    __metadata("design:type", User_1.User)
], Invitation.prototype, "sender", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.receivedInvitations, {
        cascade: ['insert', 'update'],
        eager: true
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", User_1.User)
], Invitation.prototype, "receiver", void 0);
Invitation = __decorate([
    typeorm_1.Entity()
], Invitation);
exports.Invitation = Invitation;

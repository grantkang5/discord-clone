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
const Channel_1 = require("./Channel");
const User_1 = require("./User");
let Message = class Message extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Message.prototype, "id", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Message.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, user => user.senderMessages, {
        cascade: ['insert', 'update'],
        eager: true
    }),
    __metadata("design:type", User_1.User)
], Message.prototype, "sender", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Channel_1.Channel, channel => channel.messages, {
        cascade: ['insert', 'update'],
        eager: true,
        onDelete: "CASCADE"
    }),
    __metadata("design:type", Channel_1.Channel)
], Message.prototype, "channel", void 0);
Message = __decorate([
    typeorm_1.Entity()
], Message);
exports.Message = Message;

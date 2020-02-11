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
const Message_1 = require("./Message");
let Channel = class Channel extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Channel.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Channel.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, type: 'enum', enum: ['text', 'voice'] }),
    __metadata("design:type", String)
], Channel.prototype, "type", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Server_1.Server, server => server.channels, {
        onDelete: 'CASCADE'
    }),
    __metadata("design:type", Server_1.Server)
], Channel.prototype, "server", void 0);
__decorate([
    typeorm_1.OneToMany(() => Message_1.Message, message => message.channel, {
        cascade: ['insert', 'update'],
        eager: false
    }),
    __metadata("design:type", Array)
], Channel.prototype, "messages", void 0);
Channel = __decorate([
    typeorm_1.Entity()
], Channel);
exports.Channel = Channel;

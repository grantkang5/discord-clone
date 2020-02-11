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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
const Server_1 = require("../../entity/Server");
const __1 = require("../..");
const lodash_1 = require("lodash");
const fs_1 = require("fs");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const shortid_1 = __importDefault(require("shortid"));
let UserRepository = class UserRepository extends typeorm_1.Repository {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.findOne({ id });
        });
    }
    editName({ userId, name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({ id: userId });
            if (!user)
                throw new Error('This user doesn\'t exist');
            user.name = name;
            return yield user.save();
        });
    }
    editUser({ userId, name, email, currentPassword, newPassword, avatar }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findOne({ id: userId });
            if (!user)
                throw new Error('This user doesn\'t exist');
            try {
                const match = yield bcryptjs_1.default.compare(currentPassword, user.password);
                if (!match) {
                    throw new Error('Invalid credentials');
                }
                user.email = email;
                user.name = name;
                if (newPassword) {
                    const newHashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
                    user.password = newHashedPassword;
                }
                if (avatar && user.avatar) {
                    try {
                        fs_1.unlink(`src/images/${user.avatar}`, (err) => {
                            console.log('unlink error: ', err);
                        });
                    }
                    catch (error) {
                        throw new Error(error);
                    }
                }
                if (avatar) {
                    const { filename, createReadStream } = avatar;
                    const stream = createReadStream();
                    const createdImage = yield this.uploadImage({ stream, filename });
                    user.avatar = createdImage.id;
                }
                const newUser = yield user.save();
                return newUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    onlineUsers({ serverId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const server = yield Server_1.Server.findOne({ id: serverId });
                if (!server)
                    throw new Error('This server doesn\'t exist');
                const hashUsers = yield __1.redisClient.hgetall('users');
                const userIds = Object.values(hashUsers);
                const onlineUsers = yield this.find({ id: typeorm_1.In(userIds) });
                const users = lodash_1.intersectionBy(server.users, onlineUsers, 'id');
                return users;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    getUsersByName({ name }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                where: {
                    name: typeorm_1.Like(`${name}%`)
                },
                take: 10
            });
        });
    }
    uploadImage({ stream, filename }) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = shortid_1.default.generate();
            const path = `src/images/${id}`;
            return new Promise((resolve, reject) => stream
                .pipe(fs_1.createWriteStream(path))
                .on('finish', () => resolve({ path, filename, id }))
                .on('error', reject));
        });
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(User_1.User)
], UserRepository);
exports.default = UserRepository;

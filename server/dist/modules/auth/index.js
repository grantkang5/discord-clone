"use strict";
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
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_2 = require("../../config/passport");
const typeorm_1 = require("typeorm");
const User_1 = require("../../entity/User");
const __1 = require("../..");
const subscriptions_1 = require("../subscriptions");
const router = express_1.default.Router();
router.post("/login", passport_1.default.authenticate("local", { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error("User not found");
    }
    req.logIn(req.user, { session: false }, error => {
        if (error)
            throw new Error(error);
    });
    const token = jsonwebtoken_1.default.sign({
        user: req.user.id
    }, passport_2.jwtConfig.jwt.secret, passport_2.jwtConfig.jwt.options);
    __1.redisClient.hset("users", token, req.user.id);
    const verifiedUser = yield User_1.User.findOne({ id: req.user.id });
    subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_IN, { userLoggedIn: verifiedUser });
    try {
        return res.json({ token });
    }
    catch (err) {
        throw new Error("Try again in a few minutes");
    }
}));
router.post("/signup", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const name = email.slice(0, email.indexOf("@"));
    const user = User_1.User.create({ email, password: hashedPassword, name });
    if (!email || !password)
        throw new Error("You must provide an email and password");
    return typeorm_1.getRepository(User_1.User)
        .findOne({ email })
        .then(existingUser => {
        if (existingUser)
            res.status(500).send("This email is already in use");
        return user.save();
    })
        .then(() => next());
}), passport_1.default.authenticate("local", { session: false }), (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.user)
        throw new Error('No user');
    req.logIn(req.user, { session: false }, error => {
        if (error)
            throw new Error(error);
    });
    const token = jsonwebtoken_1.default.sign({
        user: req.user.id
    }, passport_2.jwtConfig.jwt.secret, passport_2.jwtConfig.jwt.options);
    __1.redisClient.hset("users", token, req.user.id);
    const verifiedUser = yield User_1.User.findOne({ id: req.user.id });
    subscriptions_1.redisPubSub.publish(subscriptions_1.USER_LOGGED_IN, { userLoggedIn: verifiedUser });
    try {
        return res.json({ token });
    }
    catch (err) {
        throw new Error("Try again in a few minutes");
    }
}));
exports.default = router;

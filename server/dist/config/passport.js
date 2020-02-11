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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../entity/User");
const LocalStrategy = passport_local_1.default.Strategy;
const JwtStrategy = passport_jwt_1.default.Strategy;
const ExtractJwt = passport_jwt_1.default.ExtractJwt;
exports.jwtConfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        options: {
            expiresIn: '7h',
            audience: 'https://discordapp-clone.com',
            issuer: 'accounts.discordapp-clone.com'
        }
    },
    cookie: {
        httpOnly: true,
        sameSite: false,
        signed: true,
        secure: true,
        path: '/'
    }
};
passport_1.default.use(new LocalStrategy({ usernameField: 'email', session: false }, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user)
            return done(null, false);
        bcryptjs_1.default.compare(password, user.password, (err, isMatch) => {
            if (err)
                return done(err);
            if (isMatch) {
                return done(null, user);
            }
            return done(null, false);
        });
    }
    catch (err) {
        console.log('Error: ', err);
        return done(err);
    }
})));
passport_1.default.use(new JwtStrategy({
    secretOrKey: exports.jwtConfig.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwtPayload, done) => {
    User_1.User.findOne({ id: jwtPayload.user })
        .then(user => {
        if (!user)
            throw new Error('Invalid credentials');
        return done(null, user);
    });
}));

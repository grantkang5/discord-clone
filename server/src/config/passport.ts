// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
import * as passport from 'passport'
import * as passportLocal from 'passport-local'
import * as passportJwt from 'passport-jwt'
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/User';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export const jwtConfig = {
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
}

passport.use(new LocalStrategy({ usernameField: 'email', session: false }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) return done(null, false)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err)
      if (isMatch) {
        return done(null, user)
      }

      return done(null, false)
    })
  } catch (err) {
    console.log('Error: ', err)
    return done(err)
  }
}))

passport.use(new JwtStrategy({
  secretOrKey: jwtConfig.jwt.secret,
  jwtFromRequest: (req) => {
    console.log('EXTRACTING JWT FROM REQ HEADERS: ', req.headers)
    return ExtractJwt.fromAuthHeaderAsBearerToken()
  }
}, (jwtPayload, done) => {
  console.log(process.env.NODE_ENV, process.env.JWT_SECRET)
  console.log('Authenticating headers ... ', jwtPayload)
  User.findOne({ id: jwtPayload.user.id })
    .then(user => {
      if (!user) throw new Error('Invalid credentials')
      return done(null, user)
    })
}))
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/User';

export const jwtConfig = {
  jwt: {
    secret: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret',
    options: {
      expiresIn: '6h',
      audience: 'https://scuffed-discord.com',
      issuer: 'accounts.scuffed-discord.com'
    }
  },
  cookie: {
    httpOnly: true,
    sameSite: false,
    signed: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    path: '/'
  }
}

passport.use(new LocalStrategy({ usernameField: 'email', session: false }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email })
    if (!user) return done(null, false, 'Invalid credentials')
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return done(err)
      if (isMatch) {
        return done(null, user)
      }

      return done(null, false, 'Invalid credentials')
    })
  } catch (err) {
    console.log('Error: ', err)
    return done(err)
  }
}))

passport.use(new JwtStrategy({
  secretOrKey: jwtConfig.jwt.secret,
  jwtFromRequest: req => {
    return req.signedCookies['jwt']
  }
}, (jwtPayload, done) => {
  if (Date.now() > jwtPayload.expires) {
    return done('Token expired')
  }
  User.findOne({ id: jwtPayload.user })
    .then(user => {
      if (!user) throw new Error('Invalid credentials')
      return done(null, user)
    })
}))
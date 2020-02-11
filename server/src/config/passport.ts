import passport from 'passport'
import passportLocal from 'passport-local'
import passportJwt from 'passport-jwt'
import bcrypt from 'bcryptjs';
import { User } from '../entity/User';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

export const jwtConfig = {
  jwt: {
    secret: process.env.JWT_SECRET!,
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
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, (jwtPayload, done) => {
  User.findOne({ id: jwtPayload.user })
    .then(user => {
      if (!user) throw new Error('Invalid credentials')
      return done(null, user)
    })
}))
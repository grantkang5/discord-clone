const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
import * as bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';


// serializeUser is used to provide some identifying token that can be saved
// in the users session.  We traditionally use the 'ID' for this.
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// The counterpart of 'serializeUser'.  Given only a user's ID, we must return
// the user object.  This object is placed on 'req.user'.
passport.deserializeUser(async (id, done) => {
  const user = await getRepository(User).findOne({ id })
  done(null, user)
})

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
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

const signup = async ({ email, password, req }) => {
  const hashedPassword = await bcrypt.hash(password, 10) 
  const user = User.create({ email, password: hashedPassword })
  if (!email || !password) throw new Error('You must provide an email and password.')

  return getRepository(User).findOne({ email })
    .then(existingUser => {
      if (existingUser) throw new Error('This email is already in use')
      return user.save()
    })
    .then(user => {
      return new Promise((resolve, reject) => {
        req.logIn(user, (err) => {
          if (err) { reject(err) }
          resolve(user)
        })
      })
    })
}

const signin = ({ email, password, req }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (_, user) => {
      if (!user) { reject('Invalid credentials.') }
      req.login(user, () => resolve(user))
    })({ body: { email, password } })
  })
}

export default {
  signup,
  signin
}

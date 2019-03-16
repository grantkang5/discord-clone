import * as express from 'express'
import * as passport from 'passport'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/passport'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'
const router = express.Router()

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    req.logIn(req.user, { session: false }, error => {
      if (error) throw new Error(error)
    })

    const token = await jwt.sign(
      {
        user: req.user.id
      },
      jwtConfig.jwt.secret,
      jwtConfig.jwt.options
    )
    
    try {
      await res.cookie('jwt', token, jwtConfig.cookie)
      return res.status(200).json({ token })
    } catch (err) {
      throw new Error('Try again in a few minutes')
    }
  }
)

router.post(
  '/signup',
  async (req, res, next) => {
    const { email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)
    const name = email.slice(0, email.indexOf('@'))
    const user = User.create({ email, password: hashedPassword, name })

    if (!email || !password)
      throw new Error('You must provide an email and password')

    return getRepository(User)
      .findOne({ email })
      .then(existingUser => {
        if (existingUser) res.status(500).send('This email is already in use')
        return user.save()
      })
      .then(() => next())
  },
  passport.authenticate('local', { session: false }),
  async (req, res) => {
    req.logIn(req.user, { session: false }, error => {
      if (error) throw new Error(error)
    })
    const token = await jwt.sign(
      {
        user: req.user.id
      },
      jwtConfig.jwt.secret,
      jwtConfig.jwt.options
    )

    try {
      await res.cookie('jwt', token, jwtConfig.cookie)
      return res.status(200).json({ token })
    } catch (err) {
      throw new Error('Try again in a few minutes')
    }
  }
)

export default router

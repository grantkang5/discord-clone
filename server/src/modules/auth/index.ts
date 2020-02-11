import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConfig } from "../../config/passport";
import { getRepository } from "typeorm";
import { User } from "../../entity/User";
import { redisClient } from "../..";
import { redisPubSub, USER_LOGGED_IN } from "../subscriptions";
const router = express.Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    if (!req.user) {
      throw new Error("User not found");
    }
    req.logIn(req.user, { session: false }, error => {
      if (error) throw new Error(error);
    });


    const token = jwt.sign(
      {
        user: req.user.id
      },
      jwtConfig.jwt.secret,
      jwtConfig.jwt.options
    );

    redisClient.hset("users", token, req.user.id);
    const verifiedUser = await User.findOne({ id: req.user.id });
    redisPubSub.publish(USER_LOGGED_IN, { userLoggedIn: verifiedUser });

    try {
      return res.json({ token });
    } catch (err) {
      throw new Error("Try again in a few minutes");
    }
  }
);

router.post(
  "/signup",
  async (req, res, next) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const name = email.slice(0, email.indexOf("@"));
    const user = User.create({ email, password: hashedPassword, name });

    if (!email || !password)
      throw new Error("You must provide an email and password");

    return getRepository(User)
      .findOne({ email })
      .then(existingUser => {
        if (existingUser) res.status(500).send("This email is already in use");
        return user.save();
      })
      .then(() => next());
  },
  passport.authenticate("local", { session: false }),
  async (req, res) => {
    if (!req.user) throw new Error('No user')
    req.logIn(req.user, { session: false }, error => {
      if (error) throw new Error(error);
    });
    const token = jwt.sign(
      {
        user: req.user.id
      },
      jwtConfig.jwt.secret,
      jwtConfig.jwt.options
    );

    redisClient.hset("users", token, req.user.id);
    const verifiedUser = await User.findOne({ id: req.user.id });
    redisPubSub.publish(USER_LOGGED_IN, { userLoggedIn: verifiedUser });

    try {
      return res.json({ token });
    } catch (err) {
      throw new Error("Try again in a few minutes");
    }
  }
);

export default router;

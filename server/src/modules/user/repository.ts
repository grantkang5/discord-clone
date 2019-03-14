import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository, Like } from "typeorm";
import { User } from '../../entity/User';
import AuthService from '../../services/auth';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(id: number) {
    return this.findOne({ id })
  }

  async comparePassword(inputPassword, userEmail, callback) {
    const user = await this.findOne({ email: userEmail })
    bcrypt.compare(inputPassword, user.password, (err, isMatch) => {
      if (err) {
        return callback(err)
      }

      if (isMatch) {
        return callback(null, user)
      }

      return callback(null, false, 'Invalid credentials')
    })
  }

  async signUp({ email, password, req }) {
    return AuthService.signup({ email, password, req })
  }

  async signIn({ email, password, req }) {
    return AuthService.signin({ email, password, req })
  }

  async editName({ userId, name }) {
    const user = await this.findOne({ id: userId })
    user.name = name
    return await user.save()
  }

  async getUsersByName({ name }) {
    return await this.find({
      where: {
        name: Like(`${name}%`)
      },
      take: 10
    })
  }
}

export default UserRepository
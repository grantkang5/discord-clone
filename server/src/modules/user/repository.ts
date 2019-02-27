import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from "typeorm";
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
}

export default UserRepository
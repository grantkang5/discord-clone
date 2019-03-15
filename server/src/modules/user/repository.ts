import { EntityRepository, Repository, Like } from "typeorm";
import { User } from '../../entity/User';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async findById(id: number) {
    return this.findOne({ id })
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
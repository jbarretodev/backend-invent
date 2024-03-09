import User from '#models/user'
import { UserCreate } from '../@types/index.js'

export default class UserService {
  async createUser(user: UserCreate) {
    return await User.create(user)
  }

  async getUserByEmail(email: string) {
    return await User.findBy('email', email)
  }
}

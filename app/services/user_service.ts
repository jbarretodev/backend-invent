import User from '#models/user'
import { UserCreate, UserUpdate } from '../@types/index.js'
import hash from '@adonisjs/core/services/hash'

export default class UserService {
  async createUser(user: UserCreate) {
    return await User.create(user)
  }

  async getUserByEmail(email: string) {
    return await User.findBy('email', email)
  }

  async getUserById(id: number) {
    return User.find(id)
  }

  async activeUser(id: number) {
    const user = await this.getUserById(id)

    if (!user) return false

    user.active = true
    user.token = ''
    return await user.save()
  }

  async checkTokenActiveUser(token: string) {
    return await User.findBy('token', token)
  }

  async updatePasswordUser(id: number, newPass: string) {
    const user = await User.find(id)

    if (!user) return null

    user.password = await hash.make(newPass)
    return await user.save()
  }

  async changePasswordUser(newPass: string, id: number) {
    const user = await User.find(id)

    if (!user) return undefined

    user.password = await hash.make(newPass)
    await user.save()
    return user.serialize()
  }

  async deleteUser(email: string) {
    return await User.query().where('email', email).delete()
  }

  async getUsers() {
    return await User.all()
  }

  async updateUser(user: UserUpdate, id: number) {
    const rsUser = await User.find(id)

    console.log(user)

    if (!rsUser) return undefined

    return await rsUser.merge(user).save()
  }
}

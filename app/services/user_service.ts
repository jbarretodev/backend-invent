import User from '#models/user'
import { UserCreate } from '../@types/index.js'

export default class UserService {
  async createUser(user: UserCreate) {
    return await User.create(user)
  }

  async getUserByEmail(email: string) {
    return await User.findBy('email', email)
  }

  async getUserById(id:number){
    return User.find(id)
  }

  async activeUser(id:number){
    const user = await this.getUserById(id)
    
    if(!user) return false

    user.active = true
    user.token = ""
    return await user.save() 
  }

  async checkTokenActiveUser(token:string){
    return await User.findBy('token',token)
  }
}

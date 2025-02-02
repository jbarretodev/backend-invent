import Role from '#models/role'
import { RoleCreate } from '#types/index'
import UserService from './user_service.js'

export default class RoleService {
  async createRole(dataRole: RoleCreate): Promise<Role> {
    return await Role.create(dataRole)
  }

  async updateRole(id: number, dataRole: RoleCreate) {
    const role = await Role.find(id)

    if (!role) return undefined

    return (await role.merge(dataRole).save()).refresh()
  }

  async deleteRole(id: number) {
    const role = await Role.find(id)

    if (!role) return undefined

    return await role.delete()
  }

  async getRoles() {
    return await Role.all()
  }

  async getRole(id: number) {
    return await Role.find(id)
  }

  async assingRole(userId: number, roleId: number) {
    const role = await this.getRole(roleId)
    const userRepo = new UserService()
    const user = await userRepo.getUserById(userId)

    if (!user) return undefined

    await user.related('role').associate(role)
  }
}

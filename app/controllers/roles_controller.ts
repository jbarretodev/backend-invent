import RoleService from '#services/role_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RolesController {
  constructor(protected roleService: RoleService) {}
  async createRole(ctx: HttpContext) {
    const nameRole = ctx.request.only(['name']) as { name: string }

    const role = await this.roleService.createRole({ name: nameRole.name })

    return role
      ? ctx.response.created(role)
      : ctx.response.badRequest({ message: 'Role not created' })
  }

  async updateRole(ctx: HttpContext) {
    const id = ctx.request.param('id')
    const nameRole = ctx.request.only(['name']) as { name: string }

    const role = await this.roleService.updateRole(id, { name: nameRole.name })

    return role ? ctx.response.ok(role) : ctx.response.badRequest({ message: 'Role not updated' })
  }

  async deleteRole(ctx: HttpContext) {
    const id = ctx.request.param('id')

    await this.roleService.deleteRole(id)

    return ctx.response.noContent()
  }

  async getRoles(ctx: HttpContext) {
    const roles = await this.roleService.getRoles()

    return ctx.response.ok(roles)
  }

  async getRole(ctx: HttpContext) {
    const id = ctx.request.param('id')

    const role = await this.roleService.getRole(id)

    return role ? ctx.response.ok(role) : ctx.response.notFound({ message: 'Role not found' })
  }
}

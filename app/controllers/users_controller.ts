import UserService from '#services/user_service'
import { createUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserCreate } from '../@types/index.js'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  async createUser(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)

    const userCreated = await this.userService.createUser(payload as UserCreate)

    if (!userCreated)
      return ctx.response.badRequest({ error: true, message: 'error creating user' })

    return ctx.response.created({ user: userCreated.serialize() })
  }

  async getUserByEmailNoRequest(email: string) {
    return await this.userService.getUserByEmail(email)
  }
}

import UserService from '#services/user_service'
import { createUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserCreate, UserUpdate } from '../@types/index.js'
import encryption from '@adonisjs/core/services/encryption'
import { ActiveTokenDe } from '../@types/index.js'
import EmailUtil from '../utils/EmailUtils.js'
import dayjs from 'dayjs'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  async createUser(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createUserValidator)
    payload.active = true

    const userCreated = await this.userService.createUser(payload as UserCreate)

    if (!userCreated)
      return ctx.response.badRequest({ error: true, message: 'error creating user' })

    await EmailUtil.sendActiveUserEmail(userCreated)

    return ctx.response.created({ user: userCreated.serialize() })
  }

  async activeUser(ctx: HttpContext) {
    try {
      const decryptedToken: ActiveTokenDe = encryption.decrypt(
        ctx.request.param('token')
      ) as ActiveTokenDe

      if (!dayjs(decryptedToken.expireAt).isBefore(dayjs())) {
        await this.userService.deleteUser(decryptedToken.user.email)
        return ctx.response.badRequest({ error: true, message: 'Error! toke had expired!' })
      }

      const existToken = await this.userService.checkTokenActiveUser(ctx.request.param('token'))

      if (!existToken) {
        await this.userService.deleteUser(decryptedToken.user.email)
        return ctx.response.badRequest({ error: true, message: 'token not found o expired' })
      }

      await this.userService.activeUser(decryptedToken.user.id)

      return ctx.response.noContent()
    } catch (e) {
      console.log(e)
      return ctx.response.badRequest({ error: true, message: 'error processing token' })
    }
  }

  // async getUserByEmailNoRequest(email: string) {
  //   return await this.userService.getUserByEmail(email)
  // }

  // async updatePasswordUser(ctx: HttpContext) {
  //   const rsUpdate = await this.userService.updatePasswordUser(
  //     ctx.request.param('id') as number,
  //     ctx.request.input('password')
  //   )

  //   if (!rsUpdate)
  //     return ctx.response.badRequest({ error: true, message: 'Error changing password user' })

  //   return ctx.response.noContent()
  // }

  async changePasswordUser(ctx: HttpContext) {
    const newPassword = ctx.request.input('password')

    if (newPassword) return ctx.response.badRequest({ error: true, message: 'password is missing' })

    const rs = await this.userService.changePasswordUser(newPassword, ctx.auth.user!.id)

    return !rs
      ? ctx.response.badRequest({ error: true, message: 'Error change password' })
      : ctx.response.noContent()
  }

  async getUser(ctx: HttpContext) {
    const user = await this.userService.getUserById(ctx.params.id)

    if (!user) return ctx.response.notFound({ error: true, message: 'User not found' })

    return ctx.response.ok(user.serialize())
  }

  async getUsers(ctx: HttpContext) {
    const users = await this.userService.getUsers()

    return ctx.response.ok(users.map((user) => user.serialize()))
  }

  async updateUser(ctx: HttpContext) {
    const user = await this.userService.updateUser(ctx.request.body() as UserUpdate, ctx.params.id)

    if (!user) return ctx.response.notFound({ error: true, message: 'User not found' })

    return ctx.response.ok(user.serialize())
  }
}

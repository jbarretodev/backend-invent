import User from '#models/user'
import UserService from '#services/user_service'
import { AuthValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AuthController {
  constructor(protected userService: UserService) {}
  async signIn(ctx: HttpContext) {
    await ctx.request.validateUsing(AuthValidator)

    const { email, password } = ctx.request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    if (!(await this.isActiveUser(email))) {
      return ctx.response.badRequest({
        error: true,
        message: 'Error! You must to verifate the email first!',
      })
    }

    const token = await User.accessTokens.create(user)
    await user.load('role')

    return ctx.response.ok({
      user: user.serialize(),
      token: token.value!.release(),
      type: token.type,
      expireAt: token.expiresAt,
    })
  }

  async logout(ctx: HttpContext) {
    await User.accessTokens.delete(ctx.auth.user!, ctx.auth.user?.currentAccessToken.identifier!)
    return ctx.response.noContent()
  }

  async isActiveUser(email: string) {
    const user = await this.userService.getUserByEmail(email)

    return user?.active
  }
}

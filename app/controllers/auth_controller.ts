import User from '#models/user'
import { AuthValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async signIn(ctx: HttpContext) {
    await ctx.request.validateUsing(AuthValidator)

    const { email, password } = ctx.request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return ctx.response.ok({
      user: user.serialize(),
      token: token.value!.release(),
      type: token.type,
      expireAt: token.expiresAt,
    })
  }

  async logout(ctx: HttpContext) {
    await User.accessTokens.delete(ctx.auth.user!,ctx.auth.user?.currentAccessToken.identifier!)
    return ctx.response.noContent()
  }
}

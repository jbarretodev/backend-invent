var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import User from '#models/user';
import UserService from '#services/user_service';
import { AuthValidator } from '#validators/auth';
import { inject } from '@adonisjs/core';
let AuthController = class AuthController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async signIn(ctx) {
        await ctx.request.validateUsing(AuthValidator);
        const { email, password } = ctx.request.only(['email', 'password']);
        const user = await User.verifyCredentials(email, password);
        if (!(await this.isActiveUser(email))) {
            return ctx.response.badRequest({
                error: true,
                message: 'Error! You must to verifate the email first!',
            });
        }
        const token = await User.accessTokens.create(user);
        return ctx.response.ok({
            user: user.serialize(),
            token: token.value.release(),
            type: token.type,
            expireAt: token.expiresAt,
        });
    }
    async logout(ctx) {
        await User.accessTokens.delete(ctx.auth.user, ctx.auth.user?.currentAccessToken.identifier);
        return ctx.response.noContent();
    }
    async isActiveUser(email) {
        const user = await this.userService.getUserByEmail(email);
        return user?.active;
    }
};
AuthController = __decorate([
    inject(),
    __metadata("design:paramtypes", [UserService])
], AuthController);
export default AuthController;
//# sourceMappingURL=auth_controller.js.map
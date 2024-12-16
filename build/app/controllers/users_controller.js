var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import UserService from '#services/user_service';
import { createUserValidator } from '#validators/user';
import { inject } from '@adonisjs/core';
import encryption from '@adonisjs/core/services/encryption';
import EmailUtil from '../utils/EmailUtils.js';
import dayjs from 'dayjs';
let UsersController = class UsersController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(ctx) {
        const payload = await ctx.request.validateUsing(createUserValidator);
        const userCreated = await this.userService.createUser(payload);
        if (!userCreated)
            return ctx.response.badRequest({ error: true, message: 'error creating user' });
        await EmailUtil.sendActiveUserEmail(userCreated);
        return ctx.response.created({ user: userCreated.serialize() });
    }
    async activeUser(ctx) {
        try {
            const decryptedToken = encryption.decrypt(ctx.request.param('token'));
            if (!dayjs(decryptedToken.expireAt).isBefore(dayjs())) {
                await this.userService.deleteUser(decryptedToken.user.email);
                return ctx.response.badRequest({ error: true, message: 'Error! toke had expired!' });
            }
            const existToken = await this.userService.checkTokenActiveUser(ctx.request.param('token'));
            if (!existToken) {
                await this.userService.deleteUser(decryptedToken.user.email);
                return ctx.response.badRequest({ error: true, message: 'token not found o expired' });
            }
            await this.userService.activeUser(decryptedToken.user.id);
            return ctx.response.noContent();
        }
        catch (e) {
            console.log(e);
            return ctx.response.badRequest({ error: true, message: 'error processing token' });
        }
    }
    async changePasswordUser(ctx) {
        const newPassword = ctx.request.input('password');
        if (newPassword)
            return ctx.response.badRequest({ error: true, message: 'password is missing' });
        const rs = await this.userService.changePasswordUser(newPassword, ctx.auth.user.id);
        return !rs
            ? ctx.response.badRequest({ error: true, message: 'Error change password' })
            : ctx.response.noContent();
    }
};
UsersController = __decorate([
    inject(),
    __metadata("design:paramtypes", [UserService])
], UsersController);
export default UsersController;
//# sourceMappingURL=users_controller.js.map
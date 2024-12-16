import User from '#models/user';
import hash from '@adonisjs/core/services/hash';
export default class UserService {
    async createUser(user) {
        return await User.create(user);
    }
    async getUserByEmail(email) {
        return await User.findBy('email', email);
    }
    async getUserById(id) {
        return User.find(id);
    }
    async activeUser(id) {
        const user = await this.getUserById(id);
        if (!user)
            return false;
        user.active = true;
        user.token = '';
        return await user.save();
    }
    async checkTokenActiveUser(token) {
        return await User.findBy('token', token);
    }
    async updatePasswordUser(id, newPass) {
        const user = await User.find(id);
        if (!user)
            return null;
        user.password = await hash.make(newPass);
        return await user.save();
    }
    async changePasswordUser(newPass, id) {
        const user = await User.find(id);
        if (!user)
            return undefined;
        user.password = await hash.make(newPass);
        await user.save();
        return user.serialize();
    }
    async deleteUser(email) {
        return await User.query().where('email', email).delete();
    }
}
//# sourceMappingURL=user_service.js.map
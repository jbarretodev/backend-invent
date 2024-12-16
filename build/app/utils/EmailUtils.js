import { Resend } from 'resend';
import env from '#start/env';
import encryption from '@adonisjs/core/services/encryption';
import dayjs from 'dayjs';
export default class EmailUtil {
    static async sendActiveUserEmail(user) {
        const resend = new Resend(env.get('API_KEY_RESEND'));
        const payload = {
            user,
            expireAt: dayjs().hour(1),
        };
        const token = encryption.encrypt(payload);
        user.token = token;
        await user.save();
        const url = `http://${env.get('HOST')}:${env.get('PORT')}/api/v1/active-account/${token}`;
        console.log(url);
        const { data, error } = await resend.emails.send({
            from: 'INVENT <onboarding@resend.dev>',
            to: [env.get('EMAIL_SEND')],
            subject: 'Invent - Activar Cuenta!',
            html: `Hola! <strong>${user.fullName}</strong> Para activar la cuenta debes hacer click <a href="${url}">Aqui!</a>`,
        });
        console.log(data, error);
        if (error)
            return null;
        return data;
    }
}
//# sourceMappingURL=EmailUtils.js.map
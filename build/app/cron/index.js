import app from '@adonisjs/core/services/app';
import db from '@adonisjs/lucid/services/db';
import dayjs from 'dayjs';
import cron from 'node-cron';
import fs from 'fs';
export const jobDeleteFiles = cron.schedule('0 4 * * *', () => {
    const path = app.makePath('app/files/invoices');
    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);
        if (files.length >= 1) {
            for (const file of files) {
                fs.unlinkSync(path + '/' + file);
            }
        }
    }
}, {
    scheduled: false,
    name: 'jobDeleteFiles',
});
export const jobDeleteTokenAuth = cron.schedule('0 6 * * *', async () => {
    const tokens = await db.query().from('auth_access_tokens');
    const now = dayjs();
    const ids = tokens.map((token) => {
        const tokenCreated = dayjs(token.created_at);
        const diff = now.diff(tokenCreated, 'hour');
        if (diff > 24) {
            return token.id;
        }
    });
    const idCleans = ids.filter((id) => id !== undefined);
    await db.query().from('auth_access_tokens').whereIn('id', idCleans).delete();
}, {
    name: 'jobDeleteTokenAuth',
    scheduled: false,
});
//# sourceMappingURL=index.js.map
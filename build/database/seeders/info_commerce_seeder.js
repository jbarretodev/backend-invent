import InfoCommerce from '#models/info_commerce';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
export default class extends BaseSeeder {
    async run() {
        await InfoCommerce.create({
            name: 'MainCommerce',
            phone: '+584124568765',
            address: 'Calle falsa 123',
            identification: '123456789',
        });
    }
}
//# sourceMappingURL=info_commerce_seeder.js.map
import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'clients';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('fullName');
            table.string('identification').unique();
            table.string('phone').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1711205392418_create_clients_table.js.map
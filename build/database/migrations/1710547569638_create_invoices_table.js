import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'invoices';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.decimal('total_invoice', 8, 2);
            table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
            table.boolean('status').defaultTo(false);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1710547569638_create_invoices_table.js.map
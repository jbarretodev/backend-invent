import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'invoices';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.date('date').notNullable().defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1711031000031_create_alter_add_date_invoices_table.js.map
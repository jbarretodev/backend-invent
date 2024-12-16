import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'invoices';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('payment_method').nullable().alter();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('payment_method').notNullable().alter();
        });
    }
}
//# sourceMappingURL=1713930517525_alter_change_type_payment_method_invoices_table.js.map
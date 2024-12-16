import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'history_products';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.date('date').defaultTo(this.now());
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('date');
        });
    }
}
//# sourceMappingURL=1711204401469_create_add_date_history_products_table.js.map
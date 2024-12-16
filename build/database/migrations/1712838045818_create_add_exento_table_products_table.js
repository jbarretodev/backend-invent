import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'products';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.boolean('exempt').defaultTo(false);
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => table.dropColumn('exempt'));
    }
}
//# sourceMappingURL=1712838045818_create_add_exento_table_products_table.js.map
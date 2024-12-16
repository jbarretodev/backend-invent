import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'products';
    async up() {
        this.schema.alterTable('products', (table) => {
            table.enum('sell_by', ['by_kilo', 'by_unit']).defaultTo('by_unit');
        });
    }
    async down() {
        this.schema.alterTable('products', (table) => {
            table.dropColumn('sell_by');
        });
    }
}
//# sourceMappingURL=1711143159399_add_sell_by_productss_table.js.map
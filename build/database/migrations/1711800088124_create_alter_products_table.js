import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'products';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.float('quantity', 8, 8).alter();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('quantity').alter();
        });
    }
}
//# sourceMappingURL=1711800088124_create_alter_products_table.js.map
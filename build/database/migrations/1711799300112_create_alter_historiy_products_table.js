import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'history_products';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.float('quantity', 8, 2).alter();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('quantity').alter();
        });
    }
}
//# sourceMappingURL=1711799300112_create_alter_historiy_products_table.js.map
import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'alter_add_pricr_products';
    async up() {
        this.schema.alterTable('products', (table) => {
            table.decimal('price', 10, 2).defaultTo(0);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1710244286766_create_alter_add_pricr_products_table.js.map
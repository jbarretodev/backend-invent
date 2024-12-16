import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'detail_invoices';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('invoice_id').unsigned().references('invoices.id');
            table.integer('product_id').unsigned().references('products.id');
            table.decimal('quantity', 8, 2);
            table.decimal('unit_price', 8.2);
            table.decimal('total_line', 8, 2);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1710548472138_create_detail_invoices_table.js.map
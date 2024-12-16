import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'history_products';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('quantity');
            table.integer('type_op');
            table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE');
            table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE');
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1710024100434_create_history_products_table.js.map
import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'ivas';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.float('value', 8, 2).notNullable();
            table.boolean('active').notNullable().defaultTo(true);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1712799972910_create_ivas_table.js.map
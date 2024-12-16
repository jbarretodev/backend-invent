import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'alter_token_users';
    async up() {
        this.schema.alterTable('users', (table) => {
            table.text('token').nullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1710035068111_create_alter_token_users_table.js.map
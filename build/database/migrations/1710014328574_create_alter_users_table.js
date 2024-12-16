import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'alter_users';
    async up() {
        this.schema.alterTable('users', (table) => {
            table.boolean('active').defaultTo(false);
            table.string('avatar').defaultTo('');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1710014328574_create_alter_users_table.js.map
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alter_token_users'

  async up() {
    this.schema.alterTable('users', (table) => {
      table.text('token').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

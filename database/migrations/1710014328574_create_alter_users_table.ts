import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alter_users'

  async up() {
    this.schema.alterTable('users', (table) => {
      table.boolean('active').defaultTo(false)
      table.string('avatar').defaultTo('')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

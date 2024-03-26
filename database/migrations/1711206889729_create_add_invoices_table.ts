import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('client_id').unsigned().references('id').inTable('clients').onDelete('CASCADE').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, table => {
      table.dropColumn('client_id')
    })
  }
}
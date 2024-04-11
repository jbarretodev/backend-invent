import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('subtotal', 8, 2).notNullable().defaultTo(0.0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => table.dropColumn('subtotal'))
  }
}

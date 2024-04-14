import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detail_invoices'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('iva', 8, 2).defaultTo(0.0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => table.dropColumn('iva'))
  }
}

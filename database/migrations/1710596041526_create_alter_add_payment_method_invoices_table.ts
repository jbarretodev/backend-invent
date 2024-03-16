import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alter_add_payment_method_invoices'

  async up() {
    this.schema.alterTable('invoices', (table) => {
      table.enum('payment_method', ['biopago', 'Bs Efectvo', '$ efectivo', 'TDD', 'TDC'])
      table.string('num_operation').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

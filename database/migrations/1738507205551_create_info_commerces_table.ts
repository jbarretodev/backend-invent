import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'info_commerces'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('dolar_rate', 8, 2).defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('dolar_rate')
    })
  }
}

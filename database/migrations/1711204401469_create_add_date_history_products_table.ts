import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'history_products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.date('date').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('date')
    })
  }
}

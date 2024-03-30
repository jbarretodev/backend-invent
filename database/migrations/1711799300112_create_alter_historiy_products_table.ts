import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'history_products'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.float('quantity', 8, 2).alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('quantity').alter()
    })
  }
}

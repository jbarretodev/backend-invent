import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'alter_add_pricr_products'

  async up() {
    this.schema.alterTable('products', (table) => {
      table.decimal('price', 10, 2).defaultTo(0)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Invoice from './invoice.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class DetailInvoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare invoice_id: number

  @column()
  declare product_id: number

  @column()
  declare quantity: number

  @column()
  declare unit_price: number

  @column()
  declare total_line: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Invoice)
  declare invoice: BelongsTo<typeof Invoice>

  @belongsTo(() => Product)
  declare products: BelongsTo<typeof Product>
}

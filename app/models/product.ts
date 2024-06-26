import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import HistoryProduct from './history_product.js'
import DetailInvoice from './detail_invoice.js'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare quantity: number

  @column()
  declare price: number

  @column()
  declare code: string

  @column()
  declare exempt: boolean

  @column()
  declare sell_by: string

  @column()
  declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => HistoryProduct)
  declare historyProducs: HasMany<typeof HistoryProduct>

  @hasMany(() => DetailInvoice)
  declare detail_invoice: HasMany<typeof DetailInvoice>
}

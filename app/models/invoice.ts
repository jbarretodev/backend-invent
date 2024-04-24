import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import DetailInvoice from './detail_invoice.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Client from './client.js'

export default class Invoice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare total_invoice: number

  @column()
  declare status: boolean

  @column()
  declare user_id: number

  @column()
  declare client_id: number | null

  @column()
  declare num_operation: string | null

  @column()
  declare payment_method: string | null

  @column.date()
  declare date: DateTime

  @column()
  declare subtotal: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => DetailInvoice, {
    foreignKey: 'invoice_id',
  })
  declare detail_invoice: HasMany<typeof DetailInvoice>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Client, {
    foreignKey: 'client_id',
  })
  declare client: BelongsTo<typeof Client>
}

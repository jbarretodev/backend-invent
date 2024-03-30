import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Invoice from './invoice.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({
    columnName: 'fullName',
  })
  declare fullName: string

  @column()
  declare identification: string

  @column()
  declare phone: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Invoice, {
    foreignKey: 'client_id',
  })
  declare invoices: HasMany<typeof Invoice>
}

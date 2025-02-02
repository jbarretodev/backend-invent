import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider, AccessToken } from '@adonisjs/auth/access_tokens'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import HistoryProduct from './history_product.js'
import Invoice from './invoice.js'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare avatar: string

  @column()
  declare active: boolean

  @column()
  declare token: string

  @column()
  declare role_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '1 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'bearer',
    tokenSecretLength: 40,
  })

  static currentAccessToken?: AccessToken

  @hasMany(() => HistoryProduct)
  declare historyProducts: HasMany<typeof HistoryProduct>

  @hasMany(() => Invoice)
  declare detail_invoice: HasMany<typeof Invoice>

  @belongsTo( () => Role, {
    localKey: 'id',
    foreignKey: 'role_id',
  } )
  declare role: BelongsTo<typeof Role>

  // @beforeCreate()
  // static async hashPassword(user: User) {
  //   if (user.$dirty.password) {
  //     user.password = await hash.make(user.password)
  //   }
  // }
}

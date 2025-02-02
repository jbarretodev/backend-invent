import vine from '@vinejs/vine'

export const commerceCreate = vine.compile(
  vine.object({
    name: vine.string(),
    address: vine.string(),
    phone: vine.string(),
    identification: vine.string(),
    dolarRate: vine.number(),
  })
)

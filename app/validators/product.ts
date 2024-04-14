import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4),
    quantity: vine.number(),
    price: vine.number(),
    image: vine.string().optional(),
    code: vine.string().optional(),
    sell_by: vine.string().optional(),
    exempt: vine.boolean(),
  })
)

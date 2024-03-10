import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(4),
    quantity: vine.number(),
    image: vine.string().optional(),
    code: vine.string().optional(),
  })
)

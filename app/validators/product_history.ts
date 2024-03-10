import vine from '@vinejs/vine'

export const createOperationProductValidator = vine.compile(
  vine.object({
    quantity: vine.number(),
    type_op: vine.number(),
    product_id: vine.number(),
    user_id: vine.number().optional(),
  })
)

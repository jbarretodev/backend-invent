import vine from '@vinejs/vine'

export const makeInvoice = vine.compile(
  vine.object({
    invoice: vine.object({
      total_invoice: vine.number(),
      status: vine.boolean(),
      num_operation: vine.string().optional(),
      payment_method: vine.string(),
    }),
    details: vine
      .array(
        vine.object({
          //invoice_id: vine.number(),
          product_id: vine.number(),
          quantity: vine.number(),
          unit_price: vine.number(),
          total_line: vine.number(),
        })
      )
      .minLength(1),
  })
)

import vine from '@vinejs/vine'

export const makeInvoice = vine.compile(
  vine.object({
    invoice: vine.object({
      total_invoice: vine.number(),
      status: vine.boolean(),
      num_operation: vine.string().optional(),
      payment_method: vine.string().optional(),
      full_name_client: vine.string().optional(),
      identification: vine.string().optional(),
      client_id: vine.number().optional(),
      subtotal: vine.number(),
    }),
    details: vine
      .array(
        vine.object({
          //invoice_id: vine.number(),
          product_id: vine.number(),
          quantity: vine.number(),
          unit_price: vine.number(),
          iva: vine.number(),
          total_line: vine.number(),
        })
      )
      .minLength(1),
  })
)

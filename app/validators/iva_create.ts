import vine from '@vinejs/vine'

export const ivaCreate = vine.compile(
  vine.object({
    value: vine.number(),
    active: vine.boolean(),
  })
)

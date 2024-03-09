import vine from '@vinejs/vine'

export const AuthValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim(),
  })
)

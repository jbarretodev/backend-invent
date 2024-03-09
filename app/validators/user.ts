import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)

// /**
//  * Validates the post's update action
//  */
// export const updatePostValidator = vine.compile(
//   vine.object({
//     title: vine.string().trim().minLength(6),
//     description: vine.string().trim().escape()
//   })
// )

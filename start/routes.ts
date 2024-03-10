/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import AuthController from '#controllers/auth_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router.get('/', async () => {
  return {
    status: 'Api Ruinning!',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('active-account/:token', [UsersController,'activeUser'])

        //group to auth
        router
          .group(() => {
            router.post('sign-in', [AuthController, 'signIn'])
            router.get('logout', [AuthController, 'logout']).use(
              middleware.auth({
                guards: ['api'],
              })
            )
          })
          .prefix('auth')

        //group to users
        router
          .group(() => {
            router.post('/', [UsersController, 'createUser'])
          })
          .prefix('users')
      })
      .prefix('v1')
  })
  .prefix('api')

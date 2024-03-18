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
import ProductsController from '#controllers/products_controller'
import ProductsHistoriesController from '#controllers/products_histories_controller'
import InvoicesController from '#controllers/invoices_controller'

router.get('/', async () => {
  return {
    status: 'Api Ruinning!',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.get('active-account/:token', [UsersController, 'activeUser'])

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
            router.patch('/update-password', [UsersController, 'updatePasswordUser'])
          })
          .prefix('users')

        //group to products
        router
          .group(() => {
            router.post('/', [ProductsController, 'createProduct'])
            router.get('/by-code/:code', [ProductsController, 'getProductByCode'])
            router.get('/by-id/:id', [ProductsController, 'getProductById'])
            router.get('/', [ProductsController, 'getProduct'])
            router.get('/searcher', [ProductsController, 'searcherProduct'])
          })
          .prefix('products')
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )

        //group to history_product
        router
          .group(() => {
            router.post('/', [ProductsHistoriesController, 'newOperationProduct'])
            router.get('/', [ProductsHistoriesController, 'historyOperations'])
          })
          .prefix('history-product')
          .use(
            middleware.auth({
              guards: ['api'],
            })
          )

        //group to invoices
        router
          .group(() => {
            router.post('/', [InvoicesController, 'makeInvoice'])
            router.get('/', [InvoicesController, 'getInvoices'])
          })
          .prefix('invoices')
          .use(middleware.auth({ guards: ['api'] }))
      })
      .prefix('v1')
  })
  .prefix('api')

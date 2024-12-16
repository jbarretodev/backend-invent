import AuthController from '#controllers/auth_controller';
import UsersController from '#controllers/users_controller';
import router from '@adonisjs/core/services/router';
import { middleware } from '#start/kernel';
import ProductsController from '#controllers/products_controller';
import ProductsHistoriesController from '#controllers/products_histories_controller';
import InvoicesController from '#controllers/invoices_controller';
import ClientsController from '#controllers/clients_controller';
import IvasController from '#controllers/ivas_controller';
import InfoCommercesController from '#controllers/info_commerces_controller';
import ReportController from '#controllers/reports_controller';
router.get('/', async () => {
    return {
        status: 'Api Ruinning!',
    };
});
router
    .group(() => {
    router
        .group(() => {
        router.get('active-account/:token', [UsersController, 'activeUser']);
        router
            .group(() => {
            router.post('sign-in', [AuthController, 'signIn']);
            router.get('logout', [AuthController, 'logout']).use(middleware.auth({
                guards: ['api'],
            }));
        })
            .prefix('auth');
        router
            .group(() => {
            router.post('/', [UsersController, 'createUser']);
            router.patch('/update-password', [UsersController, 'changePasswordUser']);
        })
            .prefix('users');
        router
            .group(() => {
            router.post('/', [ProductsController, 'createProduct']);
            router.get('/by-code/:code', [ProductsController, 'getProductByCode']);
            router.get('/by-id/:id', [ProductsController, 'getProductById']);
            router.get('/', [ProductsController, 'getProduct']);
            router.get('/searcher', [ProductsController, 'searcherProduct']);
            router.patch('/:id/update-price', [ProductsController, 'changePriceProduct']);
            router.patch('/:id/update-name', [ProductsController, 'changeNameProduct']);
            router.patch('/:id/update-mode', [ProductsController, 'changeSellByProduct']);
            router.patch('/:id/update-exempt', [ProductsController, 'changeIsExempt']);
        })
            .prefix('products')
            .use(middleware.auth({
            guards: ['api'],
        }));
        router
            .group(() => {
            router.post('/', [ProductsHistoriesController, 'newOperationProduct']);
            router.get('/', [ProductsHistoriesController, 'historyOperations']);
        })
            .prefix('history-product')
            .use(middleware.auth({
            guards: ['api'],
        }));
        router
            .group(() => {
            router.post('/', [InvoicesController, 'makeInvoice']);
            router.get('/', [InvoicesController, 'getInvoices']);
            router.get('/details/:id', [InvoicesController, 'getInvoiceDetail']);
            router.get('/consolidate', [InvoicesController, 'getInvoicesConsolidated']);
            router.get('/by-client/:id', [InvoicesController, 'getInvoicesByClient']);
            router.get('/generare-invoice/:id', [InvoicesController, 'generateInvoice']);
            router.get('/get-invoice', [InvoicesController, 'getInvoicePdf']);
            router.get('/not-paid', [InvoicesController, 'getInvoicesNotPaid']);
            router.patch('/:id/pay-debt', [InvoicesController, 'payDebt']);
        })
            .prefix('invoices')
            .use(middleware.auth({ guards: ['api'] }));
        router
            .group(() => {
            router.get('/', [ClientsController, 'getAllClients']);
            router.get('/:identification', [ClientsController, 'getClientWithOutInvoice']);
            router.get('/all/no-invoice', [ClientsController, 'getClientsWithOutInvoice']);
            router.get('/:id/invoices', [ClientsController, 'getClientInvoices']);
        })
            .prefix('clients')
            .use(middleware.auth({ guards: ['api'] }));
        router
            .group(() => {
            router.get('/', [IvasController, 'getCurrentInfoIva']);
            router.post('/', [IvasController, 'createNewValueIva']);
        })
            .prefix('iva')
            .use(middleware.auth({ guards: ['api'] }));
        router
            .group(() => {
            router.get('/', [InfoCommercesController, 'getInfoCommerce']);
            router.post('/', [InfoCommercesController, 'updateInfoCommerce']);
        })
            .prefix('commerce')
            .use(middleware.auth({ guards: ['api'] }));
        router
            .group(() => {
            router.get('/report-sells', [ReportController, 'getReportSell']);
        })
            .prefix('report')
            .use(middleware.auth({ guards: ['api'] }));
        router
            .group(() => {
            router.get('/report-best-salling', [ReportController, 'getReportBestSellingProduct']);
        })
            .prefix('report')
            .use(middleware.auth({ guards: ['api'] }));
    })
        .prefix('v1');
})
    .prefix('api');
//# sourceMappingURL=routes.js.map
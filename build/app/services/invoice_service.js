import Invoice from '#models/invoice';
import { DateTime } from 'luxon';
export default class InvoiceService {
    async makeInvoice(dataInvoice) {
        return await Invoice.create(dataInvoice);
    }
    async getInvoices(date) {
        return await Invoice.query()
            .where('date', '<=', DateTime.fromJSDate(new Date(date)).toSQLDate())
            .preload('user')
            .orderBy('createdAt', 'desc');
    }
    async getDetailInvoice(id) {
        return await Invoice.query()
            .where('id', id)
            .preload('user')
            .preload('detail_invoice', (query) => {
            query.preload('products');
        })
            .first();
    }
    async getInvoicesConsolidated(date) {
        return await Invoice.query().where('date', '=', date);
    }
    async getInvoicesByClient(id) {
        return await Invoice.query().where('client_id', id);
    }
    async prepareDataPrintInvoice(idInvoice) {
        const invoiceClient = await Invoice.query()
            .where('id', idInvoice)
            .preload('client')
            .preload('detail_invoice', (query) => {
            query.preload('products');
        })
            .first();
        if (!invoiceClient)
            return undefined;
        return invoiceClient;
    }
    async getInvoicesNotPaid() {
        return await Invoice.query().where('status', false).preload('client').preload('user');
    }
    async payDebt(id, params) {
        const invoice = await Invoice.find(id);
        if (!invoice)
            return false;
        invoice.status = true;
        invoice.payment_method = params.payment_method;
        invoice.num_operation = params.num_operation;
        await invoice.load('user');
        await invoice.load('detail_invoice', (query) => {
            query.preload('products');
        });
        return (await invoice.save()).refresh();
    }
}
//# sourceMappingURL=invoice_service.js.map
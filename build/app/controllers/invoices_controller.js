var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import InvoiceDetailService from '#services/invoice_detail_service';
import InvoiceService from '#services/invoice_service';
import { makeInvoice } from '#validators/invoice';
import { inject } from '@adonisjs/core';
import ProductService from '#services/product_service';
import HistoryProductService from '#services/history_product_service';
import ClientService from '#services/client_service';
import InfoCommerceService from '#services/info_commerce_service';
import Util from '../utils/Util.js';
import dayjs from 'dayjs';
import path from 'path';
import app from '@adonisjs/core/services/app';
let InvoicesController = class InvoicesController {
    invoiceService;
    invoiceDetailService;
    productService;
    historyProductService;
    clientService;
    infoCommerceService;
    constructor(invoiceService, invoiceDetailService, productService, historyProductService, clientService, infoCommerceService) {
        this.invoiceService = invoiceService;
        this.invoiceDetailService = invoiceDetailService;
        this.productService = productService;
        this.historyProductService = historyProductService;
        this.clientService = clientService;
        this.infoCommerceService = infoCommerceService;
    }
    async makeInvoice(ctx) {
        const payload = await ctx.request.validateUsing(makeInvoice);
        const body = { ...payload.invoice, user_id: ctx.auth.user?.id };
        let client = null;
        if (!payload.invoice.client_id) {
            client = await this.clientService.saveNewClient({
                fullName: payload.invoice.full_name_client,
                identification: payload.invoice.identification,
            });
        }
        else
            client = payload.invoice.client_id;
        body['client_id'] = typeof client === 'object' ? client.id : client;
        delete body.full_name_client;
        delete body.identification;
        const invoice = await this.invoiceService.makeInvoice(body);
        const detailsWithIdInvoice = payload.details.map((detail) => {
            return { ...detail, invoice_id: invoice.id };
        });
        const details = await this.invoiceDetailService.saveDatail(detailsWithIdInvoice);
        details.forEach((detail) => {
            this.productService
                .updateStockProduct(detail.product_id, detail.quantity, 0)
                .then((__rs) => console.log('stock updated!'));
        });
        details.forEach((detail) => {
            this.historyProductService
                .saveHistory({
                product_id: detail.product_id,
                quantity: detail.quantity,
                type_op: 0,
                user_id: ctx.auth.user?.id,
            })
                .then((__rs) => console.log('history created!'));
        });
        if (invoice)
            return ctx.response.created({ invoice: invoice.serialize(), details });
        return ctx.response.badRequest({ error: true, message: 'try then' });
    }
    async getInvoices(ctx) {
        const params = ctx.request.qs();
        if (!params.dateSearch)
            return ctx.response.badRequest({ error: true, message: 'Error request' });
        return ctx.response.ok({ invoices: await this.invoiceService.getInvoices(params.dateSearch) });
    }
    async getInvoiceDetail(ctx) {
        if (!ctx.request.param('id'))
            return ctx.response.badRequest({ error: true, message: 'id missing' });
        const invocesDetail = await this.invoiceService.getDetailInvoice(Number(ctx.request.param('id')));
        return invocesDetail
            ? ctx.response.ok(invocesDetail)
            : ctx.response.notFound({ error: true, message: 'invoice not found' });
    }
    async getInvoicesConsolidated(ctx) {
        const qs = ctx.request.qs();
        if (!qs.date)
            return ctx.response.badRequest({ error: true, message: 'date is missing' });
        const invoices = await this.invoiceService.getInvoicesConsolidated(ctx.request.qs().date);
        const sum = invoices.reduce((acc, invoice) => acc + Number(invoice.total_invoice), 0);
        return ctx.response.ok({
            invoices_consolidate: sum,
            count_invoices: invoices.length,
            invoices: invoices,
            invoices_not_paid: invoices.filter((invoice) => invoice.status === false).length,
            invoices_paid: invoices.filter((invoice) => invoice.status === true).length,
        });
    }
    async getInvoicesByClient(ctx) {
        return ctx.response.ok(await this.invoiceService.getInvoicesByClient(ctx.request.param('id')));
    }
    async generateInvoice(ctx) {
        try {
            const clientInvoice = await this.invoiceService.prepareDataPrintInvoice(ctx.request.param('id'));
            const infoCommerce = await this.infoCommerceService.getInfoCommerce();
            if (!clientInvoice || !infoCommerce)
                return ctx.response.notFound({ error: true, message: 'invoice or commerce not found' });
            const dataPrintInvoice = {
                emitted: {
                    identification: infoCommerce.identification,
                    name: infoCommerce.name,
                    location: infoCommerce.address || '',
                },
                recepter: {
                    identification: clientInvoice.client.identification,
                    name: clientInvoice.client.fullName,
                    location: '',
                },
                date: clientInvoice.date.toString().split('T')[0],
                number: clientInvoice.id,
                iva: 12,
                subtotal: Number(clientInvoice.total_invoice),
                total: Number(clientInvoice.total_invoice),
                products: clientInvoice.detail_invoice.map((elem) => {
                    return {
                        code: elem.products.code,
                        description: elem.products.name,
                        quantity: Number(elem.quantity),
                        unit_price: Number(elem.products.price),
                        amount: Number(elem.products.price) * Number(elem.quantity),
                    };
                }),
                id_invoice: clientInvoice.id,
            };
            const pathFile = app.makePath(`app/files/invoices/invoice_${dayjs().toISOString()}.pdf`);
            const rsInvoicePdf = await Util.generateInvoicePdf(dataPrintInvoice, pathFile);
            return rsInvoicePdf
                ? ctx.response.ok({ file: pathFile.split('/').pop() })
                : ctx.response.badRequest({ error: true, message: 'error creating invoice' });
        }
        catch (error) {
            console.log(error);
            return ctx.response.internalServerError({ error: true, message: 'error' });
        }
    }
    async getInvoicePdf(ctx) {
        const query = ctx.request.qs();
        const filePath = path.join(app.makePath('app/files/invoices'), query.file);
        return ctx.response.attachment(filePath);
    }
    async getInvoicesNotPaid(ctx) {
        return ctx.response.ok(await this.invoiceService.getInvoicesNotPaid());
    }
    async payDebt(ctx) {
        if (!ctx.request.param('id'))
            return ctx.response.badRequest({ error: true, message: 'id missing' });
        const { reference, paymentMethod } = ctx.request.all();
        const rs = await this.invoiceService.payDebt(Number(ctx.request.param('id')), {
            num_operation: reference,
            payment_method: paymentMethod,
        });
        return rs ? ctx.response.ok(rs) : ctx.response.badRequest({ error: true, message: 'error' });
    }
};
InvoicesController = __decorate([
    inject(),
    __metadata("design:paramtypes", [InvoiceService,
        InvoiceDetailService,
        ProductService,
        HistoryProductService,
        ClientService,
        InfoCommerceService])
], InvoicesController);
export default InvoicesController;
//# sourceMappingURL=invoices_controller.js.map
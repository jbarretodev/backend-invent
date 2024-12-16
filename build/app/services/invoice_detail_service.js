import DetailInvoice from '#models/detail_invoice';
export default class InvoiceDetailService {
    async saveDatail(dataDtail) {
        return await DetailInvoice.createMany(dataDtail);
    }
}
//# sourceMappingURL=invoice_detail_service.js.map
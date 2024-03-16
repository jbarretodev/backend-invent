import Invoice from '#models/invoice'
import { InvoiceCreate } from '../@types/index.js'

export default class InvoiceService {
  async makeInvoice(dataInvoice: InvoiceCreate) {
    return await Invoice.create(dataInvoice)
  }
}

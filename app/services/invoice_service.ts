import Invoice from '#models/invoice'
import { InvoiceCreate, PayDebt } from '../@types/index.js'
import { DateTime } from 'luxon'

export default class InvoiceService {
  async makeInvoice(dataInvoice: InvoiceCreate) {
    return await Invoice.create(dataInvoice)
  }

  async getInvoices(date: string) {
    return await Invoice.query()
      .where('date', '<=', DateTime.fromJSDate(new Date(date)).toSQLDate() as string)
      .preload('user')
      .orderBy('createdAt', 'desc')
  }

  async getDetailInvoice(id: number) {
    return await Invoice.query()
      .where('id', id)
      .preload('user')
      .preload('detail_invoice', (query) => {
        query.preload('products')
      })
      .first()
  }

  async getInvoicesConsolidated(date: string) {
    return await Invoice.query().where('date', '=', date)
  }

  async getInvoicesByClient(id: number) {
    return await Invoice.query().where('client_id', id)
  }

  async prepareDataPrintInvoice(idInvoice: number) {
    const invoiceClient = await Invoice.query()
      .where('id', idInvoice)
      .preload('client')
      .preload('detail_invoice', (query) => {
        query.preload('products')
      })
      .first()

    if (!invoiceClient) return undefined

    return invoiceClient
  }

  async getInvoicesNotPaid() {
    return await Invoice.query().where('status', false).preload('client').preload('user')
  }

  async payDebt(id: number, params: PayDebt) {
    const invoice = await Invoice.find(id)

    if (!invoice) return false

    invoice.status = true
    invoice.payment_method = params.payment_method
    invoice.num_operation = params.num_operation

    await invoice.load('user')
    await invoice.load('detail_invoice', (query) => {
      query.preload('products')
    })

    return (await invoice.save()).refresh()
  }
}

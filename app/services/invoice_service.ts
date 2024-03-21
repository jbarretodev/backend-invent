import Invoice from '#models/invoice'
import { InvoiceCreate } from '../@types/index.js'
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
    return await Invoice.query().where('date','=',date)
  }
}

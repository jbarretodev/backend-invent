import DetailInvoice from '#models/detail_invoice'
import { InvoiceDetail } from '../@types/index.js'

export default class InvoiceDetailService {
  async saveDatail(dataDtail: InvoiceDetail[]) {
    return await DetailInvoice.createMany(dataDtail)
  }
}

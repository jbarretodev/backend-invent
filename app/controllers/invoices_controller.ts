import InvoiceDetailService from '#services/invoice_controller_service'
import InvoiceService from '#services/invoice_service'
import { makeInvoice } from '#validators/invoice'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { InvoiceCreate } from '../@types/index.js'

@inject()
export default class InvoicesController {
  constructor(
    protected invoiceService: InvoiceService,
    protected invoiceDetailService: InvoiceDetailService
  ) {}

  async makeInvoice(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(makeInvoice)
    const body = { ...payload.invoice, user_id: ctx.auth.user?.id }
    const invoice = await this.invoiceService.makeInvoice(body as InvoiceCreate)

    const detailsWithIdInvoice = payload.details.map((detail) => {
      return { ...detail, invoice_id: invoice.id }
    })

    const details = await this.invoiceDetailService.saveDatail(detailsWithIdInvoice)

    if (invoice) return ctx.response.created({ invoice, details })

    return ctx.response.badRequest({ error: true, message: 'try then' })
  }
}

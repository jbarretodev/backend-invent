import InvoiceDetailService from '#services/invoice_detail_service'
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

  async getInvoices(ctx: HttpContext) {
    const params = ctx.request.qs()

    if (!params.dateSearch)
      return ctx.response.badRequest({ error: true, message: 'Error request' })

    return ctx.response.ok({ invoices: await this.invoiceService.getInvoices(params.dateSearch) })
  }

  async getInvoiceDetail(ctx: HttpContext) {
    if (!ctx.request.param('id'))
      return ctx.response.badRequest({ error: true, message: 'id missing' })

    const invocesDetail = await this.invoiceService.getDetailInvoice(
      Number(ctx.request.param('id'))
    )

    return invocesDetail
      ? ctx.response.ok(invocesDetail)
      : ctx.response.notFound({ error: true, message: 'invoice not found' })
  }

  async getInvoicesConsolidated(ctx: HttpContext) {
    const qs = ctx.request.qs()

    if (!qs.date) return ctx.response.badRequest({ error: true, message: 'date is missing' })

    const invoices = await this.invoiceService.getInvoicesConsolidated(ctx.request.qs().date)

    const sum = invoices.reduce((acc, invoice) => acc + Number(invoice.total_invoice), 0)

    return ctx.response.ok({
      invoices_consolidate: sum,
      count_invoices: invoices.length,
      invoices: invoices,
      invoices_not_paid: invoices.filter((invoice) => invoice.status === false).length,
      invoices_paid: invoices.filter((invoice) => invoice.status === true).length,
    })
  }
}

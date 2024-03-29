import ProductService from '#services/product_service'
import { createOperationProductValidator } from '#validators/product_history'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { ErrorOpeHistoryProduct, HistoryProductCreate } from './../@types/index.js'
import HistoryProductService from '#services/history_product_service'

@inject()
export default class ProductsHistoriesController {
  constructor(
    protected productService: ProductService,
    protected historyProductService: HistoryProductService
  ) {}
  async newOperationProduct(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createOperationProductValidator)

    payload.user_id = ctx.auth.user?.id

    const rsCheck = await this.productService.updateStockProduct(
      payload.product_id,
      payload.quantity,
      payload.type_op
    )

    if (!rsCheck) return ctx.response.notFound({ error: true, message: 'product not found' })

    if ((rsCheck as ErrorOpeHistoryProduct).errorOpe)
      return ctx.response.badRequest({
        error: true,
        message: (rsCheck as ErrorOpeHistoryProduct).message,
      })

    const rsHistory = await this.historyProductService.saveHistory(payload as HistoryProductCreate)

    return ctx.response.created({ historyProduct: rsHistory })
  }

  async historyOperations(ctx: HttpContext) {
    const qs = ctx.request.qs()

    return ctx.response.ok({
      historyOperations: await this.historyProductService.getHistoryOperation(qs.date),
    })
  }
}

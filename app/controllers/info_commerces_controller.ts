import InfoCommerceServide from '#services/info_commerce_service'
import { commerceCreate } from '#validators/commerce_create'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class InfoCommercesController {
  constructor(protected infoCommerceService: InfoCommerceServide) {}
  async getInfoCommerce(ctx: HttpContext) {
    const commerce = await this.infoCommerceService.getInfoCommerce()

    return commerce
      ? ctx.response.ok(commerce)
      : ctx.response.notFound({ error: true, message: 'commerce not found' })
  }

  async updateInfoCommerce(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(commerceCreate)

    const commerce = await this.infoCommerceService.updateInfoCommerce(payload)

    return ctx.response.ok((await commerce.refresh()).serialize())
  }
}

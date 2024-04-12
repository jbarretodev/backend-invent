import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import Util from '../utils/Util.js'
import { inject } from '@adonisjs/core'
import ProductService from '#services/product_service'
import { ProductCreate } from '../@types/index.js'

@inject()
export default class ProductsController {
  constructor(protected productService: ProductService) {}

  async createProduct(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(createProductValidator)

    payload.code = Util.generateRandomHash()

    const product = await this.productService.createNewProduct(
      payload as ProductCreate,
      ctx.auth.user?.id
    )

    return ctx.response.created({ product })
  }

  async getProductByCode(ctx: HttpContext) {
    const product = await this.productService.getProductByCode(ctx.request.param('code'))

    return product
      ? ctx.response.ok({ product })
      : ctx.response.notFound({ error: true, message: 'product not found' })
  }

  async getProductById(ctx: HttpContext) {
    const product = await this.productService.getProductById(ctx.request.param('id'))

    return product
      ? ctx.response.ok(product.serialize())
      : ctx.response.notFound({ error: true, message: 'product not found' })
  }

  async getProduct(ctx: HttpContext) {
    return ctx.response.ok({ products: await this.productService.getProducts() })
  }

  async searcherProduct(ctx: HttpContext) {
    const queryString = ctx.request.qs()

    if (!Object.keys(queryString).includes('searcher'))
      return ctx.response.badRequest({ error: true, message: 'there is no params' })

    return ctx.response.ok({
      products: await this.productService.searcherProducts(queryString.searcher),
    })
  }

  async changePriceProduct(ctx: HttpContext) {
    const newPrice = ctx.request.input('price')

    if (!newPrice) return ctx.response.badRequest({ error: true, message: 'price is missing' })

    const rs = await this.productService.changePriceProduct(
      Number(ctx.request.param('id')),
      Number(newPrice)
    )

    if (!rs) return ctx.response.badRequest({ error: true, message: 'error changing price' })

    return ctx.response.ok(rs)
  }

  async changeNameProduct(ctx: HttpContext) {
    const newName = ctx.request.input('name')

    if (!newName) return ctx.response.badRequest({ error: true, message: 'error name is missing' })

    const rs = await this.productService.changeNameProduct(Number(ctx.request.param('id')), newName)

    if (!rs) return ctx.response.badRequest({ error: true, message: 'error changing name' })

    return ctx.response.ok(rs)
  }

  async changeSellByProduct(ctx: HttpContext) {
    const mode = ctx.request.input('mode')

    if (!mode) return ctx.response.badRequest({ error: true, message: 'error mode is missing' })

    const rs = await this.productService.changeSellByProduct(Number(ctx.request.param('id')), mode)

    if (!rs) return ctx.response.badRequest({ error: true, message: 'error changing mode' })

    return ctx.response.ok(rs)
  }

  async changeIsExempt(ctx: HttpContext) {
    const isExempt = ctx.request.input('exempt')

    if (!ctx.request.hasBody())
      return ctx.response.badRequest({ error: true, message: 'error isExempt is missing' })

    const rs = await this.productService.changeIsExempt(Number(ctx.request.param('id')), isExempt)

    if (!rs) return ctx.response.badRequest({ error: true, message: 'error changing isExempt' })

    return ctx.response.ok(rs)
  }
}

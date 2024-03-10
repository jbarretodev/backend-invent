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

    const product = await this.productService.createNewProduct(payload as ProductCreate)

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
      ? ctx.response.ok({ product })
      : ctx.response.notFound({ error: true, message: 'product not found' })
  }

  async getProduct(ctx: HttpContext) {
    return ctx.response.ok({ products: await this.productService.getProducts() })
  }
}

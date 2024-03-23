import Product from '#models/product'
import { escape } from 'querystring'
import { ErrorOpeHistoryProduct, ProductCreate } from '../@types/index.js'
import db from '@adonisjs/lucid/services/db'
import HistoryProductService from './history_product_service.js'

export default class ProductService {
  async createNewProduct(dataProduct: ProductCreate, userId: number | undefined) {
    const product = await Product.create(dataProduct)
    const history = new HistoryProductService()

    await history.saveHistory({
      product_id: product.id,
      user_id: userId as number,
      quantity: product.quantity,
      type_op: 1,
    })

    return product
  }

  async getProductByCode(code: string) {
    return await Product.findBy('code', code)
  }

  async getProducts() {
    return await Product.all()
  }

  async getProductById(id: number) {
    return await Product.find(id)
  }

  async updateStockProduct(id: number, quantity: number, typeOp: number) {
    const product = await Product.find(id)

    if (!product) return null

    if (typeOp === 0 && product.quantity < quantity) {
      return {
        errorOpe: true,
        message: 'the stock is less that quantity!',
      } as ErrorOpeHistoryProduct
    }

    product.quantity = typeOp === 1 ? product.quantity + quantity : product.quantity - quantity

    return await product.save()
  }

  async searcherProducts(searchString: string) {
    // return await Product.query()
    //   .whereILike('name', `%${searchString}%`)
    //   .orderBy('name', 'desc')

    return await db
      .query()
      .from('products')
      .select('name', 'id', 'price', 'quantity')
      .whereILike('name', `%${escape(searchString)}%`)
  }

  async changePriceProduct(id: number, newPrice: number) {
    const product = await Product.find(id)

    if (!product) return undefined

    await product.merge({ price: newPrice }).save()

    return product.serialize()
  }

  async changeNameProduct(id: number, newName: string) {
    const product = await Product.find(id)

    if (!product) return undefined

    await product.merge({ name: newName }).save()

    return product.serialize()
  }

  async changeSellByProduct(id: number, mode: string) {
    const product = await Product.find(id)

    if (!product) return undefined

    await product.merge({ sell_by: mode }).save()

    return product.serialize()
  }
}

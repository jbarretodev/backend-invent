import Product from '#models/product'
import { ErrorOpeHistoryProduct, ProductCreate } from '../@types/index.js'

export default class ProductService {
  async createNewProduct(dataProduct: ProductCreate) {
    return await Product.create(dataProduct)
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

  async updateAccountProduct(id: number, quantity: number, typeOp: number) {
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
}

import HistoryProduct from '#models/history_product'
import { HistoryProductCreate } from '../@types/index.js'

export default class HistoryProductService {
  async saveHistory(dataHistory: HistoryProductCreate) {
    return await HistoryProduct.create(dataHistory)
  }

  async getHistoryOperation(date:string) {
    return await HistoryProduct.query().where('date','<=',date)
      .preload('product')
      .preload('user')
      .orderBy('createdAt', 'desc')
  }
}

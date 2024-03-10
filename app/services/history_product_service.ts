import HistoryProduct from '#models/history_product'
import { HistoryProductCreate } from '../@types/index.js'

export default class HistoryProductService {
  async saveHistory(dataHistory: HistoryProductCreate) {
    return await HistoryProduct.create(dataHistory)
  }
}

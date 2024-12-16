import HistoryProduct from '#models/history_product';
export default class HistoryProductService {
    async saveHistory(dataHistory) {
        return await HistoryProduct.create(dataHistory);
    }
    async getHistoryOperation(date) {
        return await HistoryProduct.query()
            .where('date', '<=', date)
            .preload('product')
            .preload('user')
            .orderBy('createdAt', 'desc');
    }
}
//# sourceMappingURL=history_product_service.js.map
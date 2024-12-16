import Product from '#models/product';
import { escape } from 'querystring';
import db from '@adonisjs/lucid/services/db';
import HistoryProductService from './history_product_service.js';
export default class ProductService {
    async createNewProduct(dataProduct, userId) {
        const product = await Product.create(dataProduct);
        const history = new HistoryProductService();
        await history.saveHistory({
            product_id: product.id,
            user_id: userId,
            quantity: product.quantity,
            type_op: 1,
        });
        return product;
    }
    async getProductByCode(code) {
        return await Product.findBy('code', code);
    }
    async getProducts() {
        return await Product.all();
    }
    async getProductById(id) {
        return await Product.find(id);
    }
    async updateStockProduct(id, quantity, typeOp) {
        const product = await Product.find(id);
        if (!product)
            return null;
        if (typeOp === 0 && product.quantity < quantity) {
            return {
                errorOpe: true,
                message: 'the stock is less that quantity!',
            };
        }
        product.quantity = typeOp === 1 ? product.quantity + quantity : product.quantity - quantity;
        return await product.save();
    }
    async searcherProducts(searchString) {
        return await db
            .query()
            .from('products')
            .select('name', 'id', 'price', 'quantity', 'sell_by', 'exempt')
            .whereILike('name', `%${escape(searchString)}%`);
    }
    async changePriceProduct(id, newPrice) {
        const product = await Product.find(id);
        if (!product)
            return undefined;
        await product.merge({ price: newPrice }).save();
        return product.serialize();
    }
    async changeNameProduct(id, newName) {
        const product = await Product.find(id);
        if (!product)
            return undefined;
        await product.merge({ name: newName }).save();
        return product.serialize();
    }
    async changeSellByProduct(id, mode) {
        const product = await Product.find(id);
        if (!product)
            return undefined;
        await product.merge({ sell_by: mode }).save();
        return product.serialize();
    }
    async changeIsExempt(id, newValue) {
        const product = await Product.find(id);
        if (!product)
            return undefined;
        product.exempt = newValue;
        await product.save();
        return product.serialize();
    }
}
//# sourceMappingURL=product_service.js.map
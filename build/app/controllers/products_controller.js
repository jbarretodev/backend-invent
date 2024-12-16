var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createProductValidator } from '#validators/product';
import Util from '../utils/Util.js';
import { inject } from '@adonisjs/core';
import ProductService from '#services/product_service';
let ProductsController = class ProductsController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(ctx) {
        const payload = await ctx.request.validateUsing(createProductValidator);
        payload.code = Util.generateRandomHash();
        const product = await this.productService.createNewProduct(payload, ctx.auth.user?.id);
        return ctx.response.created({ product });
    }
    async getProductByCode(ctx) {
        const product = await this.productService.getProductByCode(ctx.request.param('code'));
        return product
            ? ctx.response.ok({ product })
            : ctx.response.notFound({ error: true, message: 'product not found' });
    }
    async getProductById(ctx) {
        const product = await this.productService.getProductById(ctx.request.param('id'));
        return product
            ? ctx.response.ok(product.serialize())
            : ctx.response.notFound({ error: true, message: 'product not found' });
    }
    async getProduct(ctx) {
        return ctx.response.ok({ products: await this.productService.getProducts() });
    }
    async searcherProduct(ctx) {
        const queryString = ctx.request.qs();
        if (!Object.keys(queryString).includes('searcher'))
            return ctx.response.badRequest({ error: true, message: 'there is no params' });
        return ctx.response.ok({
            products: await this.productService.searcherProducts(queryString.searcher),
        });
    }
    async changePriceProduct(ctx) {
        const newPrice = ctx.request.input('price');
        if (!newPrice)
            return ctx.response.badRequest({ error: true, message: 'price is missing' });
        const rs = await this.productService.changePriceProduct(Number(ctx.request.param('id')), Number(newPrice));
        if (!rs)
            return ctx.response.badRequest({ error: true, message: 'error changing price' });
        return ctx.response.ok(rs);
    }
    async changeNameProduct(ctx) {
        const newName = ctx.request.input('name');
        if (!newName)
            return ctx.response.badRequest({ error: true, message: 'error name is missing' });
        const rs = await this.productService.changeNameProduct(Number(ctx.request.param('id')), newName);
        if (!rs)
            return ctx.response.badRequest({ error: true, message: 'error changing name' });
        return ctx.response.ok(rs);
    }
    async changeSellByProduct(ctx) {
        const mode = ctx.request.input('mode');
        if (!mode)
            return ctx.response.badRequest({ error: true, message: 'error mode is missing' });
        const rs = await this.productService.changeSellByProduct(Number(ctx.request.param('id')), mode);
        if (!rs)
            return ctx.response.badRequest({ error: true, message: 'error changing mode' });
        return ctx.response.ok(rs);
    }
    async changeIsExempt(ctx) {
        const isExempt = ctx.request.input('exempt');
        if (!ctx.request.hasBody())
            return ctx.response.badRequest({ error: true, message: 'error isExempt is missing' });
        const rs = await this.productService.changeIsExempt(Number(ctx.request.param('id')), isExempt);
        if (!rs)
            return ctx.response.badRequest({ error: true, message: 'error changing isExempt' });
        return ctx.response.ok(rs);
    }
};
ProductsController = __decorate([
    inject(),
    __metadata("design:paramtypes", [ProductService])
], ProductsController);
export default ProductsController;
//# sourceMappingURL=products_controller.js.map
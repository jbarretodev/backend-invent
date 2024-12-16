var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import ProductService from '#services/product_service';
import { createOperationProductValidator } from '#validators/product_history';
import { inject } from '@adonisjs/core';
import HistoryProductService from '#services/history_product_service';
let ProductsHistoriesController = class ProductsHistoriesController {
    productService;
    historyProductService;
    constructor(productService, historyProductService) {
        this.productService = productService;
        this.historyProductService = historyProductService;
    }
    async newOperationProduct(ctx) {
        const payload = await ctx.request.validateUsing(createOperationProductValidator);
        payload.user_id = ctx.auth.user?.id;
        const rsCheck = await this.productService.updateStockProduct(payload.product_id, payload.quantity, payload.type_op);
        if (!rsCheck)
            return ctx.response.notFound({ error: true, message: 'product not found' });
        if (rsCheck.errorOpe)
            return ctx.response.badRequest({
                error: true,
                message: rsCheck.message,
            });
        const rsHistory = await this.historyProductService.saveHistory(payload);
        return ctx.response.created({ historyProduct: rsHistory });
    }
    async historyOperations(ctx) {
        const qs = ctx.request.qs();
        return ctx.response.ok({
            historyOperations: await this.historyProductService.getHistoryOperation(qs.date),
        });
    }
};
ProductsHistoriesController = __decorate([
    inject(),
    __metadata("design:paramtypes", [ProductService,
        HistoryProductService])
], ProductsHistoriesController);
export default ProductsHistoriesController;
//# sourceMappingURL=products_histories_controller.js.map
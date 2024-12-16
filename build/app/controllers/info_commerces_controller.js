var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import InfoCommerceServide from '#services/info_commerce_service';
import { commerceCreate } from '#validators/commerce_create';
import { inject } from '@adonisjs/core';
let InfoCommercesController = class InfoCommercesController {
    infoCommerceService;
    constructor(infoCommerceService) {
        this.infoCommerceService = infoCommerceService;
    }
    async getInfoCommerce(ctx) {
        const commerce = await this.infoCommerceService.getInfoCommerce();
        return commerce
            ? ctx.response.ok(commerce)
            : ctx.response.notFound({ error: true, message: 'commerce not found' });
    }
    async updateInfoCommerce(ctx) {
        const payload = await ctx.request.validateUsing(commerceCreate);
        const commerce = await this.infoCommerceService.updateInfoCommerce(payload);
        return ctx.response.ok((await commerce.refresh()).serialize());
    }
};
InfoCommercesController = __decorate([
    inject(),
    __metadata("design:paramtypes", [InfoCommerceServide])
], InfoCommercesController);
export default InfoCommercesController;
//# sourceMappingURL=info_commerces_controller.js.map
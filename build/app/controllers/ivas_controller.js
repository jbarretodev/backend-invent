var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import IvaService from '#services/iva_service';
import { ivaCreate } from '#validators/iva_create';
import { inject } from '@adonisjs/core';
let IvasController = class IvasController {
    ivaService;
    constructor(ivaService) {
        this.ivaService = ivaService;
    }
    async getCurrentInfoIva(ctx) {
        const iva = await this.ivaService.getCurrentInfoIva();
        if (!iva)
            return ctx.response.notFound({ error: true, message: 'no iva' });
        return ctx.response.ok(iva);
    }
    async createNewValueIva(ctx) {
        const payload = await ctx.request.validateUsing(ivaCreate);
        const prevIva = await this.ivaService.getCurrentInfoIva();
        if (prevIva)
            this.ivaService.changeStatusIva(prevIva.id);
        const newIva = await this.ivaService.createNewValueIva(payload);
        return ctx.response.created(newIva);
    }
};
IvasController = __decorate([
    inject(),
    __metadata("design:paramtypes", [IvaService])
], IvasController);
export default IvasController;
//# sourceMappingURL=ivas_controller.js.map
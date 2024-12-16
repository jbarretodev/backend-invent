var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Iva from '#models/iva';
import { inject } from '@adonisjs/core';
let IvaService = class IvaService {
    async getCurrentInfoIva() {
        const iva = await Iva.query().where('active', true).first();
        if (!iva)
            return undefined;
        return iva.serialize();
    }
    async changeStatusIva(id) {
        const iva = await Iva.query().where('id', id).first();
        if (!iva)
            return undefined;
        iva.active = !iva.active;
        return iva.save();
    }
    async createNewValueIva(dataIva) {
        return (await Iva.create(dataIva)).serialize();
    }
};
IvaService = __decorate([
    inject()
], IvaService);
export default IvaService;
//# sourceMappingURL=iva_service.js.map
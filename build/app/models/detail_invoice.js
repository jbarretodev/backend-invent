var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm';
import Invoice from './invoice.js';
import Product from './product.js';
export default class DetailInvoice extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "invoice_id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "product_id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "quantity", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "unit_price", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "total_line", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], DetailInvoice.prototype, "iva", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], DetailInvoice.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], DetailInvoice.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Invoice, {
        foreignKey: 'invoice_id',
    }),
    __metadata("design:type", Object)
], DetailInvoice.prototype, "invoice", void 0);
__decorate([
    belongsTo(() => Product, {
        foreignKey: 'product_id',
    }),
    __metadata("design:type", Object)
], DetailInvoice.prototype, "products", void 0);
//# sourceMappingURL=detail_invoice.js.map
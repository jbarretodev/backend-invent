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
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import HistoryProduct from './history_product.js';
import DetailInvoice from './detail_invoice.js';
export default class Product extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Product.prototype, "exempt", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "sell_by", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Product.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Product.prototype, "updatedAt", void 0);
__decorate([
    hasMany(() => HistoryProduct),
    __metadata("design:type", Object)
], Product.prototype, "historyProducs", void 0);
__decorate([
    hasMany(() => DetailInvoice),
    __metadata("design:type", Object)
], Product.prototype, "detail_invoice", void 0);
//# sourceMappingURL=product.js.map
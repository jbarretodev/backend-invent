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
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm';
import DetailInvoice from './detail_invoice.js';
import User from './user.js';
import Client from './client.js';
export default class Invoice extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Invoice.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Invoice.prototype, "total_invoice", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Invoice.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Invoice.prototype, "user_id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Invoice.prototype, "client_id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Invoice.prototype, "num_operation", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Invoice.prototype, "payment_method", void 0);
__decorate([
    column.date(),
    __metadata("design:type", DateTime)
], Invoice.prototype, "date", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Invoice.prototype, "subtotal", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Invoice.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Invoice.prototype, "updatedAt", void 0);
__decorate([
    hasMany(() => DetailInvoice, {
        foreignKey: 'invoice_id',
    }),
    __metadata("design:type", Object)
], Invoice.prototype, "detail_invoice", void 0);
__decorate([
    belongsTo(() => User, {
        foreignKey: 'user_id',
    }),
    __metadata("design:type", Object)
], Invoice.prototype, "user", void 0);
__decorate([
    belongsTo(() => Client, {
        foreignKey: 'client_id',
    }),
    __metadata("design:type", Object)
], Invoice.prototype, "client", void 0);
//# sourceMappingURL=invoice.js.map
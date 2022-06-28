"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentHistory = void 0;
const typegoose_1 = require("@typegoose/typegoose");
class paymentHistory {
}
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "idPsychologist", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "idClient", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    __metadata("design:type", Number)
], paymentHistory.prototype, "amount", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "currency", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Number }),
    __metadata("design:type", Number)
], paymentHistory.prototype, "celphone", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String }),
    __metadata("design:type", String)
], paymentHistory.prototype, "psyName", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'Card' }),
    __metadata("design:type", String)
], paymentHistory.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], paymentHistory.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], paymentHistory.prototype, "status", void 0);
exports.paymentHistory = paymentHistory;
const paymentHistoryModel = (0, typegoose_1.getModelForClass)(paymentHistory);
exports.default = paymentHistoryModel;

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
exports.appointment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const userPsychologist_1 = require("./userPsychologist");
const userClients_1 = require("./userClients");
const paymentHistory_1 = require("./paymentHistory");
class appointment {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => paymentHistory_1.paymentHistory }),
    __metadata("design:type", Object)
], appointment.prototype, "payment", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], appointment.prototype, "date", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], appointment.prototype, "hour", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], appointment.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: String, required: true, trim: true }),
    __metadata("design:type", String)
], appointment.prototype, "IdSchedule", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => userClients_1.userClient }),
    __metadata("design:type", Object)
], appointment.prototype, "IdUserClient", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => userPsychologist_1.userPsychologist }),
    __metadata("design:type", Object)
], appointment.prototype, "IdUserPsychologist", void 0);
exports.appointment = appointment;
const appointmentModel = (0, typegoose_1.getModelForClass)(appointment);
exports.default = appointmentModel;

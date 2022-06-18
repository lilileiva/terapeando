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
exports.Schedule = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const userPsychologist_1 = require("./userPsychologist");
let dateTime = class dateTime {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "monday", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "tuesday", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "wensday", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "thursday", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "friday", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "saturday", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], dateTime.prototype, "sunday", void 0);
dateTime = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            _id: false,
        }
    })
], dateTime);
class Schedule {
}
__decorate([
    (0, typegoose_1.prop)({ ref: () => userPsychologist_1.userPsychologist }),
    __metadata("design:type", Object)
], Schedule.prototype, "idUserPsychologist", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [dateTime] }),
    __metadata("design:type", Array)
], Schedule.prototype, "dateTime", void 0);
exports.Schedule = Schedule;
const scheduleModel = (0, typegoose_1.getModelForClass)(Schedule);
exports.default = scheduleModel;

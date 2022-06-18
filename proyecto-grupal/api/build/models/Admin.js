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
exports.Admin = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcrypt = require('bcryptjs');
const saltRounds = Number(process.env.SALTROUNDS);
let Admin = class Admin {
};
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true
    }),
    __metadata("design:type", String)
], Admin.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Admin.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 8 }),
    __metadata("design:type", String)
], Admin.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    }),
    __metadata("design:type", String)
], Admin.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Admin.prototype, "role", void 0);
Admin = __decorate([
    (0, typegoose_1.pre)('save', function (next) {
        if (this.isModified('password')) {
            bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
                if (err)
                    next(err);
                else
                    this.password = hashedPassword;
                next();
            });
        }
        else {
            next();
        }
    })
], Admin);
exports.Admin = Admin;
const adminModel = (0, typegoose_1.getModelForClass)(Admin);
exports.default = adminModel;

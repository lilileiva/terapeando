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
exports.userClient = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcrypt = require('bcryptjs');
const saltRounds = Number(process.env.SALTROUNDS);
let userClient = class userClient {
};
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true
        // ,
        // validate: {
        //   validator: (firstName: string) => {
        //     const nameRegExp = /^[A-Za-z]+$/;
        //     return nameRegExp.test(firstName);
        //   },
        //   message: 'Name is invalid.',
        // }
    }),
    __metadata("design:type", String)
], userClient.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], userClient.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({ trim: true }),
    __metadata("design:type", String)
], userClient.prototype, "birthDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userClient.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, minlength: 8 }),
    __metadata("design:type", String)
], userClient.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({
        unique: true,
        required: true,
        lowercase: true,
        trim: true
        // ,
        // validate: {
        //   validator: (email: string) => {
        //     const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return emailRegExp.test(email);
        //   },
        //   message: 'Email is invalid.',
        // }
    }),
    __metadata("design:type", String)
], userClient.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userClient.prototype, "profileImage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], userClient.prototype, "role", void 0);
userClient = __decorate([
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
], userClient);
exports.userClient = userClient;
const userClientModel = (0, typegoose_1.getModelForClass)(userClient);
exports.default = userClientModel;

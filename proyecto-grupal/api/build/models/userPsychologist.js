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
exports.userPsychologist = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const bcrypt = require('bcryptjs');
const saltRounds = Number(process.env.SALTROUNDS);
let userPsychologist = class userPsychologist {
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
], userPsychologist.prototype, "firstName", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        trim: true
        // ,
        // validate: {
        //   validator: (lastName: string) => {
        //     const nameRegExp = /^[A-Za-z]+$/;
        //     return nameRegExp.test(lastName);
        //   },
        //   message: 'Name is invalid.',
        // }
    }),
    __metadata("design:type", String)
], userPsychologist.prototype, "lastName", void 0);
__decorate([
    (0, typegoose_1.prop)({
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: (email) => {
                const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegExp.test(email);
            },
            message: 'Email is invalid.',
        }
    }),
    __metadata("design:type", String)
], userPsychologist.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: false, required: true, minlength: 8 }),
    __metadata("design:type", String)
], userPsychologist.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "birthDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "location", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "latitude", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "longitude", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "License", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], userPsychologist.prototype, "about", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], userPsychologist.prototype, "education", void 0);
__decorate([
    (0, typegoose_1.prop)({ unique: true, required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "DNI", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], userPsychologist.prototype, "Specialties", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], userPsychologist.prototype, "profileImage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], userPsychologist.prototype, "rating", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], userPsychologist.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], userPsychologist.prototype, "psychologistStatus", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], userPsychologist.prototype, "role", void 0);
userPsychologist = __decorate([
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
], userPsychologist);
exports.userPsychologist = userPsychologist;
const userPsychologistModel = (0, typegoose_1.getModelForClass)(userPsychologist);
exports.default = userPsychologistModel;

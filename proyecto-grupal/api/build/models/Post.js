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
const typegoose_1 = require("@typegoose/typegoose");
const userPsychologist_1 = require("./userPsychologist");
class Post {
}
__decorate([
    (0, typegoose_1.prop)({ default: Date.now() }),
    __metadata("design:type", String)
], Post.prototype, "Date", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Post.prototype, "Title", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Post.prototype, "Content", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Post.prototype, "Image", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Array)
], Post.prototype, "Tags", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Date.now() }),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => userPsychologist_1.userPsychologist }),
    __metadata("design:type", Object)
], Post.prototype, "idUserPsychologist", void 0);
const postModel = (0, typegoose_1.getModelForClass)(Post);
exports.default = postModel;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("./signIn"));
const { registerAdmin } = require("./adminController");
const adminRouter = (0, express_1.Router)();
adminRouter.post("/logIn", signIn_1.default);
adminRouter.post("/signUp", registerAdmin);
module.exports = adminRouter;

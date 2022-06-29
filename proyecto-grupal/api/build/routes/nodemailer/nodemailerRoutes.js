"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { ForgotPassword } = require('./nodemailer.ts');
const nodemailerRoutes = (0, express_1.Router)();
nodemailerRoutes.put("/rememberpassword", ForgotPassword);
module.exports = nodemailerRoutes;

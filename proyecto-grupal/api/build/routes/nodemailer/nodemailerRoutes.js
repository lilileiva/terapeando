"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { ForgotPassword, registerConfirmationEmail } = require('./nodemailer.ts');
const nodemailerRoutes = (0, express_1.Router)();
nodemailerRoutes.post('/confirmation-email', registerConfirmationEmail);
nodemailerRoutes.put("/rememberpassword", ForgotPassword);
module.exports = nodemailerRoutes;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
<<<<<<< HEAD
const { forgotPasswordPsychologist, ForgotPasswordClient, ForgotPassword } = require('./nodemailer.ts');
const validatePsychologist = require('../../middleware/validatePsychologist');
const validateClient = require('../../middleware/validateClient');
const nodemailerRoutes = (0, express_1.Router)();
nodemailerRoutes.put('/rememberpassword', ForgotPassword);
=======
const { ForgotPassword, registerConfirmationEmail } = require('./nodemailer.ts');
const nodemailerRoutes = (0, express_1.Router)();
nodemailerRoutes.post('/confirmation-email', registerConfirmationEmail);
nodemailerRoutes.put("/rememberpassword", ForgotPassword);
>>>>>>> 8424f811845507213321a3bb74eda39f9f0abbcf
module.exports = nodemailerRoutes;

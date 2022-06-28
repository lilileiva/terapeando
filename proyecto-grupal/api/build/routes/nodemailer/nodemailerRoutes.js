"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { forgotPasswordPsychologist, ForgotPasswordClient, ForgotPassword } = require('./nodemailer.ts');
const validatePsychologist = require('../../middleware/validatePsychologist');
const validateClient = require('../../middleware/validateClient');
const nodemailerRoutes = (0, express_1.Router)();
nodemailerRoutes.put('/rememberpassword', ForgotPassword);
module.exports = nodemailerRoutes;

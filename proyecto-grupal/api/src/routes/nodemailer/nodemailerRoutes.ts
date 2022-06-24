import { Router } from "express";
const { forgotPasswordPsychologist, ForgotPasswordClient, ForgotPassword } = require('./nodemailer.ts')
const validatePsychologist = require ('../../middleware/validatePsychologist')
const validateClient = require ('../../middleware/validateClient')
const nodemailerRoutes: Router = Router();

nodemailerRoutes.put('/rememberpassword', ForgotPassword);

module.exports = nodemailerRoutes;
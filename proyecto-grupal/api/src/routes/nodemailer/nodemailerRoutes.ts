import { Router } from "express";
const { forgotPasswordPsychologist, ForgotPasswordClient, forgotPassword } = require('./nodemailer.ts')
const validatePsychologist = require ('../../middleware/validatePsychologist')
const validateClient = require ('../../middleware/validateClient')
const nodemailerRoutes: Router = Router();

//nodemailerRoutes.post('/confirmation-email', registerConfirmationEmail);
nodemailerRoutes.put('/rememberpassword/psychologist', validatePsychologist, forgotPasswordPsychologist);
nodemailerRoutes.put('/rememberpassword/client', validateClient, ForgotPasswordClient);
nodemailerRoutes.put('/rememberpassword', forgotPassword);

module.exports = nodemailerRoutes;
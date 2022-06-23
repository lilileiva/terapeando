import { Router } from "express";
const { forgotPasswordPsychologist, ForgotPasswordClient } = require('./nodemailer.ts')
const validatePsychologist = require ('../../middleware/validatePsychologist')
const validateClient = require ('../../middleware/validateClient')
const nodemailerRoutes: Router = Router();

//nodemailerRoutes.post('/confirmation-email', registerConfirmationEmail);
nodemailerRoutes.put('/rememberpassword/psychologist', validatePsychologist, forgotPasswordPsychologist);
nodemailerRoutes.put('/rememberpassword/client', validateClient, ForgotPasswordClient);

module.exports = nodemailerRoutes;
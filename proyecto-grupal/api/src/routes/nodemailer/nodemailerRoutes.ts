import { Router } from "express";
const { ForgotPassword, registerConfirmationEmail } = require('./nodemailer.ts')

const nodemailerRoutes: Router = Router();

nodemailerRoutes.post('/confirmation-email', registerConfirmationEmail);
nodemailerRoutes.put('/remember', ForgotPassword);

module.exports = nodemailerRoutes;
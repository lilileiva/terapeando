import { Router } from "express";
const { postSendEmail } = require('./nodemailer.ts');

const nodemailerRoutes: Router = Router();

nodemailerRoutes.post('/send-email', postSendEmail);
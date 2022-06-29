import {Router} from "express";
const {ForgotPassword } = require('./nodemailer.ts');



const nodemailerRoutes: Router = Router();

nodemailerRoutes.put("/rememberpassword", ForgotPassword);


module.exports = nodemailerRoutes;
import {Router} from "express";
const {ForgotPassword} = require('./Remember.ts');



const rememberRouter: Router = Router();


rememberRouter.post("/remember", ForgotPassword);


module.exports = rememberRouter;
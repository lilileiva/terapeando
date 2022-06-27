import { Router } from "express";
import logInClient from "./signIn";
const {
    getUserClient,
    createUserClient,
    deleteUserClient,
    putUserClient,
    getPsychologistDetails,
    googleLogin
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClient')
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validateAdmin = require('../../middleware/ValidateAdminToken')
import { Request, Response } from "express";
const passport = require('passport')
const clientRouter: Router = Router();


clientRouter.get('/auth/google/callback', passport.authenticate('google', {successReturnToOrRedirect: "http://localhost:3000/home" }),(req, res) => {res.send("te autenticaste con google")})
clientRouter.get('/google', passport.authenticate('google', { scope: ['profile','email']}))
clientRouter.get('/client',validateClient, getUserClient);
clientRouter.get('/:IdUserPsychologist', validateClient ,getPsychologistDetails)
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient)
clientRouter.put('/editprofile', validateClient, putUserClient)

//Falta middleware solo de admin
module.exports = clientRouter;  
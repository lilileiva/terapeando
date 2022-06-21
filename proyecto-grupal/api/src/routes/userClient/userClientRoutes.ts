import { Router } from "express";
import logInClient from "./signIn";
const {
    getUserClient,
    createUserClient,
    deleteUserClient,
    getPsychologistDetails,
    putUserClient
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClient')
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validateAdmin = require('../../middleware/ValidateAdminToken')
const clientRouter: Router = Router();

clientRouter.get('/:IdUserPsychologist', validateClient ,getPsychologistDetails)
clientRouter.get('/client',validateClient, getUserClient);
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient)
clientRouter.put('/editprofile', validateClient ,putUserClient)

//Falta middleware solo de admin
module.exports = clientRouter;
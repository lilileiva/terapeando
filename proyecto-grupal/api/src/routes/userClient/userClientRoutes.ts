import { Router } from "express";
import logInClient from "./signIn";
const {
    getUserClient,
    createUserClient,
    deleteUserClient,
<<<<<<< HEAD
    putUserClient,
    getPsychologistDetails
=======
    getPsychologistDetails,
    putUserClient
>>>>>>> d91f390 (fixed detail para demo)
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClient')
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validateAdmin = require('../../middleware/ValidateAdminToken')
const clientRouter: Router = Router();
<<<<<<< HEAD
=======

clientRouter.get('/:IdUserPsychologist', validateClient ,getPsychologistDetails)
>>>>>>> d91f390 (fixed detail para demo)
clientRouter.get('/client',validateClient, getUserClient);
clientRouter.get('/:idUserPsychologist', validateClient , getPsychologistDetails)
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient)
clientRouter.put('/editprofile', validateClient, putUserClient)

//Falta middleware solo de admin
module.exports = clientRouter;
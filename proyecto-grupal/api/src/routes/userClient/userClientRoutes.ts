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
>>>>>>> 72ab1c4ab6697e40554c0f99c2747d6d763480cb
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClient')
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validateAdmin = require('../../middleware/ValidateAdminToken')
const clientRouter: Router = Router();
<<<<<<< HEAD
=======

clientRouter.get('/:IdUserPsychologist', validateClient ,getPsychologistDetails)
>>>>>>> 72ab1c4ab6697e40554c0f99c2747d6d763480cb
clientRouter.get('/client',validateClient, getUserClient);
clientRouter.get('/:idUserPsychologist', validateClient , getPsychologistDetails)
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient)
clientRouter.put('/editprofile', validateClient ,putUserClient)

//Falta middleware solo de admin
module.exports = clientRouter;
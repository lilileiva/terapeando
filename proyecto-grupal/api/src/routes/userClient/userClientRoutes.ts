import { Router } from "express";
import logInClient from "./signIn";
const {
    getAllUserClient,
    getUserClient,
    createUserClient,
    deleteUserClient,
    putUserClient
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClientOrAdmin')
const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const clientRouter: Router = Router();


clientRouter.get('/clients', validateAdmin, getAllUserClient);
clientRouter.get('/client/:IdUserClient', validateClient, getUserClient);
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient/:IdUserClient', validateClient, deleteUserClient)
clientRouter.put('/:IdUserClient', validateClient, putUserClient)
//Falta middleware solo de admin
module.exports = clientRouter;
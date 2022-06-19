import { Router } from "express";
import logInClient from "./signIn";
const {
    getAllUserClient,
    getUserClient,
    createUserClient,
    deleteUserClient,
    putUserClient
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClient')
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validateAdmin = require('../../middleware/ValidateAdminToken')
const clientRouter: Router = Router();


clientRouter.get('/clients', validateAdmin, getAllUserClient); // Admin path
clientRouter.get('/client/', validateClient, getUserClient);
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient/', validateClient, deleteUserClient)
clientRouter.put('/', validateClient, putUserClient)
//Falta middleware solo de admin
module.exports = clientRouter;
import { Router} from "express";
import logInClient from "./signIn";
const { getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClient.ts')
const validate = require('../../middleware/extractJWT')
const clientRouter: Router = Router();


clientRouter.get('/client/:IdUserClient', getUserClient);
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient/:IdUserClient', deleteUserClient)
clientRouter.put('/:IdUserClient',validate, putUserClient)

module.exports = clientRouter;
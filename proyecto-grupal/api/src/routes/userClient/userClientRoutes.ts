import { Router} from "express";
import logInClient from "./logIn";
const { getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClient.ts')

const clientRouter: Router = Router();


clientRouter.get('/client/:IdUserClient', getUserClient);
clientRouter.post('/client', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient/:IdUserClient', deleteUserClient)
clientRouter.put('/:IdUserClient', putUserClient)

module.exports = clientRouter;
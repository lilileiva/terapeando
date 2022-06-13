import { Router} from "express";
const { getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClient.ts')

const clientRouter: Router = Router();


clientRouter.get('/client/:IdUserClient', getUserClient);
clientRouter.post('/client', createUserClient)
clientRouter.delete('/deleteuserclient/:IdUserClient', deleteUserClient)
clientRouter.put('/:IdUserClient', putUserClient)

module.exports = clientRouter;
import { Router} from "express";
const { getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClientRoute.ts')

const clientRouter: Router = Router();


clientRouter.get('/:IdUserClient', getUserClient);
clientRouter.post('/', createUserClient)
clientRouter.delete('/deleteuserclient/:IdUserClient', deleteUserClient)
clientRouter.put('/:IdUserClient', putUserClient)

module.exports = clientRouter;
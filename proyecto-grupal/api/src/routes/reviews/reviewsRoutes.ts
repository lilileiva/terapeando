import { Router} from "express";
const {createReview , getReview } = require('./reviews');

const reviewsRouter: Router = Router();
const validateClient = require('../../middleware/validateClient')


reviewsRouter.get('/:IdUserPsychologist', validateClient, getReview) // buscar cpmo acceder siendo psicologo
reviewsRouter.post('/', validateClient, createReview)

module.exports = reviewsRouter;
import { Router} from "express";
const {createReview , getReview } = require('./reviews');

const reviewsRouter: Router = Router();
const ClientOrAdmin = require('../../middleware/validateClientOrAdmin')
const validatePsychologist = require('../../middleware/validatePsychologistOrAdmin')

reviewsRouter.get('/:IdUserPsychologist', ClientOrAdmin, getReview) // buscar cpmo acceder siendo psicologo
reviewsRouter.post('/', ClientOrAdmin, createReview)

module.exports = reviewsRouter;
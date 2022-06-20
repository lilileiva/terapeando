import { Router} from "express";
const {createReview , getReview , getReviewByUser , getReviewByPsychologist } = require('./reviews');

const reviewsRouter: Router = Router();
const ClientOrAdmin = require('../../middleware/validateClientOrAdmin')
const validatePsychologist = require('../../middleware/validatePsychologistOrAdmin')

reviewsRouter.get('/', getReview) // buscar cpmo acceder siendo psicologo
reviewsRouter.post('/', ClientOrAdmin , createReview)
reviewsRouter.get('/filter/review/:IdUserPsychologist', getReviewByPsychologist)

// poner el middleware de validar cliente o admin **  ClientOrAdmin
// ruta get params :IdUserPsychologist

module.exports = reviewsRouter;
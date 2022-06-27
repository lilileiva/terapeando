import { Router} from "express";
const {createReview , getReview , getReviewByUser , getReviewByPsychologist } = require('./reviews');

const reviewsRouter: Router = Router();
const validateClient = require('../../middleware/validateClient')
const validateUsers = require('../../middleware/validateUsers')

reviewsRouter.get('/', validateClient,  getReview) // buscar cpmo acceder siendo psicologo
// reviewsRouter.post('/:IdUserPsychologist', validateClient , createReview)
reviewsRouter.post('/:IdUserPsychologist', validateUsers , createReview)
// reviewsRouter.get('/filter/review/:IdUserPsychologist', validateClient, getReviewByPsychologist)
reviewsRouter.get('/filter/review/:IdUserPsychologist', validateUsers, getReviewByPsychologist)


module.exports = reviewsRouter;
    import { Router} from "express";
    const {createReview , getReview , getReviewByUser , getReviewByPsychologist } = require('./reviews');

    const reviewsRouter: Router = Router();
    const validateClient = require('../../middleware/validateClient')

    reviewsRouter.get('/', validateClient,  getReview) // buscar cpmo acceder siendo psicologo
    reviewsRouter.post('/:IdUserPsychologist', validateClient , createReview)
    reviewsRouter.get('/filter/review/:IdUserPsychologist', validateClient, getReviewByPsychologist)



    module.exports = reviewsRouter;
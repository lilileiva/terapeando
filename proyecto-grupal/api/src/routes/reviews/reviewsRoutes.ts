import { Router} from "express";
const {createReview , getReview } = require('./reviews');

const reviewsRouter: Router = Router();

reviewsRouter.get('/:IdUserPsychologist', getReview)
reviewsRouter.post('/', createReview)

module.exports = reviewsRouter;
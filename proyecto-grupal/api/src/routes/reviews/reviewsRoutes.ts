import { Router} from "express";
const {createReview , getReview } = require('../routes/reviews/reviews');

const reviewsRouter: Router = Router();

reviewsRouter.get('/:IdUserPsychologist', getReview)
reviewsRouter.post('/', createReview)

module.exports = reviewsRouter;
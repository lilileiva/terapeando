"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createReview, getReview, getReviewByUser, getReviewByPsychologist } = require('./reviews');
const reviewsRouter = (0, express_1.Router)();
const validateClient = require('../../middleware/validateClient');
<<<<<<< HEAD
const validateUsers = require('../../middleware/validateUsers');
reviewsRouter.get('/', validateClient, getReview); // buscar cpmo acceder siendo psicologo
// reviewsRouter.post('/:IdUserPsychologist', validateClient , createReview)
reviewsRouter.post('/:IdUserPsychologist', validateUsers, createReview);
// reviewsRouter.get('/filter/review/:IdUserPsychologist', validateClient, getReviewByPsychologist)
reviewsRouter.get('/filter/review/:IdUserPsychologist', validateUsers, getReviewByPsychologist);
=======
reviewsRouter.get('/', validateClient, getReview); // buscar cpmo acceder siendo psicologo
reviewsRouter.post('/:IdUserPsychologist', validateClient, createReview);
reviewsRouter.get('/filter/review/:IdUserPsychologist', validateClient, getReviewByPsychologist);
>>>>>>> 8424f811845507213321a3bb74eda39f9f0abbcf
module.exports = reviewsRouter;

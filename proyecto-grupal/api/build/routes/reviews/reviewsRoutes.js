"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createReview, getReview, getReviewByUser, getReviewByPsychologist } = require('./reviews');
const reviewsRouter = (0, express_1.Router)();
const validateClient = require('../../middleware/validateClient');
reviewsRouter.get('/', validateClient, getReview); // buscar cpmo acceder siendo psicologo
reviewsRouter.post('/:IdUserPsychologist', validateClient, createReview);
reviewsRouter.get('/filter/review/:IdUserPsychologist', validateClient, getReviewByPsychologist);
module.exports = reviewsRouter;

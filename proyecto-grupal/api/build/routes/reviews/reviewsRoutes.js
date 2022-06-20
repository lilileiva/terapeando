"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createReview, getReview } = require('./reviews');
const reviewsRouter = (0, express_1.Router)();
const ClientOrAdmin = require('../../middleware/validateClientOrAdmin');
const validatePsychologist = require('../../middleware/validatePsychologistOrAdmin');
reviewsRouter.get('/:IdUserPsychologist', ClientOrAdmin, getReview); // buscar cpmo acceder siendo psicologo
reviewsRouter.post('/', ClientOrAdmin, createReview);
module.exports = reviewsRouter;

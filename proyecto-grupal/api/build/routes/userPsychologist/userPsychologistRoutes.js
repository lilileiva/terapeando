"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("./signIn"));
const { getUserPsychologistOne, getUserPsychologist, getUserPsychologistByEmail, postUserPsychologist, deleteUserPsychologist, putUserPsychologist, filterPsichologistSpecialities, filterPsichologistRating } = require('./userPsychologist.ts');
const validatePychologist = require('../../middleware/validatePsychologistOrAdmin');
const validaUsers = require('../../middleware/validateUsers');
const psychologistRouter = (0, express_1.Router)();
// psychologistRouter.put('/putUsersychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/:IdUserPsychologist', getUserPsychologistOne);
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.post('/', postUserPsychologist); //registro
psychologistRouter.post('/login', signIn_1.default);
psychologistRouter.delete('/deleteuserpsychologist/:IdUserPsychologist', validatePychologist, deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist/:IdUserPsychologist', validatePychologist, putUserPsychologist);
psychologistRouter.get('/filterspecialties/specialties/:specialtie', filterPsichologistSpecialities);
psychologistRouter.get('/filterrating/rating', filterPsichologistRating);
module.exports = psychologistRouter;

import { Router } from "express";
import logInPsychologist from "./signIn";
const {
    getUserPsychologistOne,
    getUserPsychologist,
    getUserPsychologistByEmail,
    postUserPsychologist,
    deleteUserPsychologist,
    putUserPsychologist,
    filterPsichologistSpecialities,
    filterPsichologistRating,
    getUserPsychologistByStatus,
    getReviews
} = require('./userPsychologist.ts');

const validatePychologist = require ('../../middleware/validatePsychologistOrAdmin')
const validaUsers = require('../../middleware/validateUsers')
const psychologistRouter: Router = Router();


// psychologistRouter.put('/putUsersychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/:IdUserPsychologist', getUserPsychologistOne);
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.get('/status/psycologiststatus', getUserPsychologistByStatus);
psychologistRouter.post('/', postUserPsychologist); //registro
psychologistRouter.post('/login', logInPsychologist)
psychologistRouter.delete('/deleteuserpsychologist/:IdUserPsychologist', validatePychologist , deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist/:IdUserPsychologist', validatePychologist ,putUserPsychologist)
psychologistRouter.get('/filterspecialties/specialties/:specialtie', filterPsichologistSpecialities);
//psychologistRouter.get('/filterrating/rating', filterPsichologistRating);
psychologistRouter.get('/rese/reviews', getReviews);



module.exports = psychologistRouter;
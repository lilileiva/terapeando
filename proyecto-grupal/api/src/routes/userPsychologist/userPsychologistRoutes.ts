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

const validatePychologist = require ('../../middleware/validatePsychologist')
const validaUsers = require('../../middleware/validateUsers')
const psychologistRouter: Router = Router();


// psychologistRouter.put('/putUsersychologist/:IdUserPsychologist', putUserPsychologist)
// psychologistRouter.get('/', validatePychologist , getUserPsychologistOne); aca sería validación para inicio de sesión
psychologistRouter.get('/:IdUserPsychologist', getUserPsychologistOne);
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.get('/status/psycologiststatus', getUserPsychologistByStatus); //Uso admin
psychologistRouter.post('/', postUserPsychologist); //registro
psychologistRouter.post('/login', logInPsychologist)
psychologistRouter.delete('/deleteuserpsychologist/', validatePychologist , deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist/', validatePychologist ,putUserPsychologist)
psychologistRouter.get('/filterspecialties/specialties/:specialtie', filterPsichologistSpecialities);
//psychologistRouter.get('/filterrating/rating', filterPsichologistRating);
psychologistRouter.get('/rese/reviews', getReviews);



module.exports = psychologistRouter;
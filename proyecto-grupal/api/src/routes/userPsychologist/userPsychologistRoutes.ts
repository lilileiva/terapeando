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
    getPsychologistDetails
} = require('./userPsychologist.ts');

const validatePsychologist = require ('../../middleware/validatePsychologist')
const validateClient = require ('../../middleware/validateClient')
const validaUsers = require('../../middleware/validateUsers')
const psychologistRouter: Router = Router();

// psychologistRouter.get('/', validatePychologist , getUserPsychologistOne); aca sería validación para inicio de sesión
psychologistRouter.get('/profile', validatePsychologist, getUserPsychologistOne);
psychologistRouter.get('/:IdUserPsychologist', validateClient ,getPsychologistDetails)
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.get('/status/psycologiststatus', getUserPsychologistByStatus); //Uso admin
psychologistRouter.post('/', postUserPsychologist); //registro
psychologistRouter.post('/login', logInPsychologist)
psychologistRouter.delete('/deleteuserpsychologist/', validatePsychologist , deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist', validatePsychologist ,putUserPsychologist)
psychologistRouter.get('/filterspecialties/specialties/:specialtie', filterPsichologistSpecialities);
psychologistRouter.get('/filterrating/rating', filterPsichologistRating);



module.exports = psychologistRouter;
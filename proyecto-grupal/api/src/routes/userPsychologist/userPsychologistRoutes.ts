<<<<<<< HEAD
import { Router} from "express";
import logInPsychologist from "./signIn";
const {getUserPsychologistByEmail,getUserPsychologistOne ,getUserPsychologist, postUserPsychologist, deleteUserPsychologist, putUserPsychologist, filterPsichologistSpecialities, filterPsichologistRating} = require('./userPsychologist.ts');
=======
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
    filterPsichologistRating
} = require('./userPsychologist.ts');

>>>>>>> 8a8ccef561e34ccc5834e8f95982dca0511e3349

const psychologistRouter: Router = Router();


// psychologistRouter.put('/putUsersychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/:IdUserPsychologist', getUserPsychologistOne);
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.get('/email/psychologistEmail', getUserPsychologistByEmail);
psychologistRouter.post('/', postUserPsychologist);
psychologistRouter.post('/login', logInPsychologist)
psychologistRouter.delete('/deleteuserpsychologist/:IdUserPsychologist', deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/filterspecialties/specialties/:specialtie', filterPsichologistSpecialities);
psychologistRouter.get('/filterrating/rating', filterPsichologistRating);

module.exports = psychologistRouter;
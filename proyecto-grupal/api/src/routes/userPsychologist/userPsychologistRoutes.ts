import { Router} from "express";
import logInPsychologist from "./logIn";
const {getUserPsychologistOne ,getUserPsychologist, postUserPsychologist, deleteUserPsychologist, putUserPsychologist, filterPsichologistSpecialities ,filterPsichologistRating} = require('./userPsychologist.ts');

const psychologistRouter: Router = Router();


// psychologistRouter.put('/putUsersychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/:IdUserPsychologist', getUserPsychologistOne);
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.post('/', postUserPsychologist);
psychologistRouter.post('/login', logInPsychologist)
psychologistRouter.delete('/deleteuserpsychologist/:IdUserPsychologist', deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/filterspecialties/specialties/:specialtie', filterPsichologistSpecialities);
psychologistRouter.get('/filterrating/rating', filterPsichologistRating );

module.exports = psychologistRouter;
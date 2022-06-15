import { Router} from "express";
import logInPsychologist from "./logIn";
const {getUserPsychologistOne ,getUserPsychologist, postUserPsychologist, deleteUserPsychologist, putUserPsychologist} = require('./userPsychologist.ts');

const psychologistRouter: Router = Router();


// psychologistRouter.put('/putUsersychologist/:IdUserPsychologist', putUserPsychologist)
psychologistRouter.get('/:IdUserPsychologist', getUserPsychologistOne);
psychologistRouter.get('/', getUserPsychologist);
psychologistRouter.post('/', postUserPsychologist);
psychologistRouter.post('/login', logInPsychologist)
psychologistRouter.delete('/deleteuserpsychologist/:IdUserPsychologist', deleteUserPsychologist);
psychologistRouter.put('/put_userpsychologist/:IdUserPsychologist', putUserPsychologist)

module.exports = psychologistRouter;
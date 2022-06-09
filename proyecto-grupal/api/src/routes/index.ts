import { Router} from "express";

const { getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClient/userClientRoute')
const {createSchedule, getSchedule} = require('./schedule/scheduleRoute')
const {createReview , getReview } = require('../routes/reviews/reviews');
const {getPaymentHistory} = require('./paymentHistory/paymentHistory.ts');
const {createPost,getAllPosts} = require('./posts/posts');
const { deleteAppointmentModel, postAppointmentModel } = require('./appointments/appointments');
const {getUserPsychologistOne ,getUserPsychologist, postUserPsychologist, deleteUserPsychologist} = require('./userPsychologist/userPsychologist');
const router: Router = Router();


router.post('/reviews', createReview)
router.get('/reviews/:IdUserPsychologist', getReview)
router.get('/payment/:IdUserPsychologist', getPaymentHistory)
router.post('/userclient', createUserClient)
router.delete('/userclient/:IdUserClient', deleteUserClient)
router.put('/userclient/:IdUserClient', putUserClient)
router.post('/schedule', createSchedule)
router.get('/schedule/:idUserPsychologist', getSchedule)
router.get('/userclient/:IdUserClient', getUserClient);
router.post('/userclient/create', createUserClient)
router.delete('/userclient/:IdUserClient', deleteUserClient)
router.post('/schedule', createSchedule)
router.get('/userpsychologist/:IdUserPsychologist', getUserPsychologistOne);
router.get('/userpsychologist', getUserPsychologist);
router.post('/userpsychologist', postUserPsychologist);
router.delete('/deleteuserpsychologist/:IdUserPsychologist', deleteUserPsychologist);
router.get('/posts',getAllPosts),
router.post('/post',createPost)
router.post('/appointment', postAppointmentModel);
router.delete('/appointment', deleteAppointmentModel )
module.exports = router;
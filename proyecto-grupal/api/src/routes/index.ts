import { Router } from "express";
const { getUserClient, createUserClient, deleteUserClient } = require('./userClient/userClientRoute')
const {createSchedule} = require('./schedule/scheduleRoute')
const {createReview , getReview } = require('../routes/reviews/reviews');
const {getPaymentHistory} = require('./paymentHistory/paymentHistory.ts');
const {createPost,getAllPosts} = require('./posts/posts');
const { deleteAppointmentModel, postAppointmentModel } = require('./appointments/appointments');
const {getUserPsychologistOne ,getUserPsychologist, postUserPsychologist, deleteUserPsychologist} = require('./userPsychologist/userPsychologist');
const router: Router = Router();


router.post('/reviews', createReview)
router.get('/reviews/:IdUserPsychologist', getReview)
router.get('/payment/:IdUserPsychologist', getPaymentHistory)
router.get('/userclient', getUserClient);
router.post('/userclient/create', createUserClient)
router.delete('/delete_userclient/:IdUserClient', deleteUserClient)
router.post('/schedule', createSchedule)
router.get('/UserPsychologist/:IdUserPsychologist', getUserPsychologistOne);
router.get('/UserPsychologist', getUserPsychologist);
router.post('/UserPsychologist', postUserPsychologist);
router.delete("/UserPsychologist", deleteUserPsychologist);
router.get('/posts',getAllPosts),
router.post('/post',createPost)
router.post('/appointment', postAppointmentModel);
router.delete('/appointment', deleteAppointmentModel )
module.exports = router;
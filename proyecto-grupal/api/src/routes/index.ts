import { Router} from "express";

const { getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClient/userClientRoute')
const {createSchedule, getSchedule} = require('./schedule/scheduleRoute')
const {createReview , getReview } = require('../routes/reviews/reviews');
const {getPaymentHistory} = require('./paymentHistory/paymentHistory.ts');
const {createPost,getAllPosts} = require('./posts/posts');
const {getUserPsychologistOne ,getUserPsychologist, postUserPsychologist} = require('./userPsychologist/userPsychologist');
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
router.get('/UserPsychologist/:IdUserPsychologist', getUserPsychologistOne);
router.get('/UserPsychologist', getUserPsychologist);
router.post('/UserPsychologist', postUserPsychologist);
router.get('/posts',getAllPosts),
router.post('/post',createPost)


module.exports = router;
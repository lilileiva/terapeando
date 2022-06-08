import { Router } from "express";
const { getUserClient, createUserClient, deleteUserClient } = require('./userClient/userClientRoute')
const {createSchedule} = require('./schedule/scheduleRoute')
const {createReview , getReview } = require('../routes/reviews/reviews');
const {getPaymentHistory} = require('./paymentHistory/paymentHistory.ts');
const {createPost,getAllPosts} = require('./posts/posts');
const {getUserPsychologistOne ,getUserPsychologist, postUserPsychologist, deleteUserPsychologist} = require('./userPsychologist/userPsychologist');
const router: Router = Router();


router.post('/reviews', createReview)
router.get('/reviews/:IdUserPsychologist', getReview)
router.get('/payment/:IdUserPsychologist', getPaymentHistory)
router.get('/userclient/:IdUserClient', getUserClient);
router.post('/userclient', createUserClient)
router.delete('/deleteuserclient/:IdUserClient', deleteUserClient)
router.post('/schedule', createSchedule)
router.get('/userpsychologist/:IdUserPsychologist', getUserPsychologistOne);
router.get('/userpsychologist', getUserPsychologist);
router.post('/userpsychologist', postUserPsychologist);
router.delete('/deleteuserpsychologist/:IdUserPsychologist', deleteUserPsychologist);
router.get('/posts',getAllPosts),
router.post('/post',createPost)


module.exports = router;
import { Router } from "express";
const { getUserClient, createUserClient, deleteUserClient } = require('./userClient/userClientRoute')
const {createSchedule} = require('./schedule/scheduleRoute')
const {createReview , getReview } = require('../routes/reviews/reviews');
const {getPaymentHistory} = require('./paymentHistory/paymentHistory.ts');
const {createPost,getAllPosts} = require('./posts/posts');
const router: Router = Router();
//router.use('/userclient', userClient)

router.post('/reviews', createReview)
router.get('/reviews/:IdUserPsychologist', getReview)
router.get('/payment/:IdUserPsychologist', getPaymentHistory)
router.get('/userclient', getUserClient);
router.post('/userclient/create', createUserClient)
router.delete('/userclient/:IdUserClient', deleteUserClient)
router.post('/schedule', createSchedule)
router.get('/posts',getAllPosts),
router.post('/post',createPost)


module.exports = router;
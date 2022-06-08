
const {createSchedule, getSchedule} = require('./schedule/scheduleRoute')
const {createUserClient, deletUserClient, putUserClient} = require('./userClient/userClientRoute')

import { Router} from "express";
const {createReview , getReview } = require('../routes/reviews/reviews');
const {getPaymentHistory} = require('./paymentHistory/paymentHistory.ts');
const router: Router = Router();

//router.use('/userclient', userClient)

router.post('/reviews', createReview)
router.get('/reviews/:IdUserPsychologist', getReview)
router.get('/payment/:IdUserPsychologist', getPaymentHistory)
router.post('/userclient', createUserClient)
router.delete('/userclient/:IdUserClient', deletUserClient)
router.put('/userclient/:IdUserClient', putUserClient)
router.post('/schedule', createSchedule)
router.get('/schedule/:idUserPsychologist', getSchedule)


module.exports = router;
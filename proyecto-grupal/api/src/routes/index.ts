const {createUserClient, deletUserClient} = require('./userClient/userClientRoute')
const {createSchedule} = require('./schedule/scheduleRoute')
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
router.post('/schedule', createSchedule)


module.exports = router;
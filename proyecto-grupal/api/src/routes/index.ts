import { Router} from "express";

const {createUserClient, deletUserClient} = require('./userClient/userClientRoute')

const {createSchedule, getSchedule} = require('./schedule/scheduleRoute')

const router: Router = Router();

router.post('/userclient', createUserClient)
router.delete('/userclient/:IdUserClient', deletUserClient)

router.post('/schedule', createSchedule)
router.get('/schedule/:idUserPsychologist', getSchedule)

module.exports = router;
import { Router} from "express";

const {createUserClient, deletUserClient} = require('./userClient/userClientRoute')

const {createSchedule} = require('./schedule/scheduleRoute')

const router: Router = Router();

router.post('/userclient', createUserClient)
router.delete('/userclient/:IdUserClient', deletUserClient)

router.post('/schedule', createSchedule)

module.exports = router;
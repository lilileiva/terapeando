import { Router} from "express";

const {createUserClient, deletUserClient} = require('./userClient/userClientRoute')

const router: Router = Router();

router.post('/userclient', createUserClient)
router.delete('/userclient/:IdUserClient', deletUserClient)

module.exports = router;
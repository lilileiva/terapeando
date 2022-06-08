//const { Router } = require('express'); // genera error en el tipo de dato del req y res
// const userClient = require('./userClient')

import { Router} from "express";
const {createReview , getReview } = require('../routes/reviews/reviews');
const router: Router = Router();


//router.use('/userclient', userClient)

router.post('/reviews', createReview)
router.get('/reviews/:IdUserPsychologist', getReview)



module.exports = router;
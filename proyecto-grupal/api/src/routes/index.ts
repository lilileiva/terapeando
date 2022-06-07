const { Router } = require('express');
const userClient = require('./userClient')
const router = Router();

router.use('/userclient', userClient)

module.exports = router;
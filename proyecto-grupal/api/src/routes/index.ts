import { Router } from "express";
const appointment = require("./appointments/appoimentsRoutes.ts");
const paymentHistory = require("./paymentHistory/paymentHistoryRoutes.ts");
const blogPost = require("./posts/postsRoutes.ts");
const reviews = require("./reviews/reviewsRoutes.ts");
const schedule = require("./schedule/scheduleRoutes.ts");
const userClient = require("./userClient/userClientRoutes.ts");
const userPsychologist = require("./userPsychologist/userPsychologistRoutes");

const router: Router = Router();

router.use('/appointment', appointment)
router.use('/payment', paymentHistory)
router.use(blogPost)
router.use('/reviews', reviews)
router.use('/schedule', schedule)
router.use('/userclient', userClient)
router.use('/userpsychologist', userPsychologist)

module.exports = router;

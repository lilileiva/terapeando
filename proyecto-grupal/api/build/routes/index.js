"use strict";
// import { Router } from "express";
const Router = require("express");
const appointment = require("./appointments/appoimentsRoutes.ts");
const paymentHistory = require("./paymentHistory/paymentHistoryRoutes.ts");
const blogPost = require("./posts/postsRoutes.ts");
const reviews = require("./reviews/reviewsRoutes.ts");
const userClient = require("./userClient/userClientRoutes.ts");
const userPsychologist = require("./userPsychologist/userPsychologistRoutes");
<<<<<<< HEAD
const schedule = require('../routes/schedule/scheduleRoutes');
=======
>>>>>>> 8424f811845507213321a3bb74eda39f9f0abbcf
const rememberPassword = require("./nodemailer/nodemailerRoutes.ts");
const admin = require("./admin/adminRoutes");
const router = Router();
router.use('/appointment', appointment);
router.use('/payment', paymentHistory);
router.use(blogPost);
router.use('/reviews', reviews);
router.use('/userclient', userClient);
router.use('/userpsychologist', userPsychologist);
router.use('/admin', admin);
<<<<<<< HEAD
router.use('/schedule', schedule);
=======
>>>>>>> 8424f811845507213321a3bb74eda39f9f0abbcf
router.use('/nodemailer', rememberPassword);
module.exports = router;

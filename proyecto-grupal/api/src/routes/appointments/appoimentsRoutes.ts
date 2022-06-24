import { Router } from "express";
const {
    postAppointmentModel,
    getAppointmentAsPsychologist,
    getAppointmentAsClient
} = require('./appointments');

const appoimentRouter: Router = Router();
const validateUsers = require("../../middleware/validateUsers")
const validatePsychologist = require("../../middleware/validatePsychologist")
const validateClient = require("../../middleware/validateClient")


appoimentRouter.post('/create/:IdUserPsychologist', validateUsers, postAppointmentModel);
appoimentRouter.get('/psychologist', validatePsychologist, getAppointmentAsPsychologist);
appoimentRouter.get('/client', validateClient, getAppointmentAsClient);


module.exports = appoimentRouter;
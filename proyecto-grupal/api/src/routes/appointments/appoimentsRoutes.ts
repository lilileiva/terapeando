import { Router } from "express";
const {
    postAppointmentModel,
    getAppointmentAsPsychologist,
    getAppointmentAsClient,
    deleteAppointAsPsychologist,
    deleteAppointAsClient,
    putAppointment
} = require('./appointments');

const appoimentRouter: Router = Router();
const validateUsers = require("../../middleware/validateUsers")
const validatePsychologist = require("../../middleware/validatePsychologist")
const validateClient = require("../../middleware/validateClient")


appoimentRouter.post('/create/:IdUserPsychologist', validateUsers, postAppointmentModel);
appoimentRouter.get('/psychologist', validatePsychologist, getAppointmentAsPsychologist);
appoimentRouter.get('/client', validateClient, getAppointmentAsClient);
appoimentRouter.delete('/delete/psychologist', validatePsychologist, deleteAppointAsPsychologist);
appoimentRouter.delete('/delete/client', validateClient, deleteAppointAsClient);
appoimentRouter.put('/putappoint/:idAppointment', validateUsers, putAppointment)
<<<<<<< HEAD
=======

>>>>>>> 8678e845875c5df5a334f15f2d225f9a61bb817d

module.exports = appoimentRouter;
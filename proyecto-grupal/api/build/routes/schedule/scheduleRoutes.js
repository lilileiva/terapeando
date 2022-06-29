"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
<<<<<<< HEAD
const validatePsychologist = require('../../middleware/validatePsychologist');
const validateClient = require('../../middleware/validateClient');
const validateUsers = require('../../middleware/validateUsers');
const { createSchedule, getSchedule, getScheduleByDate, deleteSchedule, updateSchedule, getScheduleById } = require('./schedule.ts');
const scheduleRouter = (0, express_1.Router)();
scheduleRouter.post('/create', validateUsers, createSchedule);
scheduleRouter.get('/get/:IdUserPsychologist', validateUsers, getSchedule);
scheduleRouter.get('/date/:IdUserPsychologist', validateUsers, getScheduleByDate);
scheduleRouter.delete('/:idSchedule', validateUsers, deleteSchedule);
scheduleRouter.put('/update/:idSchedule', validateUsers, updateSchedule);
scheduleRouter.get('/getbyid/:idSchedule', validateUsers, getScheduleById);
=======
const { createSchedule, getSchedule, getScheduleByDate } = require('./schedule.ts');
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validatePsychologist = require('../../middleware/validatePsychologist');
const validateClient = require('../../middleware/validateClient');
const validateUsers = require('../../middleware/validateUsers');
const scheduleRouter = (0, express_1.Router)();
// scheduleRouter.post('/create', validatePsychologist, createSchedule)
scheduleRouter.post('/create', validateUsers, createSchedule);
scheduleRouter.get('/get/:IdUserPsychologist', validateUsers, getSchedule);
// scheduleRouter.get('/date/:IdUserPsychologist', validatePsychologist, getScheduleByDate)
scheduleRouter.get('/date/:IdUserPsychologist', validateUsers, getScheduleByDate);
>>>>>>> 8424f811845507213321a3bb74eda39f9f0abbcf
module.exports = scheduleRouter;

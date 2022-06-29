"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validatePsychologist = require('../../middleware/validatePsychologist');
const validateClient = require('../../middleware/validateClient');
const validateUsers = require('../../middleware/validateUsers');
const { createSchedule, getSchedule, getScheduleByDate, deleteSchedule, updateSchedule, getScheduleById } = require('./schedule.ts');
const scheduleRouter = (0, express_1.Router)();
scheduleRouter.post('/create', validateUsers, createSchedule);
scheduleRouter.get('/get/:IdUserPsychologist', validateUsers, getSchedule);
/* scheduleRouter.get('/get/:IdUserPsychologist', validateUsers, getSchedule)
scheduleRouter.get('/date/:IdUserPsychologist', validatePsychologist, getScheduleByDate)
scheduleRouter.get('/date/:IdUserPsychologist', validateClient, getScheduleByDate) */
scheduleRouter.get('/date/:IdUserPsychologist', validateUsers, getScheduleByDate);
scheduleRouter.delete('/:idSchedule', validateUsers, deleteSchedule);
scheduleRouter.put('/update/:idSchedule', validateUsers, updateSchedule);
scheduleRouter.get('/getbyid/:idSchedule', validateUsers, getScheduleById);
module.exports = scheduleRouter;

import { Router } from "express";
const validatePsychologist = require('../../middleware/validatePsychologist')
const validateClient = require('../../middleware/validateClient')
const validateUsers = require('../../middleware/validateUsers');

const {createSchedule, getSchedule, getScheduleByDate, deleteSchedule, updateSchedule} = require('./schedule.ts')

const scheduleRouter: Router = Router();

scheduleRouter.post('/create', validatePsychologist, createSchedule)

scheduleRouter.get('/get/:IdUserPsychologist', validatePsychologist, getSchedule)
scheduleRouter.get('/get/:IdUserPsychologist', validateClient, getSchedule)

scheduleRouter.get('/date/:IdUserPsychologist', validateUsers, getScheduleByDate)

scheduleRouter.delete('/:idSchedule', validateUsers, deleteSchedule)

scheduleRouter.put('/:idSchedule', validatePsychologist, updateSchedule)

module.exports = scheduleRouter
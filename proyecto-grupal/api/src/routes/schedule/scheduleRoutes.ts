import { Router } from "express";
const validatePsychologist = require('../../middleware/validatePsychologist')
const validateClient = require('../../middleware/validateClient')
const validateUsers = require('../../middleware/validateUsers');

const {createSchedule, getSchedule, getScheduleByDate, deleteSchedule, updateSchedule, getScheduleById} = require('./schedule.ts')

const scheduleRouter: Router = Router();

scheduleRouter.post('/create', validateUsers, createSchedule)
scheduleRouter.get('/get/:IdUserPsychologist', validateUsers, getSchedule)
scheduleRouter.get('/date/:IdUserPsychologist', validateUsers, getScheduleByDate)
scheduleRouter.delete('/:idSchedule', validateUsers, deleteSchedule)
scheduleRouter.put('/update/:idSchedule', validateUsers, updateSchedule)
scheduleRouter.get('/getbyid/:idSchedule', validateUsers, getScheduleById)

module.exports = scheduleRouter
import { Router} from "express";
const {createSchedule, getSchedule, getScheduleByDate} = require('./schedule.ts')
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validatePsychologist = require('../../middleware/validatePsychologist')
const validateClient = require('../../middleware/validateClient')
const validateUsers = require('../../middleware/validateUsers');

const scheduleRouter: Router = Router();

// scheduleRouter.post('/create', validatePsychologist, createSchedule)
scheduleRouter.post('/create', validateUsers, createSchedule)
// scheduleRouter.get('/:IdUserPsychologist', validatePsychologist, getSchedule)
scheduleRouter.get('/:IdUserPsychologist', validateUsers, getSchedule)
// scheduleRouter.get('/date/:IdUserPsychologist', validatePsychologist, getScheduleByDate)
scheduleRouter.get('/date/:IdUserPsychologist', validateUsers, getScheduleByDate)


module.exports = scheduleRouter;
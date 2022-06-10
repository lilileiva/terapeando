import { Router} from "express";
const {createSchedule, getSchedule} = require('./schedule/scheduleRoute')

const scheduleRouter: Router = Router();

scheduleRouter.post('/', createSchedule)
scheduleRouter.get('/', getSchedule)

module.exports = scheduleRouter;
import { Router} from "express";
const {createSchedule, getSchedule} = require('./scheduleRoute.ts')

const scheduleRouter: Router = Router();

scheduleRouter.post('/', createSchedule)
scheduleRouter.get('/', getSchedule)

module.exports = scheduleRouter;
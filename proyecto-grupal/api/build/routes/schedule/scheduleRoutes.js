"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createSchedule, getSchedule } = require('./scheduleRoute.ts');
const scheduleRouter = (0, express_1.Router)();
scheduleRouter.post('/', createSchedule);
scheduleRouter.get('/', getSchedule);
module.exports = scheduleRouter;

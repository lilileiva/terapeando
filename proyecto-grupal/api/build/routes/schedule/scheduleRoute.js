"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = __importDefault(require("../../models/Schedule"));
const createSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserPsychologist, dateTime } = req.body;
    try {
        const newSchedule = new Schedule_1.default(req.body);
        yield newSchedule.save();
        res.status(201).send('Agenda semanal creada!');
    }
    catch (err) {
        console.log(err);
    }
});
const getSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUserPsychologist } = req.params;
    try {
        const schedule = yield Schedule_1.default.findOne({ idUserPsychologist });
        console.log(schedule);
        res.status(200).json(schedule);
    }
    catch (err) {
        console.log(err);
    }
});
module.exports = {
    createSchedule,
    getSchedule
};

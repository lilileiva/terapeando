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
const appointment_1 = __importDefault(require("../../models/appointment"));
const postAppointmentModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, hour, type } = req.body;
    // aqui verifico que los datos sean strings
    if (typeof date !== "string" || typeof hour !== "string" || typeof type !== "string") {
        res.status(404).send("some of the data is not a string");
    }
    else {
        try {
            // creo y guardo el appointmentModel con create
            const appointment = yield appointment_1.default.create({
                date,
                hour,
                type
            });
            console.log(appointment);
            res.status(201).send("appointment created successfully");
        }
        catch (err) {
            res.status(404).json({ error: err });
        }
    }
});
const deleteAppointmentModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idAppointment } = req.body;
        const data = yield appointment_1.default.deleteOne({ _id: idAppointment });
        //aqui pregunto si se borro el appointment o si existe
        if (Number(data.deletedCount) === 0) {
            //si el appointment no existe responde de la siguiente manera.
            res.status(404).send("the appointment does not exist");
        }
        else {
            //si el appointment existe y se borro con exito , responde de esta manera.
            res.status(200).send('appointment was deleted successfully');
        }
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
});
const getAllAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAppointment = yield appointment_1.default.find();
        res.status(200).json(allAppointment);
    }
    catch (err) {
        res.status(404).json({ data: err });
    }
});
module.exports = {
    postAppointmentModel,
    deleteAppointmentModel,
    getAllAppointment
};

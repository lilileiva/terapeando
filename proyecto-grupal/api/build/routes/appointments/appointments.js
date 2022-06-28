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
    const { IdUserPsychologist } = req.params;
    const { date, hour, type } = req.body;
    if (typeof date !== "string" || typeof hour !== "string" || (type !== "Virtual" && type !== "Presencial")) {
        res.status(404).send("Some data is not valid");
    }
    else {
        const appointmentExist = yield appointment_1.default.findOne({
            'date': date,
            'IdUserClient': req.user
        });
        if (!appointmentExist) {
            try {
                const appointment = yield appointment_1.default.create({
                    date,
                    hour,
                    type,
                    IdUserClient: req.user,
                    IdUserPsychologist
                });
                console.log(appointment);
                res.status(201).send("appointment created successfully");
            }
            catch (err) {
                res.status(404).json({ error: err });
            }
        }
        else {
            res.status(404).json('Ya has reservado una cita en esta fecha');
        }
    }
});
const getAppointmentAsPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointment_1.default.find({ 'IdUserPsychologist': req.user }).populate("IdUserClient", {
            firstName: 1,
            lastName: 1,
            email: 1,
            country: 1,
            Specialties: 1,
        });
        res.status(200).json(appointment);
    }
    catch (err) {
        console.log(err);
    }
});
const getAppointmentAsClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = yield appointment_1.default.find({ 'IdUserClient': req.user }).populate("IdUserPsychologist", {
            firstName: 1,
            lastName: 1,
            email: 1,
            country: 1,
            Specialties: 1,
            profileImage: 1
        });
        res.status(200).json(appointment);
    }
    catch (err) {
        console.log(err);
    }
});
const deleteAppointAsPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdAppointment } = req.body;
    try {
        yield appointment_1.default.findOneAndDelete({
            '_id': IdAppointment,
            'IdUserPsychologist': req.user
        });
        res.status(200).json('Appointment deleted succesfully');
    }
    catch (error) {
        res.status(200).json({ error: error });
    }
});
const deleteAppointAsClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield appointment_1.default.findOneAndDelete({
            _id: id,
            IdUserClient: req.user
        });
        res.send('Appointment deleted succesfully');
    }
    catch (error) {
        res.status(200).json({ error: error });
    }
});
const putAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { IdAppointment } = req.params;
        const data = yield appointment_1.default.findByIdAndUpdate(IdAppointment, req.body, { new: true });
        res.status(200).send('Cita editada correctamente');
    }
    catch (err) {
        res.status(404).send(err);
    }
});
module.exports = {
    postAppointmentModel,
    getAppointmentAsPsychologist,
    getAppointmentAsClient,
    deleteAppointAsPsychologist,
    deleteAppointAsClient,
    putAppointment
};
// const putAppointment = async (req:Request , res: Response) => {
//     try{
//         const { idAppointment } = req.params;
//         const data = await appointmentModel.findByIdAndUpdate(idAppointment, req.body, { new: true })
//         res.status(200).send('Cita editada correctamente')
//     } catch(err) {
//         res.status(404).send(err)
//     }
// }
// const deleteAppointmentModel = async (req:Request , res: Response) => {
// try{
// const { idAppointment } = req.body;
//  const data = await appointmentModel.deleteOne({_id:idAppointment});
//  //aqui pregunto si se borro el appointment o si existe
//  if(Number(data.deletedCount) === 0){
// //si el appointment no existe responde de la siguiente manera.
//      res.status(404).send("the appointment does not exist")
//  }else{
// //si el appointment existe y se borro con exito , responde de esta manera.
//     res.status(200).send('appointment was deleted successfully')
//  }
// }catch(err){
//     res.status(404).json({error:err})
// }
// }
// const getAllAppointment = async (req:Request , res: Response) => {
//     try{
//         const allAppointment = await appointmentModel.find();
//         res.status(200).json(allAppointment)
//     } catch(err) {
//         res.status(404).json({data:err})
//     }
// }

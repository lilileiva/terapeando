import { Router} from "express";
const { deleteAppointmentModel, postAppointmentModel, getAllAppointment } = require('./appointments');

const appoimentRouter: Router = Router();

appoimentRouter.post('/', postAppointmentModel);
appoimentRouter.delete('/', deleteAppointmentModel )
appoimentRouter.get('/', getAllAppointment)

module.exports = appoimentRouter;
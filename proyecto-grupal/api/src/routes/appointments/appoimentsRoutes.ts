import { Router} from "express";
const { deleteAppointmentModel, postAppointmentModel, getAllAppointment } = require('./appointments');

const appoimentRouter: Router = Router();
const validateUsers = require("../../middleware/validateUsers")


appoimentRouter.post('/', validateUsers, postAppointmentModel);
appoimentRouter.delete('/', validateUsers, deleteAppointmentModel )
appoimentRouter.get('/', validateUsers, getAllAppointment)

module.exports = appoimentRouter;
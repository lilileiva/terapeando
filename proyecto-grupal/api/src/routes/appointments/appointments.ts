import { Request, Response } from 'express';
import appointmentModel from '../../models/appointment';

const postAppointmentModel = async (req: Request, res: Response) => {
    const  { IdUserPsychologist } = req.params
    const { date, hour, type, IdSchedule } = req.body;
    if (typeof date !== "string" ||  typeof hour !== "string" || (type !== "Virtual" && type !== "Presencial")) {
        res.status(404).send("Some data is not valid")
    } else {
        const appointmentExist = await appointmentModel.findOne({
            'date': date,
            'IdUserClient': req.user
         })
        if (!appointmentExist) {
            try {
                const appointment = await appointmentModel.create({
                    date,
                    hour,
                    type,
                    IdUserClient: req.user,
                    IdUserPsychologist,
                    IdSchedule
                })
                console.log(appointment)
                res.status(201).send("appointment created successfully")
            } catch (err) {
                res.status(404).json({ error: err })
                console.log(err)
            }
        } else {
            res.status(404).json('Ya has reservado una cita en esta fecha')       
        }
    }
}

const getAppointmentById = async (req: Request, res: Response) => {
    const { IdAppointment } = req.params;
    try {
        const appointment = await appointmentModel.findById(IdAppointment)        
        res.status(200).send(appointment)
    } catch (error) {
        console.log(error)
    }
}

const getAppointmentAsPsychologist = async (req: Request, res: Response) => {
    try {
        const appointment = await appointmentModel.find({ 'IdUserPsychologist': req.user }).populate("IdUserClient", {
            firstName: 1,
            lastName: 1,
            email: 1,
            country: 1,
            profileImage: 1
          });    
        res.status(200).json(appointment)
     } catch (err) {
        console.log(err)
     }
}

const getAppointmentAsClient = async (req: Request, res: Response) => {
    try {
        const appointment = await appointmentModel.find({ 'IdUserClient': req.user }).populate("IdUserPsychologist", {
            firstName: 1,
            lastName: 1,
            email: 1,
            location: 1,
            Specialties: 1,
            profileImage: 1
          }); 
        res.status(200).json(appointment)
     } catch (err) {
        console.log(err)
     }
}

const deleteAppointAsPsychologist = async (req: Request, res: Response) => { 
    const { IdAppointment } = req.params;  
    try {
        await appointmentModel.findOneAndDelete({      
            '_id': IdAppointment,
            'IdUserPsychologist': req.user
        });
        res.status(200).json('Appointment deleted succesfully')
    } catch (error) {
        res.status(200).json({ error: error })
    }
}

const deleteAppointAsClient = async (req: Request, res: Response) => {
    const { IdAppointment } = req.params; 
    try {
        await appointmentModel.findOneAndDelete({
            _id: IdAppointment,
            IdUserClient: req.user
        });
        res.send('Appointment deleted succesfully')
    } catch (error) {
        res.status(200).json({ error: error })
    }
}

const putAppointment = async (req:Request , res: Response) => {
    try{
        const { IdAppointment } = req.params;
        const data = await appointmentModel.findByIdAndUpdate( IdAppointment, req.body, { new: true })
        res.status(200).send('Cita editada correctamente')
    } catch(err) {
        res.status(404).send(err)
    }
}

module.exports = {
    postAppointmentModel,
    getAppointmentAsPsychologist,
    getAppointmentAsClient,
    deleteAppointAsPsychologist,
    deleteAppointAsClient,
    putAppointment,
    getAppointmentById
}

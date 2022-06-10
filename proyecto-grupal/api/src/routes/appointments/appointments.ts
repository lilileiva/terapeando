import { Request, Response } from 'express';
import appointmentModel from '../../models/appointment';

const postAppointmentModel = async (req:Request , res: Response) => {
    const { date, hour, type} = req.body; 
// aqui verifico que los datos sean strings
    if(typeof date !== "string" || typeof hour !== "string" || typeof type !== "string" ){
        res.status(404).send("some of the data is not a string")
    }else{
try{
 // creo y guardo el appointmentModel con create
    const appointment = await appointmentModel.create({
        date,
        hour,
        type
    })
    console.log(appointment)
    res.status(201).send("appointment created successfully")
}catch(err){
        res.status(404).json({error: err})
}}
}

const deleteAppointmentModel = async (req:Request , res: Response) => {
try{    
const { idAppointment } = req.body;

 const data = await appointmentModel.deleteOne({_id:idAppointment});
 //aqui pregunto si se borro el appointment o si existe

 if(Number(data.deletedCount) === 0){
//si el appointment no existe responde de la siguiente manera.
     res.status(404).send("the appointment does not exist")
 }else{
//si el appointment existe y se borro con exito , responde de esta manera.
    res.status(200).send('appointment was deleted successfully')
 }
}catch(err){
    res.status(404).json({error:err})
}
}

const getAllAppointment = async (req:Request , res: Response) => {
    try{
        const allAppointment = await appointmentModel.find();
        res.status(200).json(allAppointment)
    } catch(err) {
        res.status(404).json({data:err})
    }
}

module.exports = {
    postAppointmentModel,
    deleteAppointmentModel,
    getAllAppointment
}
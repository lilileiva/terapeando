import { Request, Response } from "express";
import scheduleModel from '../../models/Schedule'

const createSchedule = async (req: Request, res: Response) => {
   const { idUserPsychologist, dateTime } = req.body
   try {
      const newSchedule = new scheduleModel(req.body)
      await newSchedule.save()
      res.status(201).send('Agenda semanal creada!')
   } catch(err){
      console.log(err)
   }
}

module.exports = {
   createSchedule
}
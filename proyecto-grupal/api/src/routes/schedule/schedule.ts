import { Request, Response } from "express";
import scheduleModel from '../../models/Schedule'


const createSchedule = async (req: Request, res: Response) => {
   const { date, hours } = req.body
   try {
      const scheduleExist = await scheduleModel.findOne({
         'date': date,
         'idUserPsychologist': req.user
      })

      if (!scheduleExist) {
         const newSchedule = await scheduleModel.create({
            date,
            hours,
            idUserPsychologist: req.user
         })
         await newSchedule.save()
         res.status(201).send('Agenda creada!')
      } else {
         return res.status(404).send('Ya has agregado esta fecha')
      }
   } catch (err) {
      console.log(err)
   }
}


const getSchedule = async (req: Request, res: Response) => {
   const { IdUserPsychologist } = req.params
   try {
      const schedule = await scheduleModel.find({ 'IdUserPsychologist': IdUserPsychologist });      
      res.status(200).json(schedule)
   } catch (err) {
      console.log(err)
   }
}


const getScheduleByDate = async (req: Request, res: Response) => {
   const { IdUserPsychologist } = req.params
   const { date } = req.body
   try {
      const schedule = await scheduleModel.find({ 'date': date, 'IdUserPsychologist': IdUserPsychologist });      
      res.status(200).json(schedule)
   } catch (err) {
      console.log(err)
   }
}


module.exports = {
   createSchedule,
   getSchedule,
   getScheduleByDate
}
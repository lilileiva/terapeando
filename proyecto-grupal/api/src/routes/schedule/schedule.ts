import { Request, Response } from "express";
import scheduleModel from "../../models/Schedule";

const createSchedule = async (req: Request, res: Response) => {
   const { date, hours } = req.body
   try {
      const scheduleExist = await scheduleModel.findOne({
         'date': date,
         'IdUserPsychologist': req.user
      })

      if (!scheduleExist) {
         const newSchedule = await scheduleModel.create({
            date,
            hours,
            IdUserPsychologist: req.user
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

const getScheduleById = async (req: Request, res: Response) => {
   const { idSchedule } = req.params
   try {
      const schedule = await scheduleModel.findById(idSchedule);
      res.status(200).json(schedule)
   } catch (err) {
      console.log(err)
   }
}

const getScheduleByDate = async (req: Request, res: Response) => {
   const { IdUserPsychologist } = req.params
   const { date } = req.body
   try {
      const schedule = await scheduleModel.find({ 'IdUserPsychologist': IdUserPsychologist, 'date': date });
      res.status(200).json(schedule)
   } catch (err) {
      console.log(err)
   }
}

const deleteSchedule = async (req: Request, res: Response) => {
   const { idSchedule } = req.params
   try {
      const scheduleExist = await scheduleModel.findOneAndDelete({ _id: idSchedule })
      if (!scheduleExist) {
         res.status(502).send('Este horario no existe')
      }
      res.status(200).send('Horarios eliminados correctamente')
   } catch (err) {
      console.log(err)
   }
}

const updateSchedule = async (req: Request, res: Response) => {
   const { idSchedule } = req.params
   console.log(req.body)
   try {
      const updated = await scheduleModel.findByIdAndUpdate(idSchedule, req.body, { new: true })
      console.log('------updated--------', updated)
      if (!updated) {
         res.status(502).send('No hemos podido actualizar el horario')
      }
      res.status(200).send('Horario disponible eliminado')
   } catch (err) {
      console.log(err)
   }
}

module.exports = {
   createSchedule,
   deleteSchedule,
   getScheduleByDate,
   getSchedule,
   updateSchedule,
   getScheduleById
}
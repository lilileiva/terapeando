import { Request, Response } from "express";
import userClientModel from "../../models/userClients";

const createUserClient = async (req: Request, res: Response) => {
   const { firstName, lastName, email, password, birthDate, country, profileImage } = req.body
   try{
      const userClient = new userClientModel ({
         firstName,
         lastName,
         email,
         password,
         birthDate,
         country,
         profileImage
      })

      await userClient.save()
      res.status(201).send('User Created')
   }
   catch (err) {
      console.log(err)
   }
}

const deletUserClient = async (req: Request, res: Response) => {
   const {IdUserClient} = req.params;
   try{
     await userClientModel.findOneAndDelete({IdUserClient})
     res.send('Usuario eliminado correctamente')
   } catch(err){
      console.log(err)
   }
}

const putUserClient = async (req: Request, res: Response) => {
   const {IdUserClient} = req.params;
   try{
      const user = await userClientModel.findByIdAndUpdate(IdUserClient, req.body, {new:true})
      console.log(user)
      res.status(200).send('Usuario editado correctamente')
   }catch(err){
      console.log(err)
   }
}


module.exports = {createUserClient, deletUserClient, putUserClient};
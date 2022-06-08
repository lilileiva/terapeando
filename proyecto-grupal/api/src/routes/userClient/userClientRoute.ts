import { Request, Response } from "express";
import userClientModel from "../../models/userClients";


const createUserClient = async (req: Request, res: Response) => {
   const { firstName, lastName, email, password, birthDate, country, profileImage } = req.body
   try{
      const userClient = new userClientModel({
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

const deleteUserClient = async (req: Request, res: Response) => {
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

const getUserClient = async (req: Request, res: Response) => {
   const { IdUserClient } = req.params

   try{
      const userClient = await userClientModel.findById({IdUserClient});
      res.status(201).json(userClient);
   }
   catch (err) {
      console.log(err);
      res.status(404).send('There was an error...');
   }
};


module.exports = {
   getUserClient,
   createUserClient,
   deleteUserClient,
   putUserClient
};

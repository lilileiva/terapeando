import { Request, Response } from "express";
import userClientModel from "../../models/userClients";


const createUserClient = async (req: Request, res: Response) => {
   const {
      firstname,
      lastname,
      birthdate,
      country,
      email,
      profileimage,
      password
   } = req.body

   try {
       const userExist = await userClientModel.findOne({'email': email})
       if(userExist){
         return res.json({ error: "User already exists" });
       } else {
         const userClient = await userClientModel.create({
            firstName: firstname,
            lastName: lastname,
            birthDate: birthdate,
            country: country,
            email: email,
            profileImage: profileimage,
            password: password,
            role: 'client'
         })
         res.status(201).send('Welcome to our community, now you can sign in');
       }
   }
   catch (error) {
      res.status(405).send(error);
   }
}

const deleteUserClient = async (req: Request, res: Response) => {
   const { IdUserClient } = req.params;
   try {
      const userClientDelete = await userClientModel.findOneAndDelete({ _id: IdUserClient })
      res.send('Usuario eliminado correctamente')
   } catch (err) {
      res.status(404).send('There was an error...');
   }
}

const putUserClient = async (req: Request, res: Response) => {
   const { IdUserClient } = req.params;
   try {
      const user = await userClientModel.findByIdAndUpdate(IdUserClient, req.body, { new: true })
      res.status(200).send('Usuario editado correctamente')
   } catch (err) {
      res.status(404).send('There was an error...');
   }
}

const getUserClient = async (req: Request, res: Response) => {
   const { IdUserClient } = req.params
   try {
      const userClient = await userClientModel.findById(IdUserClient);
      res.status(200).json(userClient);
   }
   catch (err) {      
      res.status(404).send('There was an error...');
   }
};


module.exports = {
   getUserClient,
   createUserClient,
   deleteUserClient,
   putUserClient
};

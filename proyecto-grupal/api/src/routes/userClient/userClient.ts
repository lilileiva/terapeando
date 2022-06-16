import { Request, Response } from "express";
import userClientModel from "../../models/userClients";


const getAllUserClient = async (req: Request, res: Response) => {
   const { name } = req.query;

   try {
      if (name) {
         const userClient = await userClientModel.find({
            $or: [{ firstName: { $regex: name, $options: 'i' } },
            { lastName: { $regex: name, $options: 'i' } }]
         })
         res.status(200).json(userClient);
      } else {
         const userClients = await userClientModel.find();
         res.status(200).json(userClients);
      }
   }
   catch (err) {
      res.status(404).send('There was an error...');
   }
};

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
      const userClient = new userClientModel({
         firstName: firstname,
         lastName: lastname,
         birthDate: birthdate,
         country: country,
         email: email,
         profileImage: profileimage,
         password: password
      })
      await userClient.save()
      res.status(201).send('User Created')
   }
   catch (err) {
      console.log(err)
      res.status(404).send('There was an error...');
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


module.exports = {
   getAllUserClient,
   getUserClient,
   createUserClient,
   deleteUserClient,
   putUserClient
};

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


module.exports = {createUserClient};
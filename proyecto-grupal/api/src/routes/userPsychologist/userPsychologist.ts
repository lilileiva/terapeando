export {};
<<<<<<< HEAD
=======
const { Router } = require("express");
import { Request, Response } from "express";
const router = Router();
>>>>>>> bd5779c84ff87bb673f36859ed943de6dd8c7fe8
import userPsychologistModel from "../../models/userPsychologist";
import {Request, Response } from 'express';

<<<<<<< HEAD
const getUserPsychologistOne  = async (req:Request, res:Response) => {
try{
    const { IdUserPsychologist } = req.params;
    const psychologistUser = await userPsychologistModel.findById(IdUserPsychologist);
    res.status(200).json(psychologistUser)
}catch(err){
    res.status(404).json({data: err})
}
}

const getUserPsychologist = async (req:Request, res:Response) => {
try{
const userPsychologist = await userPsychologistModel.find();
res.status(200).json(userPsychologist)
}catch(err){
res.status(404).json({data: err})
}
}


const postUserPsychologist =  async (req: Request, res: Response) => {
  try {
    const {
      firstName, 
      lastName,
      email,
      password,
      birthDate,
      country,
      License,
      DNI,
      Specialties,
      profileImage,
        } = req.body;
    const userP = await new userPsychologistModel({
      firstName,
      lastName,
      email,
      password,
      birthDate,
      country,
      License,
      DNI,
      Specialties,
      profileImage,
      rating: 0,
      appointments:[]
    });

=======
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      birthDay,
      country,
      license,
      DNI,
      specialities,
      profileImage,
      scheduleld,
    } = req.body;

    const userP = new userPsychologistModel({
      firstName,
      lastName,
      email,
      password,
      birthDay,
      country,
      license,
      DNI,
      specialities,
      profileImage,
      scheduleld,
    });

>>>>>>> bd5779c84ff87bb673f36859ed943de6dd8c7fe8
    await userP.save();
    res.status(201).send(userP);
  } catch (error) {
    res.status(404).send(error);
  }
<<<<<<< HEAD
};
module.exports = {
    getUserPsychologistOne,
    getUserPsychologist,
    postUserPsychologist

 }
=======
});

router.delete("/", async (req: Request, res: Response) => {
  const { idPsychologist } = req.params;
  try {
    await userPsychologistModel.findOneAndDelete({ idPsychologist });
    res.send("User deleted succesfully");
  } catch (error) {
    res.status(404).send(error);
  }
});
>>>>>>> bd5779c84ff87bb673f36859ed943de6dd8c7fe8

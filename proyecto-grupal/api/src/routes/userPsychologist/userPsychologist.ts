import { Request, Response } from "express";

import userPsychologistModel from "../../models/userPsychologist";


const getUserPsychologistOne = async (req: Request, res: Response) => {
  try {
    const { IdUserPsychologist } = req.params;
    const psychologistUser = await userPsychologistModel.findById(IdUserPsychologist);
    res.status(200).json(psychologistUser)
  } catch (err) {
    res.status(404).json({ data: err })
  }
}

const getUserPsychologist = async (req: Request, res: Response) => {
  try {
    const userPsychologist = await userPsychologistModel.find();
    res.status(200).json(userPsychologist)
  } catch (err) {
    res.status(404).json({ data: err })
  }
}

const postUserPsychologist = async (req: Request, res: Response) => {
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
    const userP = new userPsychologistModel({
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
    await userP.save();
    res.status(201).send(userP);
  } catch (error) {
    res.status(404).send(error);
  }
};

 const deleteUserPsychologist =  async (req: Request, res: Response) => {
  const { idPsychologist } = req.params;
  try {
    await userPsychologistModel.findOneAndDelete({ idPsychologist });
    res.send("User deleted succesfully");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  getUserPsychologistOne,
  getUserPsychologist,
  postUserPsychologist,
  deleteUserPsychologist
}

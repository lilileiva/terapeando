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
////Post/////

const postUserPsychologist = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      birthdate,
      country,
      email,
      profileimage,
      license,
      dni,
      specialities,
      education,
      password,
    } = req.body;

    const userP = await userPsychologistModel.create({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password,
      birthDate: birthdate,
      country:country,
      License: license,
      DNI: dni,
      Specialties: specialities,
      profileImage: profileimage,
      rating: 0,
      appointments: [],
      about: '',
      education: education,
    });
    res.status(201).send(userP);
  } catch (error) {
    res.status(404).send(error);
  }
};
///// Delete /////

const deleteUserPsychologist = async (req: Request, res: Response) => {
  const { idPsychologist } = req.params;
  try {
    await userPsychologistModel.findOneAndDelete({ idPsychologist });
    res.send("User deleted succesfully");
  } catch (error) {
    res.status(404).send(error);
  }
};



const putUserPsychologist = async (req: Request, res: Response) => {
  const { IdUserPsychologist } = req.params;
  console.log(IdUserPsychologist)
  try{
    await userPsychologistModel.findByIdAndUpdate(IdUserPsychologist, req.body, {new: true})
    res.status(200).send('Usuario editado correctamente')
  } catch(err){
    console.log(err)
  }
}

module.exports = {
  getUserPsychologistOne,
  getUserPsychologist,
  postUserPsychologist,
  deleteUserPsychologist,
  putUserPsychologist
}

export {};
const { Router } = require("express");
import { Request, Response } from "express";
const router = Router();
import userPsychologistModel from "../../models/userPsychologist";


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

    await userP.save();
    res.status(201).send(userP);
  } catch (error) {
    res.status(404).send(error);
  }
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

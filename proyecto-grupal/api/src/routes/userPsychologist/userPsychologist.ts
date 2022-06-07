export {};
const { Router} = require('express');
const router = Router();
import userPsychologistModel from "../../models/userPsychologist";

router.post("/", async (req, res) => {
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

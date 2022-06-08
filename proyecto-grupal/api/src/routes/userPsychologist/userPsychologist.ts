export {};
import userPsychologistModel from "../../models/userPsychologist";
import {Request, Response } from 'express';

const getUserPsychologist  = async (req:Request, res:Response) => {
try{
    const { IdUserPsychologist } = req.params;
    const psychologistUser = await userPsychologistModel.findById(IdUserPsychologist);
    res.status(200).json(psychologistUser)
}catch(err){
    res.status(404).json({data: err})
}
}


// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const {
//       firstName: 
//       lastName,
//       email,
//       password,
//       birthDay,
//       country,
//       license,
//       DNI,
//       specialities,
//       profileImage,
//       scheduleld,
//     } = req.body;

//     const userP = new userPsychologistModel({
//       firstName,
//       lastName,
//       email,
//       password,
//       birthDay,
//       country,
//       license,
//       DNI,
//       specialities,
//       profileImage,
//       scheduleld,
//     });

//     await userP.save();
//     res.status(201).send(userP);
//   } catch (error) {
//     res.status(404).send(error);
//   }
// });
module.exports = {
    getUserPsychologist
 }
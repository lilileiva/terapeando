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
      rating,
      education,
      about,
    } = req.body;
    const userP =  await userPsychologistModel.create({
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
      rating,
      appointments:[],
      about: about,
      education:education,
    });
    res.status(201).send(userP);
  } catch (error) {
    res.status(404).send(error);
  }
};
///// Delete /////

 const deleteUserPsychologist =  async (req: Request, res: Response) => {
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
  } catch(error){
    res.status(404).send(error);
  }
}

// const putUserPsychologist = async (req: Request, res: Response) => {
//   const { IdUserPsychologist } = req.params;
//   console.log(IdUserPsychologist)
//   try{
//     await userPsychologistModel.findByIdAndUpdate(IdUserPsychologist, req.body, {new: true})
//     res.status(200).send('Usuario editado correctamente')
//   } catch(err){
//     console.log(err)
//   }
// }
//   //// creo un switch para saber si hubo algun cambio para despues notificar al front
//   let switchPut: Boolean = false;
  
//     /// aqui hago lo mismo, verifico si los datos obtenidos contienen informacion para luego realizar el cambio,
//     /// y si se realiza algun cambio el switchPut pasaria de false a true
//     if (email) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           email: email
//         }
//       })
//       switchPut = true;
//     } if (password) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           password: password
//         }
//       })
//       switchPut = true;
//     } if (country) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           country: country
//         }
//       })
//       switchPut = true;
//     } if (Specialties) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           Specialties: Specialties
//         }
//       })
//     } if (profileImage) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           profileImage: profileImage
//         }
//       })
//       switchPut = true;
//     } if (rating) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           rating: rating
//         }
//       })
//       switchPut = true;
//     }
//     if (newaAbout) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           about: newaAbout
//         }
//       })
//       switchPut = true;
//     }
//     if (newEducation) {
//       const update = await userPsychologistModel.updateOne({ id_: idPsychologist }, {
//         $set: {
//           education: newEducation
//         }
//       })
//       switchPut = true;
//     }
    
//     /// aqui verifico si se hizo algun cambio para notificar al front
//     /// en caso de que no se haya echo algun cambio entraria al else y lo notificaria
//     if (switchPut) {
//       res.status(201).send("the data was successfully modified")
//     } else {
//       res.status(404).send("data is missing to be able to modify your profile")
//     }

module.exports = {
  getUserPsychologistOne,
  getUserPsychologist,
  postUserPsychologist,
  deleteUserPsychologist,
  putUserPsychologist,
}

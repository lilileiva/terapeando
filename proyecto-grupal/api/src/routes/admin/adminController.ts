import { Request, Response, NextFunction } from "express";
import adminModel, { Admin } from "../../models/Admin";
import userClientModel from "../../models/userClients";
import userPsychologistModel from "../../models/userPsychologist";
import Post from "../../models/Post";
const registerAdmin = async (req: Request, res: Response) => {
    const {
        firstname,
        lastname,
        email,
        password,
        adminPassword
      } = req.body;
    try {
        if(adminPassword === process.env.OWNER_PASSWORD) {
          const exist = await adminModel.findOne({'email':email})
          if(exist) res.status(200).send('Invalid email or password')
          else {
            const Admin = await adminModel.create({
                firstName: firstname,
                lastName: lastname,
                email,
                password,
                role: 'Admin',
              });
              res.status(201).send('Welcome to our community, now you can sign in');
          }
        } else {
          res.status(401).send({error:'Unauthorized'});
        }
    } catch (error) {
      res.status(401).send(error);
    }
};
// Controllers clients

const updateClientDetails = async (req: Request, res: Response) => {
  const { IdUserClient } = req.params;
  try {
     const user = await userClientModel.findByIdAndUpdate(IdUserClient, req.body, { new: true })
     res.status(200).send('Usuario editado correctamente')
  } catch (err) {
     res.status(404).send('There was an error...');
  }
}

const deleteClient = async (req: Request, res: Response) => {
  const { IdUserClient } = req.params;
  try {
     const userClientDelete = await userClientModel.findOneAndDelete({ _id: IdUserClient })
     res.send('Usuario eliminado correctamente')
  } catch (err) {
     res.status(404).send('There was an error...');
  }
}

const getClientDetails = async (req: Request, res: Response) => {
  const { IdUserClient } = req.params;
  try {
     const userClient = await userClientModel.findById(IdUserClient);
     res.status(200).json(userClient);
  }
  catch (err) {
     res.status(404).send('There was an error...');
  }
};

//Controller Psychologist
const getPsychologistDetail = async (req: Request, res: Response) => {
  try {
    const { IdUserPsychologist } = req.params;
    const psychologistUser = await userPsychologistModel.findById(IdUserPsychologist, '-password');
    res.status(200).json(psychologistUser)
  } catch (err) {
    res.status(404).json({ data: err })
  }
}

const deleteUserPsychologist = async (req: Request, res: Response) => {
  const { IdUserPsychologist } = req.params;

  try {
     const userPsichologistDelete = await userPsychologistModel.findByIdAndDelete(IdUserPsychologist,
      function(err: any, docs: any) {
        if(err){
          console.log(err)
        } 
        else {
          console.log("deleted: ", docs);
        }
      } );
     res.send('Psicologo eliminado correctamente')
  } catch (err) {
     res.status(404).send('There was an error...');
  }
}

const updateUserPsychologist = async (req: Request, res: Response) => {
  const { IdUserPsychologist } = req.params;
  console.log(IdUserPsychologist)
  try {
    await userPsychologistModel.findByIdAndUpdate(IdUserPsychologist, req.body, { new: true })
    res.status(200).send('Usuario editado correctamente')
  } catch (error) {
    res.status(404).send(error);
  }
}


// posts

const deletePost = async (req: Request, res: Response) => {
  const { IdPost } = req.params;
  try {
     const postDelete = await Post.findOneAndDelete({ _id: IdPost })
     res.send('Post eliminado correctamente')
  } catch (err) {
     res.status(404).send('error: ' + err);
  }
}
module.exports = {
  registerAdmin,
  updateClientDetails,
  getClientDetails,
  deleteClient,
  getPsychologistDetail,
  updateUserPsychologist,
  deleteUserPsychologist,
  deletePost
};

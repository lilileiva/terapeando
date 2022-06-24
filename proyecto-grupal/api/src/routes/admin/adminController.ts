import { Request, Response, NextFunction } from "express";
import adminModel, { Admin } from "../../models/Admin";
import userClientModel from "../../models/userClients";
import userPsychologistModel from "../../models/userPsychologist";
import userPsychologist from "../../models/userPsychologist";
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

const getUserClientById = async (req: Request, res: Response) => {
     const  { IdUserClient } = req.params;
     try {
        const userClient = await userClientModel.findById(IdUserClient);
        res.status(200).json(userClient);
     }
     catch (err) {
        res.status(404).send('There was an error...');
     }
  };

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

const getAllUserPsychologist = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.query;

    if (name) {
      userPsychologist.find({
        $or: [{ firstName: { $regex: name, $options: 'i' } },
        { lastName: { $regex: name, $options: 'i' } }]
      }, '-password')
        .then((psychologist) => {
          res.status(200).json(psychologist)
        })
        .catch((error: any) => next(error))
    } else {
      const userPsychologist = await userPsychologistModel.find({}, '-password');
      res.status(200).json(userPsychologist)
    }

  } catch (err) {
    res.status(404).json({ data: err })
  }
}

const getPsychologistDetail = async (req: Request, res: Response) => {
  try {
    const { idUserPsychologist } = req.params;
    const psychologistUser = await userPsychologistModel.findById(idUserPsychologist, '-password');
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
  getAllUserClient,
  getUserClientById,
  getClientDetails,
  deleteClient,
  getAllUserPsychologist,
  getPsychologistDetail,
  updateUserPsychologist,
  deleteUserPsychologist,
  deletePost
};

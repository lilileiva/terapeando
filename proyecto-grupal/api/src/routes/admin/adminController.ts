import { Request, Response, NextFunction } from "express";
import adminModel, { Admin } from "../../models/Admin";

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

module.exports = {
  registerAdmin,
};

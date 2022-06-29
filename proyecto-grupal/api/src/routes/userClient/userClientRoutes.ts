import { Router } from "express";
import logInClient from "./signIn";
const {
  getUserClient,
  createUserClient,
  deleteUserClient,
  putUserClient,
  getPsychologistDetails,
  googleLogin
} = require('./userClient.ts')
const validateClient = require('../../middleware/validateClient')
const validateAdmin = require('../../middleware/ValidateAdminToken')
import { Request, Response } from "express";
const passport = require('passport')
import userClientModel from "../../models/userClients";
import userPsychologistModel from "../../models/userPsychologist";
const clientRouter: Router = Router();
const jwt = require("jsonwebtoken");


clientRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
clientRouter.get('/client', validateClient, getUserClient);
clientRouter.get('/:IdUserPsychologist', validateClient, getPsychologistDetails)
clientRouter.post('/client/register', createUserClient)
clientRouter.post('/client/login', logInClient)
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient)
clientRouter.put('/editprofile', validateClient, putUserClient)
clientRouter.get('/auth/google/callback', passport.authenticate('google'), async(req: any, res: Response) => {
  if (req.user) { 
      const user = await userClientModel.findOne({email: req.user.email });
      const userForToken = {
          id: user?._id,
          role: user?.role
      };
    const token = jwt.sign(userForToken, process.env.SECRETWORD, {
      expiresIn: 60 * 60 * 24 // equivalente a 24 horas
    })
    res.redirect(`http://localhost:3000/home?role=${req.user.role}&token=${token}`)
  } else {
      res.redirect('http//localhost:3000/signin')
  } 
})


//Falta middleware solo de admin
module.exports = clientRouter;  
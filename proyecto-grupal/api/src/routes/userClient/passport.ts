import { VerifyCallback } from "passport-google-oauth2"
import { Request, Response, NextFunction } from "express";
// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
import userClientModel from "../../models/userClients"
const jwt = require("jsonwebtoken");

module.exports = function (passport:any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        callbackURL: '/userclient/auth/google/callback',
      },
      async (accessToken:any, refreshToken:any, profile:any, done:any, req: Request, res: Response) => {
        try{
          //console.log('AT: ', accessToken)
          //console.log('PROFLE: ', profile)
          const newUser = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0].value,
            role: "Client",
          }

          let user = await userClientModel.findOne({email: newUser.email})
          //console.log("esta es la respuesta del user " + user)
          if (user) {
            //If user present in our database.
          done(null, user)
        } else {
          done(null, null)
        }
      }catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user:any, done:VerifyCallback) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id:any, done:any) => {
    userClientModel.findById(id, (err:any, user:any) => done(err, user))
  })
}

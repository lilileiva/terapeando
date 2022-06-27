const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
import userClientModel from "../../models/userClients"
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
module.exports = function (passport:any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/userclient/auth/google/callback',
       // proxy: true
      },
      async (accessToken:any, refreshToken:any, profile:any, done:any) => {
        //get the user data from google
        // console.log("este es el profile" + Object.values(profile))
        const newUser = {
          // firstName: profile.name.givenName,
          // lastName: profile.name.familyName,
          email: profile.emails[0].value,
          // profileImage: profile.photos[0].value,
          // role: "client"
        }
        let tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjVlNjkxMmIyNWQ3Mzk4ZDc2NTFlZSIsInJvbGUiOiJwc3ljaG9sb2dpc3QiLCJpYXQiOjE2NTYzNDUwNjAsImV4cCI6MTY1Njk0OTg2MH0.P0AZmGHbdmeOIXvwgs_CCe1isLDQunIJficFJtI3WZ0'

        console.log( 'token api: ' , tokenApi.length)
        console.log( 'token google: ' , accessToken.length)
        // console.log("este es el nuevo usuario " +newUser.firstName)
        // console.log(newUser.lastName)

        try {
          //find the user in our database 
          let user = await userClientModel.findOne({email: newUser.email})
          console.log("esta es la respuesta del user :" , user)
          if (user) {
            //If user present in our database.     
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            //no crear usuario
            done(null, null)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user:any, done:any) => {
    // console.log('serialize: ', user)
    done(null, user)
  })

  // used to deserialize the user
  passport.deserializeUser((id:any, done:any) => {
    userClientModel.findById(id, (err:any, user:any) => done(err, user))
  })
}



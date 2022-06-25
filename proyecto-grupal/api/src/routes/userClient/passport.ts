import { VerifyCallback } from "passport-google-oauth2"

// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
import userClientModel from "../../models/userClients"

module.exports = function (passport:any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        callbackURL: '/userclient/auth/google/callback',
      },
      async (accessToken:any, refreshToken:any, profile:any, done:any) => {
        //get the user data from google
        console.log("este es el profile" + Object.values(profile))
        const newUser = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
        }
        console.log(newUser)

        try {
          //find the user in our database 
          let user = await userClientModel.findOne({email: newUser.email})
          console.log("esta es la respuesta del user " + user)
          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await userClientModel.create(newUser)
            done(null, user)
          }
        } catch (err) {
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

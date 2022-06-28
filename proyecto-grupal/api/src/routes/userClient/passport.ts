const GoogleStrategy = require('passport-google-oauth20').Strategy
import userClientModel from "../../models/userClients"
import { error } from "console";
import userPsychologistModel from "../../models/userPsychologist";
module.exports = function (passport:any) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/userclient/auth/google/callback',
      },
      async (accessToken:any, refreshToken:any, profile:any, done:any) => {
        const newUser = {
          email: profile.emails[0].value,
        }
        try {
          //find the user in our database 
          let user = await userClientModel.findOne({email: newUser.email})
          console.log('cliente',user)
          user ? null : user = await userPsychologistModel.findOne({email: newUser.email})
          console.log('psicologo',user)
          if (user) {
            //If user present in our database.     
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            done('Debes regstrarte primero', null)
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



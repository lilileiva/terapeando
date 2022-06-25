// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const userClientModel = require("../../models/userClients")

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/userclient/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google
        const newUser = {
          _id : profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profileImage: profile.photos[0].value,
        }
        try {
          //find the user in our database 
          let user = await userClientModel.findOne({ _id: profile.id }).exec()

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
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    userClientModel.findById(id, (err, user) => done(err, user))
  })
}

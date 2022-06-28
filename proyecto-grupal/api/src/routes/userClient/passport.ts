const GoogleStrategy = require('passport-google-oauth20').Strategy
import userClientModel from "../../models/userClients"
import { error } from "console";
import userPsychologistModel from "../../models/userPsychologist";
import Swal from "sweetalert2";
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
            done("<div style='height:100%;background: #e0e5ec;'><h1 style='padding-top: 10%; position: relative;text-align: center;color: #353535;font-size: 50px;font-family: verdana;'>Primero registrate</h1><p style='font-family:verdana;font-weight: 300;text-align: center;font-size: 18px;color: #676767;'>antes de logearte con google primero debes registrarte en nuestra plataforma para poder logearte a terapeando desde google, da click en el boton registrate que te redirecciona a registrarte en la plataforma o vuelve a intentarlo en el boton Inicia sesión </p> <div style=' width: 90%;margin: 40px auto;text-align: center;'><button style='width: 25%;height: 40px;color: #fff;border-radius: 5px;padding: 10px 25px;font-family: verdana;font-weight: 500;background: transparent;cursor: pointer;transition: all 0.3s ease;position: relative;display: inline-block; box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);outline: none; background: rgb(6,14,131);background: linear-gradient(0deg, rgb(18 211 77) 0%, rgb(12 180 25) 100%);border: none;'><a href='http://localhost:3000/signin' style='text-decoration:none; color:whitesmoke;'><span>Inicia sesión</span></a></button><button style='width: 25%;height: 40px;color: #fff;border-radius: 5px;padding: 10px 25px;font-family: verdana;font-weight: 500;background: transparent;cursor: pointer;transition: all 0.3s ease;position: relative;display: inline-block; box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);outline: none; background: rgb(6,14,131);background: linear-gradient(0deg, rgb(18 211 77) 0%, rgb(12 180 25) 100%);border: none;'><a href='http://localhost:3000/signup' style='text-decoration:none; color:whitesmoke;'><span>Registrate</span></a></button></div>",false)
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
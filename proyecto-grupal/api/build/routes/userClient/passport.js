"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userClients_1 = __importDefault(require("../../models/userClients"));
const userPsychologist_1 = __importDefault(require("../../models/userPsychologist"));
module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENTSECRET,
        callbackURL: '/userclient/auth/google/callback',
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        const newUser = {
            email: profile.emails[0].value,
        };
        try {
            //find the user in our database 
            let user = yield userClients_1.default.findOne({ email: newUser.email });
            console.log('cliente', user);
            user ? null : user = yield userPsychologist_1.default.findOne({ email: newUser.email });
            console.log('psicologo', user);
            if (user) {
                //If user present in our database.
                done(null, user);
            }
            else {
                // if user is not preset in our database save user data to database.
                done("<div style='height:100%;background: #e0e5ec;'><h1 style='padding-top: 10%; position: relative;text-align: center;color: #353535;font-size: 50px;font-family: verdana;'>Primero registrate</h1><p style='font-family:verdana;font-weight: 300;text-align: center;font-size: 18px;color: #676767;'>antes de logearte con google primero debes registrarte en nuestra plataforma para poder logearte a terapeando desde google, da click en el boton registrate que te redirecciona a registrarte en la plataforma o vuelve a intentarlo en el boton Inicia sesión </p> <div style=' width: 90%;margin: 40px auto;text-align: center;'><button style='width: 25%;height: 40px;color: #fff;border-radius: 5px;padding: 10px 25px;font-family: verdana;font-weight: 500;background: transparent;cursor: pointer;transition: all 0.3s ease;position: relative;display: inline-block; box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);outline: none; background: rgb(6,14,131);background: linear-gradient(0deg, rgb(18 211 77) 0%, rgb(12 180 25) 100%);border: none;'><a href='http://localhost:3000/signin' style='text-decoration:none; color:whitesmoke;'><span>Inicia sesión</span></a></button><button style='width: 25%;height: 40px;color: #fff;border-radius: 5px;padding: 10px 25px;font-family: verdana;font-weight: 500;background: transparent;cursor: pointer;transition: all 0.3s ease;position: relative;display: inline-block; box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1);outline: none; background: rgb(6,14,131);background: linear-gradient(0deg, rgb(18 211 77) 0%, rgb(12 180 25) 100%);border: none;'><a href='http://localhost:3000/signup' style='text-decoration:none; color:whitesmoke;'><span>Registrate</span></a></button></div>", false);
            }
        }
        catch (err) {
            console.error(err);
        }
    })));
    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        // console.log('serialize: ', user)
        done(null, user);
    });
    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        userClients_1.default.findById(id, (err, user) => done(err, user));
    });
};

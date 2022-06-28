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
const mongoose = require('mongoose');
const userClients_1 = __importDefault(require("../../models/userClients"));
const console_1 = require("console");
const jwt = require("jsonwebtoken");
module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/userclient/auth/google/callback',
        // proxy: true
    }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
        //get the user data from google
        // console.log("este es el profile" + Object.values(profile))
        const newUser = {
            // firstName: profile.name.givenName,
            // lastName: profile.name.familyName,
            email: profile.emails[0].value,
            // profileImage: profile.photos[0].value,
            // role: "client"
        };
        let tokenApi = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYjVlNjkxMmIyNWQ3Mzk4ZDc2NTFlZSIsInJvbGUiOiJwc3ljaG9sb2dpc3QiLCJpYXQiOjE2NTYzNDUwNjAsImV4cCI6MTY1Njk0OTg2MH0.P0AZmGHbdmeOIXvwgs_CCe1isLDQunIJficFJtI3WZ0';
        console.log('token api: ', tokenApi.length);
        console.log('token google: ', accessToken.length);
        // console.log("este es el nuevo usuario " +newUser.firstName)
        // console.log(newUser.lastName)
        try {
            //find the user in our database 
            let user = yield userClients_1.default.findOne({ email: newUser.email });
            // console.log("esta es la respuesta del user :" , user)
            if (user) {
                //If user present in our database.     
                // console.log({id: user.id})
                done(null, user);
            }
            else {
                // if user is not preset in our database save user data to database.
                //no crear usuario
                done(console_1.error, null);
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

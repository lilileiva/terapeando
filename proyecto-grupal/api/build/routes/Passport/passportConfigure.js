"use strict";
// import { VerifyCallback } from "jsonwebtoken";
// const passport = require('passport-google-oauth2')
// const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// import userPsychologistModel from "../../models/userPsychologist";
// passport.use(
//     new GoogleStrategy({
//         clientID: GOOGLE_CLIENT_ID,
//         clientSecret: GOOGLE_CLIENT_SECRET,
//         callbackURL: "http://localhost:3000/auth/google/callback",
//     }, async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
//         //get the user data from google
//         const newPsychologist = {
//             _id: profile.id,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             email: profile.emails[0].value,
//             profileImage: profile.photos[0].value,
//         }
//         try {
//             const userPsychologist = await userPsychologistModel.findById(newPsychologist._id)
//             if (userPsychologist) {
//                 done(null, userPsychologist)
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     })
// );
// // used to serialize the user for the session
// passport.serializeUser((user: any, done) => {
//     done(null, user.id)
// });
// // used to deserialize the user
// passport.deserializeUser(async (id, done) => {
//     userPsychologistModel.findById(id, (err: any, user: object) => done(err, user))
// })

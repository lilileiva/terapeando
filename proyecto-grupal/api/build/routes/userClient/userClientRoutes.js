"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("./signIn"));
const { getUserClient, createUserClient, deleteUserClient, putUserClient, getPsychologistDetails, googleLogin } = require('./userClient.ts');
const validateClient = require('../../middleware/validateClient');
// const validateAdmin = require('../../middleware/validatePsychologistOrAdmin')
const validateAdmin = require('../../middleware/ValidateAdminToken');
const passport = require('passport');
const clientRouter = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
// function generateUserToken(req, res) {
//     const accessToken = token.generateAccessToken(req.user.id);
//     res.render('authenticated.html', {
//       token: accessToken
//     });
//   }
// app.get('/api/authentication/google/start',
//   passport.authenticate('google', { session: false, scope: 
//   ['openid', 'profile', 'email'] }
// ));
// app.get('/api/authentication/google/redirect',
//   passport.authenticate('google', { session: false }),
//   generateUserToken
// );
clientRouter.get('/auth/google/callback', passport.authenticate('google', { session: false, successReturnToOrRedirect: "http://localhost:3000/home" }), (req, res) => { res.send("te autenticaste con google"); });
clientRouter.get('/google', passport.authenticate('google', { session: false, scope: ['profile', 'email'] }));
clientRouter.get('/client', validateClient, getUserClient);
clientRouter.get('/:IdUserPsychologist', validateClient, getPsychologistDetails);
clientRouter.post('/client/register', createUserClient);
clientRouter.post('/client/login', signIn_1.default);
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient);
clientRouter.put('/editprofile', validateClient, putUserClient);
//Falta middleware solo de admin
module.exports = clientRouter;

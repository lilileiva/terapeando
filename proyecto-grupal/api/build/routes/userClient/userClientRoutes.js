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
const express_1 = require("express");
const signIn_1 = __importDefault(require("./signIn"));
const { getUserClient, createUserClient, deleteUserClient, putUserClient, getPsychologistDetails, googleLogin } = require('./userClient.ts');
const validateClient = require('../../middleware/validateClient');
const validateAdmin = require('../../middleware/ValidateAdminToken');
const passport = require('passport');
const userClients_1 = __importDefault(require("../../models/userClients"));
const clientRouter = (0, express_1.Router)();
const jwt = require("jsonwebtoken");
clientRouter.get('/auth/google/callback', passport.authenticate('google'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = yield userClients_1.default.findOne({ email: req.user.email });
        const userForToken = {
            id: user === null || user === void 0 ? void 0 : user._id,
            role: user === null || user === void 0 ? void 0 : user.role
        };
        const token = jwt.sign(userForToken, process.env.SECRETWORD, {
            expiresIn: 60 * 60 * 24 // equivalente a 24 horas
        });
        res.redirect(`http://localhost:3000/home?token=${token}`);
    }
    else {
        res.redirect('http//localhost:3000/signin');
    }
}));
// clientRouter.get('/auth/google/callback', passport.authenticate('google', {successReturnToOrRedirect: "http://localhost:3000/home" }), async (req: Request, res: Response)=> {
//     console.log(req.)
//     const user = await userClientModel.findOne({email: req.user?.email });
//     const userForToken = {
//         id: user._id,
//         role: user.role
//       };
//       const token = jwt.sign(userForToken, process.env.SECRETWORD, {
//         expiresIn: 60 * 60 * 24 * 7,
//       });
//     //   res.send(token);
// })
clientRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
clientRouter.get('/client', validateClient, getUserClient);
clientRouter.get('/:IdUserPsychologist', validateClient, getPsychologistDetails);
clientRouter.post('/client/register', createUserClient);
clientRouter.post('/client/login', signIn_1.default);
clientRouter.delete('/deleteuserclient', validateClient, deleteUserClient);
clientRouter.put('/editprofile', validateClient, putUserClient);
//Falta middleware solo de admin
module.exports = clientRouter;

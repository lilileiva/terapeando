"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const userClients_1 = __importDefault(require("../../models/userClients"));
const userPsychologist_1 = __importDefault(require("../../models/userPsychologist"));
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const crypto = __importStar(require("crypto"));
const ForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = req.body;
    let userPsychologist = yield userPsychologist_1.default.find({
        "email": email,
        "role": role
    });
    let userClient = yield userClients_1.default.find({
        "email": email,
        "role": role
    });
    try {
        const user = userPsychologist.length < 1 ? userClient : userPsychologist;
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "terapeandoportal@gmail.com",
                pass: "pezufzhvclfbmuti"
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        transporter.verify().then(() => {
            console.log('Ready for send email');
        });
        const newPassword = crypto.randomBytes(8).toString('hex');
        try {
            const sendEmail = yield transporter.sendMail({
                from: `Terapeando <terapeandoportal@gmail.com>`,
                to: `${email}`,
                subject: "Recuperación de contraseña Terapeando",
                text: `Hola ${user[0].firstName} tu nueva contraseña para iniciar sesión es: ${newPassword}`,
                html: `<strong>Hola ${user[0].firstName}!  tu nueva contraseña para iniciar sesión es: ${newPassword} </strong><a href= http://localhost:3000/signin>ir a Terapeando</a>`,
                headers: { 'x-myheader': 'test header' }
            }).then(() => __awaiter(void 0, void 0, void 0, function* () {
                const saltRounds = Number(process.env.SALTROUNDS);
                bcrypt.hash(newPassword, saltRounds, (error, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                    if (user[0].role === "psychologist") {
                        console.log({ 'aqui llego un psicologo': userPsychologist[0].role });
                        const update = yield userPsychologist_1.default.findByIdAndUpdate(userPsychologist[0]._id, { password: hashedPassword }, { new: true });
                        res.status(201).send("email sended");
                    }
                    else {
                        console.log({ 'aqui llego un paciente': userClient[0].role });
                        const update = yield userClients_1.default.findByIdAndUpdate(userClient[0]._id, { password: hashedPassword }, { new: true });
                        res.status(201).send("email sended");
                    }
                }));
            }));
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ msg: 'email not found' });
        }
    }
    catch (error) {
        return res.status(404).json({ msg: 'user not found' });
    }
});
module.exports = {
    ForgotPassword
};

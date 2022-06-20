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
const userPsychologist_1 = __importDefault(require("../../models/userPsychologist"));
const userPsychologist_2 = __importDefault(require("../../models/userPsychologist"));
const getUserPsychologistOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { IdUserPsychologist } = req.params;
        const psychologistUser = yield userPsychologist_1.default.findById(IdUserPsychologist, '-password');
        res.status(200).json(psychologistUser);
    }
    catch (err) {
        res.status(404).json({ data: err });
    }
});
const getUserPsychologistByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const psychologistUserEmail = yield userPsychologist_1.default.findOne({ 'email': email }, '-password');
        res.status(200).json(psychologistUserEmail);
    }
    catch (err) {
        res.status(404).json({ data: err });
    }
});
const getUserPsychologist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        if (name) {
            userPsychologist_2.default.find({
                $or: [{ firstName: { $regex: name, $options: 'i' } },
                    { lastName: { $regex: name, $options: 'i' } }]
            }, '-password')
                .then((psychologist) => {
                res.status(200).json(psychologist);
            })
                .catch((error) => next(error));
        }
        else {
            const userPsychologist = yield userPsychologist_1.default.find({}, '-password');
            res.status(200).json(userPsychologist);
        }
    }
    catch (err) {
        res.status(404).json({ data: err });
    }
});
////Post/////
const postUserPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, birthdate, country, license, dni, specialities, profileimage, rating, education, about } = req.body;
    try {
        const psychologistExist = yield userPsychologist_1.default.findOne({ 'email': email });
        if (psychologistExist) {
            return res.json({ error: "User already exists" });
        }
        else {
            const userP = yield userPsychologist_1.default.create({
                firstName: firstname,
                lastName: lastname,
                email,
                password,
                birthDate: birthdate,
                country,
                License: license,
                DNI: dni,
                Specialties: specialities,
                profileImage: profileimage,
                rating,
                appointments: [],
                status: "Pendiente",
                about,
                education,
                role: 'psychologist'
            });
            res.status(201).send('Welcome to our community, now you can sign in');
        }
    }
    catch (error) {
        res.send({ error: 'Validate your personal data' });
    }
});
///// Delete /////
const deleteUserPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserPsychologist } = req.params;
    try {
        const userPsichologistDelete = yield userPsychologist_1.default.findByIdAndDelete(IdUserPsychologist, function (err, docs) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("deleted: ", docs);
            }
        });
        res.send('Psicologo eliminado correctamente');
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const putUserPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserPsychologist } = req.params;
    console.log(IdUserPsychologist);
    try {
        yield userPsychologist_1.default.findByIdAndUpdate(IdUserPsychologist, req.body, { new: true });
        res.status(200).send('Usuario editado correctamente');
    }
    catch (error) {
        res.status(404).send(error);
    }
});
const filterPsichologistSpecialities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { specialtie } = req.params;
    console.log(specialtie);
    try {
        const PsychologistBySpecialtie = yield userPsychologist_1.default.find({
            Specialties: { $in: [specialtie] }
        });
        if (PsychologistBySpecialtie.length !== 0) {
            res.status(200).json(PsychologistBySpecialtie);
        }
        else {
            res.status(404).json({ msj: 'No hay psicologos con esa especialidad' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(404).send({ msj: 'No se encontraron resultados' });
    }
});
const filterPsichologistRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PsichologistByRating = yield userPsychologist_1.default.find({}, { 'rating': 1, "_id": 0 });
        const orderDesc = PsichologistByRating.sort((a, b) => b.rating - a.rating);
        res.status(200).json(orderDesc);
    }
    catch (error) {
        console.log(error);
        return res.status(404).send({ msj: 'No se encontraron resultados' });
    }
});
module.exports = {
    getUserPsychologistOne,
    getUserPsychologist,
    postUserPsychologist,
    deleteUserPsychologist,
    putUserPsychologist,
    getUserPsychologistByEmail,
    filterPsichologistSpecialities,
    filterPsichologistRating
};

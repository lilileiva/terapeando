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
const Admin_1 = __importDefault(require("../../models/Admin"));
const userClients_1 = __importDefault(require("../../models/userClients"));
const userPsychologist_1 = __importDefault(require("../../models/userPsychologist"));
const userPsychologist_2 = __importDefault(require("../../models/userPsychologist"));
const Post_1 = __importDefault(require("../../models/Post"));
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, adminPassword } = req.body;
    try {
        if (adminPassword === process.env.OWNER_PASSWORD) {
            const exist = yield Admin_1.default.findOne({ 'email': email });
            if (exist)
                res.status(200).send('Invalid email or password');
            else {
                const Admin = yield Admin_1.default.create({
                    firstName: firstname,
                    lastName: lastname,
                    email,
                    password,
                    role: 'Admin',
                });
                res.status(201).send('Welcome to our community, now you can sign in');
            }
        }
        else {
            res.status(401).send({ error: 'Unauthorized' });
        }
    }
    catch (error) {
        res.status(401).send(error);
    }
});
// Controllers clients
const getAllUserClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        if (name) {
            const userClient = yield userClients_1.default.find({
                $or: [{ firstName: { $regex: name, $options: 'i' } },
                    { lastName: { $regex: name, $options: 'i' } }]
            });
            res.status(200).json(userClient);
        }
        else {
            const userClients = yield userClients_1.default.find();
            res.status(200).json(userClients);
        }
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const getUserClientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const userClient = yield userClients_1.default.findById(IdUserClient);
        res.status(200).json(userClient);
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const updateClientDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const user = yield userClients_1.default.findByIdAndUpdate(IdUserClient, req.body, { new: true });
        res.status(200).send('Usuario editado correctamente');
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const deleteClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const userClientDelete = yield userClients_1.default.findOneAndDelete({ _id: IdUserClient });
        res.send('Usuario eliminado correctamente');
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const getClientDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const userClient = yield userClients_1.default.findById(IdUserClient);
        res.status(200).json(userClient);
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
//Controller Psychologist
const getAllUserPsychologist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
const getPsychologistDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUserPsychologist } = req.params;
        const psychologistUser = yield userPsychologist_1.default.findById(idUserPsychologist, '-password');
        res.status(200).json(psychologistUser);
    }
    catch (err) {
        res.status(404).json({ data: err });
    }
});
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
const updateUserPsychologist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserPsychologist } = req.params;
    try {
        yield userPsychologist_1.default.findByIdAndUpdate(IdUserPsychologist, req.body, { new: true });
        res.status(200).send('Usuario editado correctamente');
    }
    catch (error) {
        res.status(404).send(error);
    }
});
// posts
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdPost } = req.params;
    try {
        const postDelete = yield Post_1.default.findOneAndDelete({ _id: IdPost });
        res.send('Post eliminado correctamente');
    }
    catch (err) {
        res.status(404).send('error: ' + err);
    }
});
module.exports = {
    registerAdmin,
    updateClientDetails,
    getAllUserClient,
    getUserClientById,
    getClientDetails,
    deleteClient,
    getAllUserPsychologist,
    getPsychologistDetail,
    updateUserPsychologist,
    deleteUserPsychologist,
    deletePost
};

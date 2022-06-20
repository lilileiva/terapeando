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
const userClients_1 = __importDefault(require("../../models/userClients"));
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
const getUserClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const userClient = yield userClients_1.default.findById(IdUserClient);
        res.status(200).json(userClient);
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const createUserClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, birthdate, country, email, profileimage, password } = req.body;
    try {
        const userExist = yield userClients_1.default.findOne({ 'email': email });
        if (userExist) {
            return res.json({ error: "User already exists" });
        }
        else {
            const userClient = yield userClients_1.default.create({
                firstName: firstname,
                lastName: lastname,
                birthDate: birthdate,
                country: country,
                email: email,
                profileImage: profileimage,
                password: password,
                role: 'client'
            });
            res.status(201).send('Welcome to our community, now you can sign in');
        }
    }
    catch (error) {
        res.status(405).send(error);
    }
});
const deleteUserClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const userClientDelete = yield userClients_1.default.findOneAndDelete({ _id: IdUserClient });
        res.send('Usuario eliminado correctamente');
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
const putUserClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { IdUserClient } = req.params;
    try {
        const user = yield userClients_1.default.findByIdAndUpdate(IdUserClient, req.body, { new: true });
        res.status(200).send('Usuario editado correctamente');
    }
    catch (err) {
        res.status(404).send('There was an error...');
    }
});
module.exports = {
    getAllUserClient,
    getUserClient,
    createUserClient,
    deleteUserClient,
    putUserClient
};

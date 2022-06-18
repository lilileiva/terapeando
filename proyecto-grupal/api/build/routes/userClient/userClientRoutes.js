"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("./signIn"));
const { getAllUserClient, getUserClient, createUserClient, deleteUserClient, putUserClient } = require('./userClient.ts');
const validateClient = require('../../middleware/validateClientOrAdmin');
const validateAdmin = require('../../middleware/validatePsychologistOrAdmin');
const clientRouter = (0, express_1.Router)();
clientRouter.get('/clients', validateAdmin, getAllUserClient);
clientRouter.get('/client/:IdUserClient', validateClient, getUserClient);
clientRouter.post('/client/register', createUserClient);
clientRouter.post('/client/login', signIn_1.default);
clientRouter.delete('/deleteuserclient/:IdUserClient', validateClient, deleteUserClient);
clientRouter.put('/:IdUserClient', validateClient, putUserClient);
//Falta middleware solo de admin
module.exports = clientRouter;

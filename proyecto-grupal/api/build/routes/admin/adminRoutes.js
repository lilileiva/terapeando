"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("./signIn"));
const { registerAdmin, getAllUserClient, getUserClientById, updateClientDetails, deleteClient, getAllUserPsychologist, updateUserPsychologist, deleteUserPsychologist, getPsychologistDetail, deletePost, } = require("./adminController");
const adminRouter = (0, express_1.Router)();
const ValidateAdmin = require("../../middleware/ValidateAdminToken");
//Solo admin
adminRouter.post("/logIn", signIn_1.default);
adminRouter.post("/signUp", registerAdmin);
//Rutas admin cliente
adminRouter.get('/userclient/clients', ValidateAdmin, getAllUserClient);
adminRouter.get('/userclient/clients/:IdUserClient', ValidateAdmin, getUserClientById);
adminRouter.put("/userclient/update/:IdUserClient", ValidateAdmin, updateClientDetails);
adminRouter.delete("/userclient/deleteuserclient/:IdUserClient", ValidateAdmin, deleteClient);
//Rutas admin psicologo
adminRouter.get("/userpsychologist", ValidateAdmin, getAllUserPsychologist);
adminRouter.get("/userpsychologist/:idUserPsychologist", ValidateAdmin, getPsychologistDetail);
adminRouter.put("/userpsychologist/put_userpsychologist/:IdUserPsychologist", ValidateAdmin, updateUserPsychologist);
adminRouter.delete("/deleteuserpsychologist/:IdUserPsychologist", ValidateAdmin, deleteUserPsychologist);
//Post
adminRouter.delete("/deletePost/:IdPost", deletePost);
module.exports = adminRouter;

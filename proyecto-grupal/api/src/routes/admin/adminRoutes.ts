import { Router } from "express";
import logInAdmin from "./signIn";
const { registerAdmin, getClientDetails, updateClientDetails, deleteClient, updateUserPsychologist, deleteUserPsychologist, getPsychologistDetail, deletePost} = require("./adminController");
const adminRouter: Router = Router();
const ValidateAdmin = require('../../middleware/ValidateAdminToken')

//Solo admin
adminRouter.post("/logIn", logInAdmin);
adminRouter.post("/signUp", registerAdmin);
//Rutas admin cliente
adminRouter.get("/client/:IdUserClient", ValidateAdmin, getClientDetails);
adminRouter.put("/update/:IdUserClient", ValidateAdmin ,updateClientDetails);
adminRouter.delete('/deleteuserclient/:IdUserClient', ValidateAdmin, deleteClient)

//Rutas admin psicologo
adminRouter.get('/:IdUserPsychologist', getPsychologistDetail);
adminRouter.put("/put_userpsychologist/:IdUserPsychologist", updateUserPsychologist);
adminRouter.delete('/deleteuserpsychologist/:IdUserPsychologist', ValidateAdmin , deleteUserPsychologist);

//Post
adminRouter.delete("/deletePost/:IdPost", deletePost);



module.exports = adminRouter;

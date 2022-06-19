import { Router } from "express";
import logInAdmin from "./signIn";
const {
  registerAdmin,
  getClientDetails,
  updateClientDetails,
  deleteClient,
  updateUserPsychologist,
  deleteUserPsychologist,
  getPsychologistDetail,
  getAllUserClient,
  getUserClient,
  deletePost,
} = require("./adminController");
const adminRouter: Router = Router();
const ValidateAdmin = require("../../middleware/ValidateAdminToken");

//Solo admin
adminRouter.post("/logIn", logInAdmin);
adminRouter.post("/signUp", registerAdmin);

//Rutas admin cliente
adminRouter.get("/client/:IdUserClient", ValidateAdmin, getClientDetails);
adminRouter.get('/client/', ValidateAdmin, getUserClient);
adminRouter.get('/clients', ValidateAdmin, getAllUserClient);
adminRouter.put("/update/:IdUserClient", ValidateAdmin, updateClientDetails);
adminRouter.delete("/deleteuserclient/:IdUserClient", ValidateAdmin, deleteClient);

//Rutas admin psicologo
adminRouter.get("/:IdUserPsychologist", ValidateAdmin, getPsychologistDetail);
adminRouter.put("/put_userpsychologist/:IdUserPsychologist",ValidateAdmin,updateUserPsychologist);
adminRouter.delete("/deleteuserpsychologist/:IdUserPsychologist", ValidateAdmin,deleteUserPsychologist);

//Post
adminRouter.delete("/deletePost/:IdPost", deletePost);

module.exports = adminRouter;

import { Router } from "express";
import logInAdmin from "./signIn";
const {
  registerAdmin,
  getAllUserClient,
  getUserClientById,
  updateClientDetails,
  deleteClient,
  getAllUserPsychologist,
  updateUserPsychologist,
  deleteUserPsychologist,
  getPsychologistDetail,
  deletePost,
} = require("./adminController");
const adminRouter: Router = Router();
const ValidateAdmin = require("../../middleware/ValidateAdminToken");

//Solo admin
adminRouter.post("/logIn", logInAdmin);
adminRouter.post("/signUp", registerAdmin);

//Rutas admin cliente
adminRouter.get('/userclient/clients', ValidateAdmin, getAllUserClient);
adminRouter.get('/userclient/client/:idUserClient', ValidateAdmin, getUserClientById);
adminRouter.put("/update/:IdUserClient", ValidateAdmin, updateClientDetails);
adminRouter.delete("/deleteuserclient/:IdUserClient", ValidateAdmin, deleteClient);

//Rutas admin psicologo
adminRouter.get("/userpsychologist", ValidateAdmin, getAllUserPsychologist);
adminRouter.get("/userpsychologist/:IdUserPsychologist", ValidateAdmin, getPsychologistDetail);
adminRouter.put("/put_userpsychologist/:IdUserPsychologist",ValidateAdmin,updateUserPsychologist);
adminRouter.delete("/userpsychologist/deleteuserpsychologist/:IdUserPsychologist", ValidateAdmin,deleteUserPsychologist);

//Post
adminRouter.delete("/deletePost/:IdPost", deletePost);

module.exports = adminRouter;

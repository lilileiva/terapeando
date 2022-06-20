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
<<<<<<< HEAD
adminRouter.get('/userclient/clients/:IdUserClient', ValidateAdmin, getUserClientById);
=======
adminRouter.get('/userclient/client/:idUserClient', ValidateAdmin, getUserClientById);
>>>>>>> ccc2845 (l)
adminRouter.put("/userclient/update/:IdUserClient", ValidateAdmin, updateClientDetails);
adminRouter.delete("/userclient/deleteuserclient/:IdUserClient", ValidateAdmin, deleteClient);

//Rutas admin psicologo
adminRouter.get("/userpsychologist", ValidateAdmin, getAllUserPsychologist);
adminRouter.get("/userpsychologist/:IdUserPsychologist", ValidateAdmin, getPsychologistDetail);
<<<<<<< HEAD
adminRouter.put("/userpsychologist/put_userpsychologist/:IdUserPsychologist", ValidateAdmin, updateUserPsychologist);
adminRouter.delete("/deleteuserpsychologist/:IdUserPsychologist", ValidateAdmin, deleteUserPsychologist);
=======
adminRouter.put("/userpsychologis/put_userpsychologist/:IdUserPsychologist",ValidateAdmin,updateUserPsychologist);
adminRouter.delete("/deleteuserpsychologist/:IdUserPsychologist", ValidateAdmin,deleteUserPsychologist);
>>>>>>> ccc2845 (l)

//Post
adminRouter.delete("/deletePost/:IdPost", deletePost);

module.exports = adminRouter;

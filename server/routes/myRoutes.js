import express from "express";
import { registrationController } from "../controller/registrationController.js";
import { loginController } from "../controller/loginController.js";
import { fetchDataController } from "../controller/fetchDataController.js";
import { updateProfileController } from "../controller/updateProfileController.js";
import { userController } from "../controller/userController.js";
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registrationController);

//LOGIN || POST
router.post("/login", loginController);

//ALL DATA || GET
router.get("/fetchData", fetchDataController);

//CURRENT USER || GET
router.get("/user/:id", userController);

//update profile
router.post("/update",  updateProfileController);


export default router;

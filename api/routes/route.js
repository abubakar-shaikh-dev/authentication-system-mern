import express from "express";

//Controllers
import * as userController from "../controllers/user.controller.js";


//Middlewares
import { verifyToken } from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/user",verifyToken,userController.user)
router.put("/update",verifyToken,userController.update)
router.get("/logout",verifyToken,userController.logout)

export default router;
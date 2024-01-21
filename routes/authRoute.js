import express from "express";
import {registerController} from '../controllers/authController.js'
import { loginController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewear/authMiddlewear.js";

const router = express.Router()


router.post('/register', registerController)
router.post('/login', loginController)
//test route
router.post('/test', requireSignIn, isAdmin, testController)
export default router
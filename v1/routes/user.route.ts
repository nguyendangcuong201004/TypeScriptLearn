import express, { Router } from "express";
const router: Router = express.Router()

import * as controller from "../controllers/user.controller"
import * as validate from "../../validates/user.validate"
import * as authMiddleware from "../../middlewares/auth.middleware"

router.post("/register", validate.userCheck, controller.register)

router.post("/login", controller.login)

router.post("/password/forgot", controller.passwordForgot) 

router.post("/password/otp", controller.passwordOtp) 

router.post("/password/reset", controller.passwordReset) 

router.get("/detail/:token", authMiddleware.requireAuth, controller.detail) 

router.get("/list" ,controller.listUser) 

export const userRoutes = router;
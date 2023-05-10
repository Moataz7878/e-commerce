import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import { confirmEmail, forgetPassword, login, resetPassword, signUp } from "./auth.controller.js";
const router = Router()

router.post('/add',asyncHandler(signUp))
router.get('/confirmEmail/:token', asyncHandler(confirmEmail))
router.post('/login',asyncHandler(login))
router.get('/forgetPassword',asyncHandler(forgetPassword))
router.put('/resetPassword',asyncHandler(resetPassword))



export default router
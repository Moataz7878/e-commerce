import { Router } from "express";
import auth from "../../middleware/auth.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { addCartPoint } from "./cart.endPoint.js";
import { addCart } from "./cart.controller.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Cart Module"})
})


router.post('/addcart',auth(addCartPoint.USER),asyncHandler(addCart))



export default router
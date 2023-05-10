import { Router } from "express";
import { fileUploud } from "../../utils/multer.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { createBarnd } from "./brand.controller.js";
import auth from "../../middleware/auth.js";
import { brandEndPoint } from "./brand.endPoint.js";
const router = Router()




// router.get('/', (req ,res)=>{
//     res.status(200).json({message:"Brand Module"})
// })
router.post('/:subCategoryId',auth(brandEndPoint.CREAT_COUPON),fileUploud().single('image'),asyncHandler(createBarnd))




export default router
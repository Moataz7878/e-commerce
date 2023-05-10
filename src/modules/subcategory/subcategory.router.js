import { Router } from "express";
import { fileUploud } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import { supcreateCategory, updateSupCategory } from "./subcategory.controller.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { SupategorySchem, updateSupCategorySchem } from "./subcategory.validation.js";
import auth from "../../middleware/auth.js";
import { subcategoryEndPoint } from "./subcategory.endPoint.js";
const router = Router({mergeParams:true})



 router.post('/', auth(subcategoryEndPoint.CREAT_COUPON),fileUploud().single('image') ,
 validation(SupategorySchem) , 
 asyncHandler(supcreateCategory))
 router.put('/updateSupCategory/:SupCategoryId',auth(subcategoryEndPoint.CREAT_COUPON) ,fileUploud().single('image'),validation(updateSupCategorySchem),asyncHandler(updateSupCategory)  ) 

// router.get('/', (req ,res)=>{
//     res.status(200).json({message:"SubCategory Module"})
// })




export default router
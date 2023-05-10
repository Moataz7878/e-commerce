import { Router } from "express";
import auth from "../../middleware/auth.js";
import { productEndPoint } from "./product.endPoint.js";
import { fileUploud } from "../../utils/multer.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { createProduct, updateProduct } from "./product.controller.js";
import { validation } from "../../middleware/validation.js";
import { validationCreateProduct } from "./product.validation.js";
const router = Router()




// router.get('/', (req ,res)=>{
//     res.status(200).json({message:"product Module"})
// })

router.post('/addProduct',auth(productEndPoint.CREAT_COUPON),
fileUploud().fields([{ name: 'mainImage', maxCount: 1 },
{ name: "subImgaes", maxCount: 2 }]),
validation(validationCreateProduct),
asyncHandler(createProduct))


router.put('/updateProduct/:productId',auth(productEndPoint.CREAT_COUPON),
fileUploud().fields([{ name: 'mainImage', maxCount: 1 },
{ name: "subImgaes", maxCount: 2 }]),
asyncHandler(updateProduct))



export default router
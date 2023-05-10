import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import { createCategory, getAllCategory, updateCategory } from "./category.controller.js";
import { fileUploud } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
import { createCategorySchem, updateCategorySchem } from "./category.validation.js";
import  subcategoryRouter  from "../subcategory/subcategory.router.js";
import auth from "../../middleware/auth.js";
import { categoryEndPoint } from "./category.endPoint.js";
const router = Router()

router.use('/:categoryId/subCategory',subcategoryRouter)
router.post('/createCategory', auth(categoryEndPoint.CREAT_COUPON),fileUploud().single('image') ,validation(createCategorySchem) ,asyncHandler(createCategory))
router.put('/update/:categoryId',auth(categoryEndPoint.CREAT_COUPON),fileUploud().single('image'),validation(updateCategorySchem),asyncHandler(updateCategory))
router.get('/getALlCategory',asyncHandler(getAllCategory))

export default router
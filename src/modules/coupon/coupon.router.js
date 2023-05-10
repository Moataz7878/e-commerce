import { Router } from "express";
import { asyncHandler } from "../../utils/errorHandling.js";
import { createCoupon, updateCoupon } from "./coupon.controle.js";
import{validation} from "../../middleware/validation.js"
import { couponValidation } from "./coupon.validation.js";
import auth from "../../middleware/auth.js";
import { counponEndPoint } from "./coupon.endPoint.js";
const router = Router()




// router.get('/', (req ,res)=>{
//     res.status(200).json({message:"Coupon Module"})
// })
router.post('/createcoupon',auth(counponEndPoint.CREAT_COUPON),asyncHandler(createCoupon))
router.put('/update/:couponId',auth(counponEndPoint.CREAT_COUPON),validation(couponValidation),asyncHandler(updateCoupon))



export default router
import Joi from "joi";


export const couponValidation=Joi.object({
    code:Joi.string().min(3).max(14).optional(),
    amount:Joi.string().optional(),
    fromDate:Joi.string().optional(),
    toDate:Joi.string().optional(),
    couponId:Joi.string().required()
})
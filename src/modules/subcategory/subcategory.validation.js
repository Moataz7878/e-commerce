import Joi from"joi"
import { generalFields } from "../../middleware/validation.js"


const SupategorySchem =
     Joi.object({
        name:Joi.string().required().max(21).min(3),
        file:generalFields.file.required(),
        categoryId:Joi.string()
        // file:Joi.array().items(generalFields.file.required()).required()
    }).required()

    const updateSupCategorySchem =
     Joi.object({
        name:Joi.string().max(21).min(3).optional(),
        file:generalFields.file.optional(),
        // file:Joi.array().items(generalFields.file.required()).required()
        SupCategoryId:Joi.string().required()

    }).required()
export{SupategorySchem ,updateSupCategorySchem}
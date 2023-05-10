import Joi from"joi"
import { generalFields } from "../../middleware/validation.js"


const createCategorySchem =
     Joi.object({
        name:Joi.string().required().max(21).min(3),
        file:generalFields.file.required(),
        // file:Joi.array().items(generalFields.file.required()).required()

    }).required()


    
const updateCategorySchem =
     Joi.object({
        name:Joi.string().max(21).min(3).optional(),
        file:generalFields.file.optional(),
        // file:Joi.array().items(generalFields.file.required()).required()
        categoryId:Joi.string().required()

    }).required()
export{createCategorySchem,updateCategorySchem}
import { Schema, model } from "mongoose";


const SupCategorySchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    Image:{
        path:{
            type:String,
        required:true
        },
        public_id:{
            type:String,
            required:true
        }
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    updateby:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    slug:{
        type:String,
        required:true
    },
    cusmId:String,
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'category',
        required:false
    },
}, {
    timestamps: true
})


const SupcategoryModel = model('supcategory', SupCategorySchema)
export default SupcategoryModel
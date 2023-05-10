import { Schema, model } from "mongoose";
const brandSchema = new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
        
    },
    updatedby:{
        type:Schema.Types.ObjectId,
        ref:'User',        
    },
 logo:{
    path:{
        type:String,
        required:true
    },
    public_id:{
        type:String,
        required:true
    }
 },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:'supcategory'
    },
    cutsomId:{
        type:String
    }
}, {
    
    timestamps: true
})
const brandModel = model('brand', brandSchema)
export default brandModel

import { Schema, model } from "mongoose";


const categorySchema = new Schema({
   
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
    updatedby:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:false
        
    },
    slug:{
        type:String,
        required:true
    },
    cusmId:String
}, {
    toJSON:{virtuals:true},
    timestamps: true
})
categorySchema.virtual('subcategories',{
    ref:'supcategory',
    localField:'_id',
    foreignField:'categoryId'
})


const categoryModel = model('category', categorySchema)
export default categoryModel
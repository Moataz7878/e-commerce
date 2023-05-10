import { Schema, model } from "mongoose";
const ProductSchema = new Schema({
    name:{
        type:String,
        required:true,
        lowerCase:true

    },
    slug:String,
    description:String,
    stock:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,
        required:true,
        default:1
    },
    discount:{
        type:Number,
        default:0
    },
    priceAfterDiscount:{
        type:Number,
        default:0
    },
    colors: [String],
    size: [String],
    mainImage: { type: Object, required: true },
    subImgaes: { type: [Object] },
    //Ids
    brandId: {
        type:Schema.Types.ObjectId,
        ref: "brand",
        required: true
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
//  logo:{
//     path:{
//         type:String,
//         required:true
//     },
//     public_id:{
//         type:String,
//         required:true
//     }
//  },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        ref:'supcategory',
        required:true
    },
    categoryId: {
        type:Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    cutsomId:{
        type:String
    },
    // two fileds
    
    isDelete:{
        type:Boolean,
        default:false
    },
    userAddToWishList: [{
        type:Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    
    timestamps: true
})
const ProductModel = model('product',ProductSchema)
export default ProductModel

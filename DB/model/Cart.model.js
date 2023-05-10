import { Schema, model } from "mongoose";
const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    products:[{
        productId:{
            type:Schema.Types.ObjectId,
            ref:'product',
            required:true       
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
}, {
    
    timestamps: true
})
const cartModel = model('cart', cartSchema)
export default cartModel

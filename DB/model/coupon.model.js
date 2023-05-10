import { Schema, model } from "mongoose";


const couponSchema = new Schema({
   
    code:{
        type:String,
        unique:true,
        required:true
    },
    createdby:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
        
    },
    updatedBy: {
        type:Schema.Types.ObjectId,
        ref: "User",
    },
    amount:{
        type:Number,
        default:1,
        required:true
    },
    couponStatus:{
        type:String,
        default:'valid',
        enum:["valid",  "expired"]
    },
    fromDate:{
        type:String,
        required:[true,'please enter fromDate filed']
    },
    toDate:{
        type:String,
        required:[true,'please enter toDate filed']
    },
    usegePerUser:[
        {
            userId:{
                type:Schema.Types.ObjectId,
                ref:"User",
                required:true
            },
            maxUsege:{
                type:Number,
                required:true
            },
            usageCount:{
                type:Number,
                default:0
            }
        }
    
    ]
}, {
    
    timestamps: true
})



const counponModel = model('counpon', couponSchema)
export default counponModel
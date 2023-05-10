import { Schema, model } from "mongoose";
import pkg from 'bcryptjs'


const userSchema = new Schema({

    userName: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'userName is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
        default: 'User',
        enum: ['User', 'Admin']
    },

    active: {
        type: Boolean,
        default: false,
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    blocked: {
        type: Boolean,
        default: false,
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    image: String,
    DOB: String,
    forgetCod:String,
    changePassword:Number
}, {
    timestamps: true
})
userSchema.pre('save', function (next, doc) {
    this.password = pkg.hashSync(this.password, +process.env.SALT_ROUNDS)
    next()
})


const userModel = model('User', userSchema)
export default userModel
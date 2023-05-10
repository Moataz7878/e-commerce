import userModel from "../../../DB/model/User.model.js"

import pkg from 'bcryptjs'
import { generateToken, tokenDecode } from "../../utils/GenerateAndVerifyToken.js"
import sendEmail from "../../utils/sendEmail.js"
import { customAlphabet, nanoid } from "nanoid"
const nanoId =customAlphabet('123456789',6)

//======================== signUp =======================
export const signUp = async (req, res, next) => {
    const {
        userName,
        email,
        password,
        phone,
        DOB
    } = req.body
    const emailEixsts = await userModel.findOne({ email })
    if (emailEixsts) {
        return res.json({message:'Email is Already Exists'})
    }
    const newUser = new userModel({
        userName,
        email,
        password,
        phone,
        DOB
    })
    if (!newUser) {
        return res.json({message:'fail newUser'})
    }

    // confimation
    const token = generateToken({ payload: {newUser } })
    console.log({
        token
    });
    if (!token) {
        return res.json({message:'Token Generation Fail'})
    }
    const confirmationLink =
        `${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}`

    const message = `<a href= ${confirmationLink}>Click to confirm</a>`
    const sentEmail = await sendEmail({
        to: newUser.email,
        subject: "Confirmation Email",
        message,
        
    })
    // console.log({sendEmail});
    if (!sentEmail) {
        return res.json({message:'Send Email Service Fails'})
       
    }

    res.json({message:"Done signUp"});
   next()
}

//========================= confirmation Email ==================
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params

    const decode = tokenDecode({ payload: token })
    console.log(decode);
    if (!decode) {
        return res.json({message:'Decoding Fails'})
    }
    decode.newUser.confirmEmail = true
    const ConfirmEmailo = new userModel({
      ...decode.newUser
    })
    const SaveUser =await ConfirmEmailo.save()
  
    
  
    if (SaveUser) {
      return  res.json({message:'Done',SaveUser});
    }
      res.json({message:'fail'});
}

//=========================== Login =============================
export const login = async (req, res, next) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, confirmEmail: true })
    if (!user) {
        return res.json({message:'please if enter a valid email or make sure that you confirm your email'})
    }
    const match = pkg.compareSync(password, user.password)
    if (!match) {
        return res.json({message:'in-valid login information'})
    }
    const token = generateToken({
        payload: {
            _id: user._id,
            email: user.email,
            isLoggedIn: true
        }
    })
    await userModel.findOneAndUpdate({ email }, { isLoggedIn: true })
    return res.status(200).json({ message: "Login Done", token })

}





export const forgetPassword =async(req,res,next)=>{
    const {email}=req.body

    const forgetPassw = await userModel.findOne({email})
    if (!forgetPassw) {
        return res.json({message:'email un-difind'})
    }

    const forgetCod =nanoId()

    const message =`<div><h2> ${forgetCod}</h2> </div>`

    const sentEmail = await sendEmail({
        to: forgetPassw.email,
        subject: "forget password",
        message,
        
    })
    // console.log({sendEmail});
    if (!sentEmail) {
        return res.json({message:'Send Email Service Fails'})
       
    }
    
    // forgetPassw.forgetCod = forgetCod
    const save =await userModel.findOneAndUpdate({email},{
        forgetCod
    },{
        new:true
    })
    res.json({message:"Done"});


}


export const resetPassword = async (req, res, next) => {
    const { email, forgetCode, newPassword } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.json({message:'please sign up fisrt'})
    }
    if (user.forgetCod != forgetCode) {
        return res.json({message:'in-valid OTP'})
    }
    const hashedPass = pkg.hashSync(newPassword, +process.env.SALT_ROUNDS)
    const updatedUser = await userModel.findOneAndUpdate({ email }, {
        password: hashedPass,
        changePassword:Date.now(),
        forgetCod: null
    }, {
        new: true
    })
    if (!updatedUser) {
        return res.json({message:'please sign up fisrt'})
    }
    // user.forgetCode = null
    // user.password = newPassword
    // user.changePassword = Date.now()
    // const userUpdated = await user.save()
    return res.json({ message: "please login", updatedUser })

}
import jwt from "jsonwebtoken";
import { tokenDecode } from "../utils/GenerateAndVerifyToken.js";
import userModel from "../../DB/model/User.model.js";



const auth =(acceseRoles) => {
    return async (req,res,next)=>{

        try {
            const { authorization } = req.headers;
            if (!authorization) {
                return res.json({message:'please enter toen' })
            }
           
            if (!authorization?.startsWith(process.env.BEARER_KEY)) {
                return res.json({ message: "In-valid bearer key" })
            }
            const token = authorization.split(process.env.BEARER_KEY)[1]
          
            if (!token) {
                return res.json({ message: "In-valid token" })
            }
    
            const decoded = tokenDecode({payload:token})
            if (!decoded?._id) {
                return res.json({ message: "In-valid token payload" })
            }
         
            const authUser = await userModel.findById(decoded._id).select('userName email role changePassword')
            if (!authUser) {
                return res.json({ message: "Not register account" })
            }
            // console.log({
            //     tokenGeneratio:decoded.iat,
            //     reset:authUser.changePassword/1000
            // });
            if (decoded.iat <authUser.changePassword/1000) {
                return res.json({message:'token expirt'})
            }

            if (!acceseRoles.includes(authUser.role)) {
                return res.json({message:"un-Authorized user"})
            }
            req.user = authUser;
            return next()
        } catch (error) {
            return res.json({ message: "Catch error....." })
        }

    }
   
}

export default auth
import moment from "moment"
import counponModel from "../../../DB/model/coupon.model.js"
import { json } from "express"
import userModel from "../../../DB/model/User.model.js"


export const createCoupon =async(req,res)=>{
    const{code, amount , fromDate, toDate ,usegePerUser}=req.body
    const counponCode =await counponModel.findOne({code})
    if (counponCode) {
        return  res.json({message:'code exist'});
    }

    const fromDateMoment =moment(new Date(fromDate)).format('YYY-MM-DD HH:mm')
    const toDateMoment =moment(new Date(toDate)).format('YYY-MM-DD HH:mm')
    const now =moment().format('YYY-MM-DD HH:mm')
    
    let userIds = [];
    for (const user of usegePerUser) {
        if (!userIds.includes(user.userId)) {
            userIds.push(user.userId)
        }
    }
    
    const users = await userModel.find({ _id: { $in: userIds } })
    console.log(users);
    if (users.length !== usegePerUser.length) {
        return  res.json({message:'in-valid userId'});
    }

    if (moment(fromDateMoment).isAfter(moment(toDateMoment)) 
     ||moment(now).isAfter(moment(toDateMoment)) ||
     moment(now).isAfter(moment(fromDateMoment)) 
     
         ) {
        return res.json({message:'please enter format tomorrow'})
    }


    if (fromDateMoment ==  toDateMoment) {
        return  res.json({message:'in-vaild coupon intervel'});
    }


    const coupon =await counponModel.create({
        code,
        amount,
        fromDate:fromDateMoment,
        toDate:toDateMoment,
        createdby:req.user._id,
        usegePerUser
    })

    if (coupon) {
        return res.json({message:'Done',coupon})
    }
    
    res.json({message:'fail create'})
}


export const updateCoupon =async(req,res)=>{
    const {couponId}=req.params
    const{code, amount , fromDate, toDate}=req.body
    const coupon_id =await counponModel.findById({_id :couponId})
    if (!coupon_id) {
        return res.json({message:'fail id coupon'})
    }
    if (req.body.code) {
        if(req.body.code == coupon_id.code){
            return res.json({message:'please enter different coupon code '})
        }
        if (await counponModel.findOne({code:req.body.code})) {
            return res.json({message:'code already exist'})
        }
        coupon_id.code=req.body.code
    }
    if (req.body.amount) {
        if (amount>100 || amount<1) {
            return res.json({message:'in-vaild amout'})
        }
        coupon_id.amount =req.body.amount
    }
    if (req.body.fromDate) {
        if (moment(new Date(req.body.fromDate)).isBefore(moment())) {
            return res.json({message:'please enter dates start from tomorrow'})
        }
        if (moment(new Date(req.body.fromDate)).isAfter(moment(coupon_id.toDate))) {
            return res.json({message:'coupon cannot start after the expiration date'})
        }
        coupon_id.fromDate = moment(new Date(req.body.fromDate)).format('YYYY-MM-DD HH:mm')
    }
    if (req.body.toDate) {
        if (moment(new Date(req.body.toDate)).isBefore(moment())) {
            return res.json({message:'please enter dates start from tomorrow'})
        }
        if (moment(new Date(req.body.toDate)).isBefore(moment(coupon_id.fromDate))) {
            return res.json({message:'coupon cannot start after the expiration date'})
        }
        if (moment(new Date(req.body.toDate)).isSame(moment(coupon_id.fromDate))) {
            return res.json({message:'coupon cannot start on same day of expiration'})
        }
        coupon_id.toDate = moment(new Date(req.body.toDate)).format('YYYY-MM-DD HH:mm')
    }

    coupon_id.updatedBy =req.user._id

    const saveCoupon =await coupon_id.save()
    if (!saveCoupon) {
        return res.json({message:'fail save'})
    }
    res.json({message:'Done',saveCoupon})
}
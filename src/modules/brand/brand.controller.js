import { nanoid } from "nanoid";
import brandModel from "../../../DB/model/Brand.model.js"
import cloudinary from "../../utils/cloudinary.js";
import SupcategoryModel from "../../../DB/model/SupCategory.model.js";


export  const createBarnd =async(req,res)=>{
    const {name }=req.body
    const {subCategoryId}=req.params
    const brand =await brandModel.findOne({name})
    if (brand) {
        return  res.json({message:'name orede exiest'});
    }
    const supcategory=await SupcategoryModel.findById({_id:subCategoryId})
    if (!supcategory) {
        return req.json({message:'fail id supCategory'})
    }
    const cutsomId =nanoid(5)
  const {secure_url,public_id }=await cloudinary.uploader.upload(req.file.path,{
    folder:`${process.env.PROJECT_FOLDER}/Categories/subCategore${supcategory.cusmId}/Brands/${cutsomId}`
  })
  
    const saveBrand =await brandModel.create({
        name,
        subCategoryId,
        logo:{
            path:secure_url,
            public_id
        },
        cutsomId,
        createdby:req.user._id
    })
    if (saveBrand) {
        return res.json({message:'Done',saveBrand})
    }
    res.json({message:'fail save'})

}
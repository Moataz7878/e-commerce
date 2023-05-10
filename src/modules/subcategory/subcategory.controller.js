import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import { nanoid } from "nanoid";
import SupcategoryModel from "../../../DB/model/SupCategory.model.js";
import categoryModel from "../../../DB/model/Category.model.js";

const supcreateCategory =async(req,res)=>{
    const {name}=req.body
    const {categoryId} =req.params
    const slug =slugify(name ,'_')
    console.log(slug);
    const nameCategory =await SupcategoryModel.findOne({name})
    if(nameCategory){
        return res.json({message:"please enter diffferent category name  "})
    }
    const catergory =await categoryModel.findById({_id:categoryId})
    if(!catergory){
        return  res.json({message:"fail id"});
    }
    if (!req.file) {
    return  res.json({message:'create Image'});  
    }
    const cusmId=nanoid(5)
    
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.PROJECT_FOLDER}/Categories/subCategore/${cusmId}`
    })
    
    const SubCategory =await SupcategoryModel.create({
        name,
        slug,
        Image:{
            path:secure_url,
            public_id
        }
        ,cusmId,
        categoryId,
        createdby:req.user._id
    })
    if (!SubCategory) {
        await cloudinary.uploader.destroy(public_id)
        return res.json({message:"Fail SubCategory"})
    }
    res.json({message:'Done',SubCategory})
}

//update SupCategory
const updateSupCategory=async(req,res)=>{
    const {SupCategoryId} =req.params
    const SupCateg =await SupcategoryModel.findOne({_id:SupCategoryId})
    if (!SupCateg) {
        return res.json({message:'please enter SupCateg id'})
    }
    if (req.body.name) {
        if (SupCateg.name ==req.body.name) {
            return res.json({message:'please enter different category name'})
        }
        if (await SupcategoryModel.findOne({name:req.body.name})) {
            return res.json({message:"please anothr=er category name exit"})
        }
        SupCateg.name =req.body.name
        SupCateg.slug =slugify(req.body.name ,'_')
    }
    if (req.file) {
        await cloudinary.uploader.destroy(SupCateg.Image.public_id)
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path ,{
            folder:`${process.env.PROJECT_FOLDER}/Categories/${SupCateg.cusmId}`
        })
        SupCateg.Image={
            path:secure_url,
            public_id   
        }
    }
    
    SupCateg.updateby=req.user._id
    const saveSupcategory =await SupCateg.save()
    if (!saveSupcategory) {
        return res.json({message:'fail save'})
    }
    res.json({message:'Done',saveSupcategory})

}

export{supcreateCategory ,updateSupCategory}
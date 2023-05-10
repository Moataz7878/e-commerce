import slugify from "slugify";
import cloudinary from "../../utils/cloudinary.js";
import { nanoid } from "nanoid";
import  categoryModel  from "../../../DB/model/Category.model.js";



const createCategory =async(req,res)=>{
    const {name}=req.body
    const slug =slugify(name ,'_')
    console.log(slug);
    const nameCategory =await categoryModel.findOne({name})
    if(nameCategory){
        return res.json({message:"please enter diffferent category name  "})
    }
    if (!req.file) {
    return  res.json({message:'create Image'});  
    }
    const cusmId=nanoid(5)
    
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{
        folder:`${process.env.PROJECT_FOLDER}/Categories/${cusmId}`
    })
    
    const Category =await categoryModel.create({
        name,
        slug,
        Image:{
            path:secure_url,
            public_id
        }
        ,cusmId,
        createdby:req.user._id
    })
    if (!Category) {
        await cloudinary.uploader.destroy(public_id)
        return res.json({message:"Fail Category"})
    }
    res.json({message:'Done',Category})
}

//update Category
const updateCategory=async(req,res)=>{
    const {categoryId} =req.params
    const category =await categoryModel.findOne({_id:categoryId})
    if (!category) {
        return res.json({message:'please enter category id'})
    }
    if (req.body.name) {
        if (category.name ==req.body.name) {
            return res.json({message:'please enter different category name'})
        }
        if (await categoryModel.findOne({name:req.body.name})) {
            return res.json({message:"please anothr=er category name exit"})
        }
        category.name =req.body.name
        category.slug =slugify(req.body.name ,'_')
    }
    if (req.file) {
        await cloudinary.uploader.destroy(category.Image.public_id)
        const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path ,{
            folder:`${process.env.PROJECT_FOLDER}/Categories/${category.cusmId}`
        })
        category.Image={
            path:secure_url,
            public_id   
        }
    }
    category.updatedby = req.user._id
    const savecategory =await category.save()
    if (!savecategory) {
        return res.json({message:'fail save'})
    }
    res.json({message:'Done',savecategory})

}


//get all Category
const getAllCategory =async(req,res)=>{
    const getALl =await categoryModel.find({}).populate([{
        path:'subcategories'
    }])
    if (getALl) {
        return res.json({message:"Done",getALl})
    }
    res.json({message:"Fail getAll"})
}
export {createCategory ,updateCategory,getAllCategory}
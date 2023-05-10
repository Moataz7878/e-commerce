import slugify from "slugify"
import brandModel from "../../../DB/model/Brand.model.js"
import categoryModel from "../../../DB/model/Category.model.js"
import SupcategoryModel from "../../../DB/model/SupCategory.model.js"
import userModel from "../../../DB/model/User.model.js"
import { nanoid } from "nanoid"
import cloudinary from "../../utils/cloudinary.js"
import ProductModel from "../../../DB/model/Product.model.js"


export const createProduct =async(req,res,next)=>{
    const {brandId ,subCategoryId,categoryId ,name ,price,description ,discount}=req.body
   
    const brand =await brandModel.findOne({_id:brandId ,subCategoryId})
    if (!brand) {
        return  res.json({message:'please inter id brand'});
    }
    const subCategory =await SupcategoryModel.findOne({_id:subCategoryId,categoryId})
    if (!subCategory) {
        return  res.json({message:'please inter id subCategory'});
    }
    const category =await categoryModel.findById(categoryId)
    if (!category) {
        return  res.json({message:'please inter id category'});
    }
    //createdBy
    req.body.createdby =req.user._id


    //name
    req.body.slug =slugify(name,{
        replacement:'_',
        lower:true
    })

    //price
    req.body.priceAfterDiscount =price*(1-((discount || 0)/100))


    
    // Images => { mainImage:[{}]  , subImages:[{}, {}]}
    // console.log(req.files)
    // mainIamge

    const customId = nanoid(5)
    req.body.cutsomId = customId
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
        folder: `${process.env.PROJECT_FOLDER}/Categories/${category.cusmId}/SubCatgories/${subCategory.cusmId}/Brands/${brand.cutsomId}/Products/${customId}`
    })
    req.body.mainImage = {
        path: secure_url,
        public_id
    }

        // subImages
        if (req.files.subImgaes) {
        req.body.subImgaes = []
        for (const file of req.files.subImgaes) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
        folder: `${process.env.PROJECT_FOLDER}/Categories/${category.cusmId}/SubCatgories/${subCategory.cusmId}/Brands/${brand.cutsomId}/Products/${customId}`
        })
        req.body.subImgaes.push({
        path: secure_url,
        public_id
        })
            }
        }

        const product =await ProductModel.create(req.body)
        if (!product) {
            return res.json({message:'fail add product'})
        }
        res.json({message:'Done',product})

}






//==================UPDATE PRODUCT=========//

export const updateProduct = async (req, res, next) => {
    const { productId } = req.params
    const product = await ProductModel.findById(productId)
    if (!product) {
        return next(new Error('in-valid procustId', { cause: 400 }))
    }
    const { name, price, discount } = req.body
        //name 
        if (name) {
            req.body.slug = slugify(name, {
                replacment: '_',
                lower: true
            })
        }
        if (price && discount) {
            req.body.priceAfterDiscount = price * (1 - ((discount) / 100))
        }else if (price || discount) {
            req.body.priceAfterDiscount = (price || product.price) * (1 - ((discount || product.discount) / 100))
        }


    const brand =await brandModel.findOne({_id:product.brandId , subCategoryId:product.subCategoryId})
    const subCategory =await SupcategoryModel.findOne({_id:product.subCategoryId , categoryId:product.categoryId})
    const category =await categoryModel.findById(product.categoryId)




            // mainImage
    if (req.files?.mainImage?.length) {
        await cloudinary.uploader.destroy(product.mainImage.public_id)
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.files.mainImage[0].path, {
            folder: `${process.env.PROJECT_FOLDER}/Categories/${category.cusmId}/SubCatgories/${subCategory.cusmId}/Brands/${brand.cutsomId}/Products/${product.cutsomId}`

        })
        req.body.mainImage = {
            path: secure_url,
            public_id
        }
    }


        // subImages
        if (req.files?.subImgaes?.length) {
            req.body.subImgaes = []
            for (const file of req.files.subImgaes) {
                const { secure_url, public_id } = await cloudinary.uploader.upload(file.path, {
                    folder: `${process.env.PROJECT_FOLDER}/Categories/${category.cusmId}/SubCatgories/${subCategory.cusmId}/Brands/${brand.cutsomId}/Products/${product.cutsomId}`

                })
                req.body.subImgaes.push({
                    path: secure_url,
                    public_id
                })
            }
        }



        req.body.updatedby=req.user._id

        const save =await ProductModel.findByIdAndUpdate(productId,req.body,{new:true})
        if (!save) {
            return res.json({message:'fail save'})
        }
         res.json({message:'Done',save});

}
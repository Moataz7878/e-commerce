import cartModel from "../../../DB/model/Cart.model.js"
import ProductModel from "../../../DB/model/Product.model.js"

export const addCart =async(req,res,next)=>{
    const userId = req.user._id
    const { productId, quantity } = req.body
    // product
    const product = await ProductModel.findById(productId)
    if (!product) {
        return  res.json({message:'in-valid pricustID'});
    }
    if (product.stock < quantity || product.isDelete) {
        await ProductModel.findByIdAndUpdate(productId, {
            $addToSet: {
                userAddToWishList: userId
            }
        })
        return res.json({message:'not available'})
    }

        // userId
        const cart = await cartModel.findOne({ userId })
        if (!cart) {
            const savedCart = await cartModel.create({
                userId,
                products: [{ productId, quantity }]
            })
            return res.status(201).json({ messages: "Done", savedCart })
        }

        let isProductExist = false;
        for (const product of cart.products) {
            if (product.productId.toString() == productId) {
                product.quantity = quantity
               isProductExist = true
                break
            }
        }
    // add new product

        if (!isProductExist) {
            cart.products.push({ productId, quantity })
        }
        await cart.save()
        res.json({ message: "Done", cart })
}
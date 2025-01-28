const product=require("../models/product.model");

//* Return all Products
const getProducts=async()=>{

    return product.find({},{})
}

//* Return a product or list of products 
const selectedProducts=async(data)=>{

    return await product.find({ product_id: { $in: data } });

}
module.exports={getProducts,selectedProducts}

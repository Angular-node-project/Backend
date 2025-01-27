const product=require("../models/product.model");

const getProducts=async()=>{

    return product.find({},{})
}

const selectedProducts=async(data)=>{

    return await product.find({ product_id: { $in: data } });

}
module.exports={getProducts,selectedProducts}

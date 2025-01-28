const product=require("../models/product.model");

const getProducts=async()=>{

    return product.find({},{})
}

const selectedProducts=async(data)=>{

    return await product.find({ product_id: { $in: data } });

}

const getActivatedProductsPaginated=async(page,limit)=>{
    var skip =(page-1)*limit;
    return await  product.find({status:"active"})
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}

const countActivatedProducts=async()=>{
    return await product.countDocuments({status:"active"});
}
module.exports={getProducts,selectedProducts,getActivatedProductsPaginated,countActivatedProducts}

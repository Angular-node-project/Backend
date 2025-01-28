const product=require("../models/product.model");

//* Return all Products
const getProducts=async()=>{

    return product.find({status:"active"});
}

//* Return a product or list of products 
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

const getproductsbyStatus=async(status)=>{
    return  product.find({status:status});
}
const softdeleteproduct=async(productid)=>{
    return  product.findOneAndUpdate({product_id:productid},{status:"inactive"},{new:true});
}
const restoreproduct=async(productid)=>{
    return  product.findOneAndUpdate({product_id:productid},{status:"active"},{new:true});
}
const getProductbyid=async(productid)=>{
    return  product.findOne({product_id:productid});
}
const deleteproductbysellerid=async(sellerid)=>{
    return  product.findOneAndUpdate({seller_id:sellerid},{status:"inactive"},{new:true});
}

module.exports={getProducts
    ,selectedProducts,getproductsbyStatus,
    softdeleteproduct
    ,restoreproduct
    ,getProductbyid
    ,deleteproductbysellerid
    ,getActivatedProductsPaginated
    ,countActivatedProducts}

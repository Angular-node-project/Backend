const product=require("../models/product.model");

const getProducts=async()=>{

    return product.find({status:"active"});
}

const selectedProducts=async(data)=>{

    return await product.find({ product_id: { $in: data } });

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
    softdeleteproduct,restoreproduct,getProductbyid,deleteproductbysellerid}

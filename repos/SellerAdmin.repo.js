const seller =require("../models/seller.model")
const getSellers=async()=>{
    return seller.find({});
}
const getSellerbyid=async(sellerid)=>{
    return seller.findOne({seller_id:sellerid})
}
const getSellersByStatus=async(status)=>{
    return seller.find({status:status})
}
const softDeleteSeller=async(sellerid)=>{
    return seller.findOneAndUpdate({seller_id:sellerid},{status:"inactive"},{new:true})
}
const restoreSeller=async(sellerid)=>{
    return seller.findOneAndUpdate({seller_id:sellerid},{status:"active"},{new:true})
}
module.exports=
{
    getSellers,
    getSellersByStatus,
    softDeleteSeller,
    restoreSeller,
    getSellerbyid
}
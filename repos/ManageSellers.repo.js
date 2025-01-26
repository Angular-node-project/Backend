const seller =require("../models/seller.modal")
const getSellers=async()=>{
    return seller.find({});
}
const getSeller=async(sellerid)=>{
    return seller.findOne({seller_id:sellerid})
}
const getActiveSellers=async()=>{
    return seller.find({status:"active"})
}
const getInActiveSellers=async()=>{
    return seller.find({status:"inactive"})
}
const getPendingSellers=async()=>{
    return seller.find({status:"pending"})
}
const softDeleteSeller=async(sellerid)=>{
    return seller.findOneAndUpdate({status:"inactive"},{new:true})
}
const restoreSeller=async(sellerid)=>{
    return seller.findOneAndUpdate({status:"active"},{new:true})
}
module.exports=
{
    getSellers,
    getActiveSellers,
    getInActiveSellers,
    getPendingSellers,
    softDeleteSeller,
    restoreSeller,
    getSeller
}
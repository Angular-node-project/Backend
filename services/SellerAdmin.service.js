const sellersrepo=require("../repos/SellerAdmin.repo");
const getSellers=async()=>{
    return await sellersrepo.getSellers();
}
const getSellersByStatus=async(status)=>{
    return await sellersrepo.getSellersByStatus(status);
}
const softDeleteSeller=async(sellerid)=>{
    return await sellersrepo.softDeleteSeller(sellerid);
}
const restoreSeller=async(sellerid)=>{
    return await sellersrepo.restoreSeller(sellerid);
}
const getSellerbyid=async(sellerid)=>{
    return await sellersrepo.getSellerbyid(sellerid);
}
module.exports=
{
    getSellers,
   getSellersByStatus,
    softDeleteSeller,
    restoreSeller,
    getSellerbyid
}
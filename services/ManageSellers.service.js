const sellersrepo=require("../repos/ManageSellers.repo");
const getSellers=async()=>{
    return await sellersrepo.getSellers();
}
const getActiveSellers=async()=>{
    return await sellersrepo.getActiveSellers();
}
const getInActiveSellers=async()=>{
    return await sellersrepo.getInActiveSellers();
}
const getPendingSellers=async()=>{
    return await sellersrepo.getPendingSellers();
}
const softDeleteSeller=async(sellerid)=>{
    return await sellersrepo.softDeleteSeller(sellerid);
}
const restoreSeller=async(sellerid)=>{
    return await sellersrepo.restoreSeller(sellerid);
}
const getSeller=async(sellerid)=>{
    return await sellersrepo.getSeller(sellerid);
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
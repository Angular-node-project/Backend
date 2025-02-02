const sellersrepo=require("../repos/seller.repo");
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
const getAllsellersPaginated = async (page = 1, limit = 6,sort='',status='') => {
    const sellers = await sellersrepo.getAllSellersPaginated(page, limit,sort,status);
    const totalSellersCount = await sellersrepo.countAllsellers(status);
    return {
        sellers,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalSellersCount / limit),
        totalSellersCount
    }
}
module.exports=
{
    getAllsellersPaginated,
    getSellers,
   getSellersByStatus,
    softDeleteSeller,
    restoreSeller,
    getSellerbyid
}
const sellersrepo = require("../repos/seller.repo");
const getSellers = async () => {
    return await sellersrepo.getSellers();
}
const getSellersByStatus = async (status) => {
    return await sellersrepo.getSellersByStatus(status);
}
const softDeleteSeller = async (sellerid) => {
    return await sellersrepo.softDeleteSeller(sellerid);
}
const changeStatus = async (sellerid, status) => {
    return await sellersrepo.changeStatus(sellerid, status);
}
const getSellerbyid = async (sellerid) => {
    return await sellersrepo.getSellerbyid(sellerid);
}
const getAllsellersPaginated = async (page = 1, limit = 6, sort = '', status = '', search = '') => {
    const sellers = await sellersrepo.getAllSellersPaginated(page, limit, sort, status, search);
    const totalSellersCount = await sellersrepo.countAllsellers(status);
    return {
        sellers,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalSellersCount / limit),
        totalSellersCount
    }
}

const createSellerService = async (newSeller) => {
    return await sellersrepo.createSeller(newSeller);
}
const isEmailExistService=async(email)=>{
    return await sellersrepo.isEmailExist(email);
}
const getSellerByEmailService=async(email)=>{
    return await sellersrepo.getSellerByEmail(email);
}
module.exports =
{
    getAllsellersPaginated,
    getSellers,
    getSellersByStatus,
    softDeleteSeller,
    changeStatus,
    getSellerbyid,
    createSellerService,
    isEmailExistService,
    getSellerByEmailService
}
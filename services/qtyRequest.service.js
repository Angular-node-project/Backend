const qtyRequestRepo= require("../repos/qtyRequest.repo");
const addQtyRequestService=async(newRequest)=>{
    return qtyRequestRepo.addQtyRequest(newRequest); 
}
const getAllrequests=async()=>{
    return await qtyRequestRepo.getAllrequests();
}
const getAllQtyRequestedPaginated = async (page, limit, sort, status,search) => {
      const Qtyrequests=await qtyRequestRepo.getAllQtyRequestedPaginated(page,limit,sort,search,status);
        const totalQtyrequestsCount = await qtyRequestRepo.getAllQtyRequestedPaginated(status);
               return {
                Qtyrequests,
                   currentPage: parseInt(page),
                   totalPages: Math.ceil(totalQtyrequestsCount / limit),
                   totalQtyrequestsCount
               }
}

module.exports={
    addQtyRequestService,
    getAllrequests,
    getAllQtyRequestedPaginated
}
const qtyRequestRepo= require("../repos/qtyRequest.repo");
const addQtyRequestService=async(newRequest)=>{
    var result= qtyRequestRepo.addQtyRequest(newRequest); 
    return result;
}
const getAllrequests=async()=>{
  var result= await qtyRequestRepo.getAllrequests();
  return result;
}
const getAllQtyRequestedPaginated = async (page=1, limit=6, sort='', status='',search='') => {
      const Qtyrequests=await qtyRequestRepo.getAllQtyRequestedPaginated(page,limit,sort,status,search);
        const totalQtyrequestsCount = await qtyRequestRepo.countAllRequests(status);
               return {
                Qtyrequests,
                   currentPage: parseInt(page),
                   totalPages: Math.ceil(totalQtyrequestsCount / limit),
                   totalQtyrequestsCount
               }
}
const UpdateQtyRequest=async(requestId,status)=>{
    return await qtyRequestRepo.UpdateQtyRequest(requestId,status);
}
module.exports={
    addQtyRequestService,
    getAllrequests,
    getAllQtyRequestedPaginated,
    UpdateQtyRequest
}
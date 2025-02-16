const updateRequestRepo=require("../repos/productRequest.repo");
const getRequests=async()=>{
   return await updateRequestRepo.getRequests();
}
const getRequestbyId=async(requestId)=>{
    return await updateRequestRepo.getRequestbyId(requestId);
 }
 const getRequestsbyStatus=async(status)=>{
   return await updateRequestRepo.getRequestsbyStatus(status)
 }
 const updateRequest=async(requestId,status)=>{
    return await updateRequestRepo.updateRequest(requestId,status)
 }
 const getAllUpdaterequestPaginated = async (page = 1, limit = 6,sort='',category='',status='',seller='',search='') => {
     const products = await updateRequestRepo.getAllUpdaterequestPaginated(page, limit,sort,category,status,seller,search);
     const totalProductsCount = await updateRequestRepo.countUpdaterequest(category,status);
     return {
         products,
         currentPage: parseInt(page),
         totalPages: Math.ceil(totalProductsCount / limit),
         totalProductsCount
     }
 }
const createUpdateRequest = async (sellerId, productId, updateData) => {
  return await updateRequestRepo.createUpdateRequest(sellerId, productId, updateData);
}
 module.exports={
   getAllUpdaterequestPaginated,
   getRequests,
   getRequestbyId,
   getRequestsbyStatus,
   updateRequest,
   createUpdateRequest
 }
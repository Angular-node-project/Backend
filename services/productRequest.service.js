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
 module.exports={
   getRequests,
   getRequestbyId,
   getRequestsbyStatus,
   updateRequest
 }
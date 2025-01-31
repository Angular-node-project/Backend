const updateRequestSchema=require("../models/sellerUpdateProductRequest.model");
const getRequests=async()=>{
   return updateRequestSchema.find({});
}
const getRequestbyId=async(requestId)=>{
    return updateRequestSchema.find({request_id:requestId});
 }
 const getRequestsbyStatus=async(status)=>{
    return updateRequestSchema.find({status:status});
 }
 const updateRequest=async(requestId,status)=>{
  return updateRequestSchema.findOneAndUpdate(
      { request_id: requestId },
      { status: status },
      { new: true }
  );
 }
 module.exports={
   getRequests,
   getRequestbyId,
   getRequestsbyStatus,
   updateRequest
 }
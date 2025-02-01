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
 const getAllUpdaterequestPaginated=async(page,limit,sort,category,status)=>{
     var skip =(page-1)*limit;
     const query={};
     let sortQuery={};
     if(category){
       
         query.updatedProduct.categories = { $elemMatch: { category_id: category}};
 
     }
     if(status)
     {
         query.status=status ;
     }
     if(sort){
         const sortOrder=sort==='desc'?-1:1;
         sortQuery={"updatedProduct.price":sortOrder}
     }
 
     return await  updateRequestSchema.find(query)
                          .sort(sortQuery)
                          .skip(skip)
                          .limit(limit)
                          .exec();  
 }
 const countUpdaterequest=async(category,status)=>{
     const query={};
     if(category){
      query.updatedProduct.categories={$elemMatch:{category_id:category}}
     }
     if(status)
         {
             query.status=status ;
         }
     return await updateRequestSchema.countDocuments(query);
 }
 
 module.exports={
   countUpdaterequest,
   getAllUpdaterequestPaginated,
   getRequests,
   getRequestbyId,
   getRequestsbyStatus,
   updateRequest
 }
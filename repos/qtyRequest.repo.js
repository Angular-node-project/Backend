const clerkUpdateProductQtyRequestModel=require("../models/clerkUpdateProductQtyRequest.model");

const addQtyRequest=async(newRequest)=>{
    var result= await clerkUpdateProductQtyRequestModel.insertMany(newRequest);
    return result;
}

module.exports={
    addQtyRequest
}
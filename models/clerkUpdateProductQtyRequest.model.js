
const mongoose= require("mongoose");
const  {v4:uuidV4} =require("uuid");
const   ClerkUpdateProductQtyRequestSchema=new mongoose.Schema({
    request_id:{type:String,default:()=>uuidV4(),unique:true,required:true},
    product_id:{type:String,required:true},
    product_name:{type:String,required:true},
    branch:{branch_id:{type:String,required:true},name:{type:String,required:true}},
    requesterClerk:{clerk_id:{type:String,required:true},name:{type:String,required:true}},
    requiredQty:{type:String,required:true}
})
module.exports= mongoose.model("ClerkUpdateProductQtyRequest",ClerkUpdateProductQtyRequestSchema)
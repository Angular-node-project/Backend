const customerservice=require("../models/support.model");
const getAllMessages=async()=>{
    return customerservice.find({});
}
const getMessagebyCustomerEmail=async(email)=>{
    return customerservice.find({email:email});
}
module.exports={
    getAllMessages,
    getMessagebyCustomerEmail
}
const customerserviceRepo=require("../repos/customerservice.repo");
const getAllMessages=async()=>{
    return await customerserviceRepo.getAllMessages();
}
const getMessagebyCustomerEmail=async(email)=>{
   return await customerserviceRepo.getMessagebyCustomerEmail(email);
}
module.exports={
    getAllMessages,
    getMessagebyCustomerEmail
}
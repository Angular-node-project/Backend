const customerserviceRepo=require("../repos/customerservice.repo");
const getAllMessages=async()=>{
    return await customerserviceRepo.getAllMessages();
}
const getMessagebyCustomerEmail=async(email)=>{
   return await customerserviceRepo.getMessagebyCustomerEmail(email);
}
const getAllmessagesPaginated = async (page = 1, limit = 6,status='',email='') => {
    const messages = await customerserviceRepo.getAllMessagesPaginated(page, limit,status,email);
    const totalmessagesCount = await customerserviceRepo.countAllmessages(status,email);
    return {
        messages,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalmessagesCount / limit),
        totalmessagesCount
    }
}
module.exports={
    getAllmessagesPaginated,
    getAllMessages,
    getMessagebyCustomerEmail
}

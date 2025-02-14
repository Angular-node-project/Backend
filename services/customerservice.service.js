const customerserviceRepo=require("../repos/customerservice.repo");
const getAllMessages=async()=>{
    return await customerserviceRepo.getAllMessages();
}
const getMessagebyCustomerEmail=async(email)=>{
   return await customerserviceRepo.getMessagebyCustomerEmail(email);
}
const getAllmessagesPaginated = async (page = 1, limit = 6,status='',search='') => {
    const messages = await customerserviceRepo.getAllMessagesPaginated(page, limit,status,search);
    const totalmessagesCount = await customerserviceRepo.countAllmessages(status);
    return {
        messages,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalmessagesCount / limit),
        totalmessagesCount
    }
}
const SendMessage=async(email)=>{
    return await customerserviceRepo.SendMessage(email);
}
module.exports={
    getAllmessagesPaginated,
    getAllMessages,
<<<<<<< HEAD
    getMessagebyCustomerEmail
}
=======
    getMessagebyCustomerEmail,
    SendMessage
}
>>>>>>> 1bed8b1b33b08d093e87df050ff09f74e0f14e1e

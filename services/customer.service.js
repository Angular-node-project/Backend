const customerRepo=require("../repos/customer.repo");

const registerService=async(newCustomer)=>{
  var result=await customerRepo.create(newCustomer);
  return result;
}
const isEmailExistService= async(email)=>{
   var result=await customerRepo.isEmailExist(email);
   return result;
}
const getUserByEmailService= async(email)=>{
    var result=await customerRepo.getUserByEmail(email);
    return result;
 }
module.exports={registerService,isEmailExistService,getUserByEmailService}
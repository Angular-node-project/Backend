const customerRepo = require("../repos/customer.repo");

const registerService = async (newCustomer) => {
   var result = await customerRepo.create(newCustomer);
   return result;
};
const isEmailExistService = async (email) => {
   var result = await customerRepo.isEmailExist(email);
   return result;
};
const getUserByEmailService = async (email) => {
   var result = await customerRepo.getUserByEmail(email);
   return result;
};
const getUserByCustomerIdService = async (customerId) => {
   var result = await customerRepo.getUserByCustomerId(customerId);
   return result;
};

const updateProfile = async (updatedCustomer) => {

   let res=await customerRepo.updateProfile(updatedCustomer);
   return res;
 };

module.exports = {
   registerService,
   isEmailExistService,
   getUserByEmailService,
   updateProfile,
   getUserByCustomerIdService
};

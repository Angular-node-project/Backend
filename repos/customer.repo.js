const customer=require('../models/customer.model');

const create=async(newCustomer)=>{
   var result=await customer.create(newCustomer);
   return result
}

const isEmailExist=async(email)=>{
    var result= await customer.findOne({email:email});
    return result?true:false;
}
const getUserByEmail=async(email)=>{
    var result= await customer.findOne({email:email});
    return result;
}

module.exports={create,isEmailExist,getUserByEmail}
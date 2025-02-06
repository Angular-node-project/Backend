const customer=require('../models/customer.model');

const create=async(newCustomer)=>{
   var result=await customer.create(newCustomer);
   return result
}

const updateProfile=async (updatedCustomer)=>{
    let res = customer.findOneAndUpdate({customer_id:updatedCustomer.customer_id},{
        name:updatedCustomer.name,
        password:updatedCustomer.newPaswword,
        address:updatedCustomer.address,
        phone_number:updatedCustomer.phone_number,
        gender:updatedCustomer.gender
    },{new:true})
    return res;
};

const isEmailExist=async(email)=>{
    var result= await customer.findOne({email:email});
    return result?true:false;
}
const getUserByEmail=async(email)=>{
    var result= await customer.findOne({email:email});
    return result;
}
const getUserByCustomerId=async(customerId)=>{
    var result= await customer.findOne({customer_id:customerId});
    return result;
}

module.exports={create,isEmailExist,getUserByEmail,updateProfile,getUserByCustomerId}
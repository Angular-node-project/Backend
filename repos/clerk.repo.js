const clerk=require("../models/clerk.model");

const createUser=async(userData)=>{

    return clerk.create(userData);
}
const getUsers=async()=>{
    return clerk.find({});
}
const getUserbyid=async(userid)=>{
    return clerk.findOne({clerk_id:userid});
}
const updateUser=async(userid,userData)=>{

    return clerk.findOneAndUpdate({clerk_id:userid},userData,{new:true});
}
const softDeleteUser=async(userid)=>{

    return clerk.findOneAndUpdate({clerk_id:userid},{status:"inactive"},{new:true});
}
const restoreUser=async(userid)=>{

    return clerk.findOneAndUpdate({clerk_id:userid},{status:"active"},{new:true});
}
const getUsersBystatus=async(status)=>{
    return clerk.find({status:status});
}
const isEmailExist=async(email)=>{
    const result= await clerk.findOne({email:email});
    return result?true:false;
}
const getuserbyemail=async(email)=>{
    return clerk.findOne({email:email});
   
}
module.exports=
{
    createUser,
    getUsers,
    updateUser,
    softDeleteUser,
    getUsersBystatus,
    getUserbyid,
    restoreUser,
    isEmailExist,
    getuserbyemail
}

const clerk=require("../models/clerk.model");

const createUser=async(userData)=>{

    return clerk.create(userData);
}
const getUsers=async()=>{
    return clerk.find({});
}
const getUser=async(userid)=>{
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
const getactiveUsers=async()=>{
    return clerk.find({status:"active"});
}
const getinactiveUsers=async()=>{
    return clerk.find({status:"inactive"});
}
module.exports=
{
    createUser,
    getUsers,
    updateUser,
    softDeleteUser,
    getinactiveUsers,
    getactiveUsers,
    restoreUser,
    getUser
}

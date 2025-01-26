const clerkRepo=require("../repos/clerk.repo");
const addUser=async(userData)=>{
    return await clerkRepo.createUser(userData);
}
const getUsers=async()=>{
    return await clerkRepo.getUsers();
}
const updateUser=async(userid,userdata)=>{
    return await clerkRepo.updateUser(userid,userdata);
}
const getUser=async(userid)=>{
    return await clerkRepo.getUser(userid);
}
const softDeleteUser=async(userid)=>{
    return await clerkRepo.softDeleteUser(userid);
}

const getinactiveUsers=async()=>{
    return await clerkRepo.getinactiveUsers();
}
const getactiveUsers=async()=>{
    return await clerkRepo.getactiveUsers();
}
const restoreUser=async(userid)=>{
    return await clerkRepo.restoreUser(userid);
}

module.exports={addUser,getUsers,updateUser,softDeleteUser,getactiveUsers,getinactiveUsers,restoreUser,getUser}
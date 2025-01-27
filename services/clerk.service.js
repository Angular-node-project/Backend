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
const getUserbyid=async(userid)=>{
    return await clerkRepo.getUserbyid(userid);
}
const softDeleteUser=async(userid)=>{
    return await clerkRepo.softDeleteUser(userid);
}

const getUsersBystatus=async(status)=>{
    return await clerkRepo.getUsersBystatus(status);
}
const restoreUser=async(userid)=>{
    return await clerkRepo.restoreUser(userid);
}

module.exports={addUser,getUsers,updateUser,softDeleteUser,getUsersBystatus,restoreUser,getUserbyid}
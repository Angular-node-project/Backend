const clerkRepo=require("../repos/clerk.repo");
const registerUser=async(userData)=>{
    return await clerkRepo.registerUser(userData);
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
const isEmailExistService= async(email)=>{
   const result=await clerkRepo.isEmailExist(email);
   return result;
}
const getuserbyemail=async(email)=>{
    return clerkRepo.getuserbyemail(email);
   
}

module.exports={
    registerUser
    ,getUsers
    ,updateUser
    ,softDeleteUser
    ,getUsersBystatus
    ,restoreUser
    ,getUserbyid
    ,isEmailExistService
    ,getuserbyemail
}
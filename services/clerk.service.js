const clerkRepo=require("../repos/clerk.repo");
const addUser=async(userData)=>{
    return await clerkRepo.createUser(userData);
}
const getUser=async()=>{
    return await clerkRepo.getUser();
}
module.exports={addUser,getUser}
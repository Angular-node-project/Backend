const clerkRepo=require("../repos/clerk.repo");
const addUser=async(userData)=>{
    return await clerkRepo.createUser(userData);
}

module.exports={addUser}
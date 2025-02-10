const clerkRepo=require("../repos/clerk.repo");
const roleRepo=require("../repos/role.repo");

const registerUser=async(userData)=>{
    return await clerkRepo.createUser(userData);
}
const CreateUser=async(userData)=>{
    
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
const isEmailExistService= async(email)=>{
   const result=await clerkRepo.isEmailExist(email);
   return result;
}
const getuserbyemail=async(email)=>{
    return clerkRepo.getuserbyemail(email);
   
}
const getAllclerksPaginated = async (page = 1, limit = 6,searchWord='') => {
    const clerks = await clerkRepo.getAllclerksPaginated(page, limit,searchWord);
    const updatedClerks = await Promise.all(
        clerks.map(async (item) => {
            const role = await roleRepo.getPermissions(item.role_id);
            return { 
                ...item.toObject(), 
                role_name: role ? role.name : "Unknown" 
            };
        })
    );
    const totalClerksCount = await clerkRepo.countAllclerks(searchWord);
    return {
        updatedClerks,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalClerksCount / limit),
        totalClerksCount
    }
}

const changeStatusClerkService=async(clerk_id,status)=>{
    return await clerkRepo.changeStatusClerk(clerk_id,status);
}
module.exports={
    getAllclerksPaginated,
    registerUser
    ,getUsers
    ,updateUser
    ,softDeleteUser
    ,getUsersBystatus
    ,restoreUser
    ,getUserbyid
    ,isEmailExistService
    ,getuserbyemail
    ,CreateUser
    ,changeStatusClerkService
}
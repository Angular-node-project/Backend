const clerkBranchRepo=require("../repos/clerkBranch.repo");

const createClerkBranchService=async(newClerkBranch)=>{
    return clerkBranchRepo.createClerk(newClerkBranch);
}
const updateClerkService=async(clerkBranchId,BranchClerk)=>{
    return await clerkBranchRepo.updateClerk(clerkBranchId,BranchClerk);
}
const changestatusService=async(clerkBranchId,status)=>{
    return await clerkBranchRepo.changestatus(clerkBranchId,status);
}
const getClerkByEmailService=async(email)=>{
    return await clerkBranchRepo.getClerkByEmail(email);
}
  const isEmailExist=async(email)=>{
      return await clerkBranchRepo.isEmailExist(email);
   }
const getAllBranchClerksService=async()=>{
    return await clerkBranchRepo.getAllBranchClerks();
}
const getAllclerkbranchesPaginatedService=async(page,limit,sort,search,status)=>{
  const clerkBranches=await clerkBranchRepo.getAllclerkbranchesPaginated(page,limit,sort,search,status);
    const totalClerkBranchesCount = await clerkBranchRepo.countAllClerkBranches(status);
           return {
            clerkBranches,
               currentPage: parseInt(page),
               totalPages: Math.ceil(totalClerkBranchesCount / limit),
               totalClerkBranchesCount
           }
   }
   
   
module.exports={
    createClerkBranchService,
    getClerkByEmailService,
    updateClerkService,
    changestatusService,
    getAllclerkbranchesPaginatedService,
    isEmailExist,
    getAllBranchClerksService
}
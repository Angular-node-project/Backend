const clerkBranchRepo=require("../repos/clerkBranch.repo");

const createClerkBranchService=async(newClerkBranch)=>{
    return clerkBranchRepo.createClerk(newClerkBranch);
}
const getClerkBYEmailService=async(email)=>{
    return clerkBranchRepo.getClerkByEmail(email);
}
module.exports={
    createClerkBranchService,
    getClerkBYEmailService
}
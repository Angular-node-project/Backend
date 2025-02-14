const clerkBranchModel= require("../models/clerkBranch.model");

const createClerk=async(newBranchClerk)=>{
    return await clerkBranchModel.create(newBranchClerk);
}
const getClerkByEmail=async(email)=>{
    return await clerkBranchModel.findOne({email:email});
}

module.exports={
    createClerk,
    getClerkByEmail
}
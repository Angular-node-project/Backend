const branchrepo=require("../repos/branch.repo");
const createBranch=async(branchdata)=>{
    return await branchrepo.createBranch(branchdata);
}
const updateBranch=async(branchid,branchdata)=>{
    return await branchrepo.updateBranch(branchid,branchdata);
}
const changestatus=async(branchid,status)=>
{
    return await branchrepo.changestatus(branchid,status);
}
const getBranches=async()=>{
    return await branchrepo.getBranches();
}
const getAllbranchesPaginated=async(page,limit,sort,search,status)=>{
    const branches=await branchrepo.getAllbranchesPaginated(page,limit,sort,search,status);
    const totalBranchesCount = await branchrepo.countAllBranchs(status);
           return {
               branches,
               currentPage: parseInt(page),
               totalPages: Math.ceil(totalBranchesCount / limit),
               totalBranchesCount
           }
}

module.exports={
    createBranch,
    updateBranch,
    getAllbranchesPaginated,
    changestatus,
    getBranches

}
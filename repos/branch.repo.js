const branchModel = require("../models/branch.model");
const  branch=require("../models/branch.model");
const createBranch=async(branchdata)=>{
    return branch.create(branchdata);
}
const updateBranch=async(branchid,branchdata)=>{
    return branch.findOneAndUpdate({branch_id:branchid},branchdata,{new:true});
}
const changestatus=async(branchid,status)=>
{
    return branch.findOneAndUpdate({branch_id:branchid},{status:status},{new:true});
}
const getBranches=async()=>{
    return branch.find({});
}
const getAllbranchesPaginated=async(page,limit,sort,search,status)=>{
 var skip =(page-1)*limit;
    const query={};

    if(search){
        query.$or=[
            {name:{$regex:search,$options:'i'}},
            {location:{$regex:search,$options:'i'}}
        ]
    }
    if(status)
    {
        query.status=status ;
    }
    return await  branch.find(query)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}
const countAllBranchs=async(status)=>{
    const query={};
  
    if(status)
        {
            query.status=status ;
        }
    return await branch.countDocuments(query);
}

const getAllActiveBranches=async()=>{
    var result= await branchModel.find({status:'active'});
    return result;
}
module.exports={
    createBranch,
    updateBranch,
    getAllbranchesPaginated,
    countAllBranchs,
    changestatus,
    getBranches,
    getAllActiveBranches

}
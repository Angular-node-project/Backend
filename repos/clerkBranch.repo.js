const clerkBranchModel= require("../models/clerkBranch.model");

const createClerk=async(newBranchClerk)=>{
    return await clerkBranchModel.create(newBranchClerk);
}
const updateClerk=async(clerkBranchId,BranchClerk)=>{
    return  clerkBranchModel.findOneAndUpdate({clerkBranch_id:clerkBranchId},BranchClerk,{new:true});
}
const changestatus=async(clerkBranchId,status)=>{
    return  clerkBranchModel.findOneAndUpdate({clerkBranch_id:clerkBranchId},{status:status},{new:true});
}
const getClerkByEmail=async(email)=>{
    return  clerkBranchModel.findOne({email:email});
}
getAllBranchClerks=async()=>{
    return  clerkBranchModel.find({});
}
const getAllclerkbranchesPaginated=async(page,limit,sort,search,status)=>{
    var skip =(page-1)*limit;
       const query={};
       let sortQuery = { createdAt: -1 };
       if(search){
           query.$or=[
               {name:{$regex:search,$options:'i'}},
               {email:{$regex:search,$options:'i'}},
               {'branch.name':{$regex:search,$options:'i'}},
               {role:{$regex:search,$options:'i'}},
           ]
       }
       if(status)
       {
           query.status=status ;
       }
       return await  clerkBranchModel.find(query)
                            .sort(sortQuery)
                            .skip(skip)
                            .limit(limit)
                            .exec();  
   }
   const countAllClerkBranches=async(status)=>{
       const query={};
     
       if(status)
           {
               query.status=status ;
           }
       return await clerkBranchModel.countDocuments(query);
   }
   const isEmailExist=async(email)=>{
       var res= await clerkBranchModel.findOne({email:email});
       return res?true:false;
   }
 
module.exports={
    createClerk,
    getClerkByEmail,
    updateClerk,
    changestatus,
    getAllclerkbranchesPaginated,
    countAllClerkBranches,
    isEmailExist
}
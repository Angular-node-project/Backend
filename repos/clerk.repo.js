const clerk=require("../models/clerk.model");

const createUser=async(userData)=>{

    return clerk.create(userData);
}
const getUsers=async()=>{
    return clerk.find({});
}
const getUserbyid=async(userid)=>{
    return clerk.findOne({clerk_id:userid});
}
const updateUser=async(userid,userData)=>{

    return clerk.findOneAndUpdate({clerk_id:userid},userData,{new:true});
}
const softDeleteUser=async(userid)=>{

    return clerk.findOneAndUpdate({clerk_id:userid},{status:"inactive"},{new:true});
}
const restoreUser=async(userid)=>{

    return clerk.findOneAndUpdate({clerk_id:userid},{status:"active"},{new:true});
}
const getUsersBystatus=async(status)=>{
    return clerk.find({status:status});
}
const isEmailExist=async(email)=>{
    const result= await clerk.findOne({email:email});
    return result?true:false;
}
const getuserbyemail=async(email)=>{
    return clerk.findOne({email:email});
   
}
const getAllclerksPaginated=async(page,limit,status)=>{
    var skip =(page-1)*limit;
    const query={};
    if(status)
    {
        query.status=status ;
    }
    return await  clerk.find(query)
                         .skip(skip)
                         .limit(limit)
                         .exec();  
}
const countAllclerks=async(status)=>{
    const query={};

    if(status)
        {
            query.status=status ;
        }
    return await clerk.countDocuments(query);
}
module.exports=
{
    countAllclerks,
    getAllclerksPaginated,
    createUser,
    getUsers,
    updateUser,
    softDeleteUser,
    getUsersBystatus,
    getUserbyid,
    restoreUser,
    isEmailExist,
    getuserbyemail
}

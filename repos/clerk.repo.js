const clerk=require("../models/clerk.model");

const createUser=async(userData)=>{

    return clerk.create(userData);
}
const getUser=async()=>{
    return clerk.find({});
}

module.exports={createUser,getUser}

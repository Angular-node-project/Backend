const clerk=require("../models/clerk.model");

const createUser=async(userData)=>{
    return clerk.create(userData);
}

module.exports={createUser}

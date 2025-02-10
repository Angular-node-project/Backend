const roleModel = require('../models/role.model');

const getPermissions=async(role_id)=>{
   var result= await roleModel.findOne({role_id:role_id});
   return result;
}

const getAllRoles=async()=>{
    var result= await roleModel.find({});
    return result;
}

const getAllPaginatedRoles = async (page, limit) => {
    const skip = (page - 1) * limit;
    return await roleModel.find().skip(skip).limit(limit).exec();
};

const countAllRoles = async () => {
    return await roleModel.countDocuments();
};

module.exports={getPermissions,getAllRoles,getAllPaginatedRoles,countAllRoles}
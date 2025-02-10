const permissionModel= require("../models/permission.model");

const getAllPermissions=async()=>{
    return await permissionModel.find({});
}
 


module.exports={getAllPermissions}
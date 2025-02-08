const roleModel = require('../models/role.model');

const getPermissions=async(role_id)=>{
   var result= await roleModel.findOne({role_id:role_id});
   return result;
}

module.exports={getPermissions}
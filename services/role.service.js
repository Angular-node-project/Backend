
const roleRepo=require('../repos/role.repo');


const getPermisssionsService=async(role_id)=>{
    return await roleRepo.getPermissions(role_id);
}
module.exports={
    getPermisssionsService
}
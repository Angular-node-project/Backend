const permissionRepo=require('../repos/permission.repo');

const getAllPermissionService=async()=>{
    return await permissionRepo.getAllPermissions();
}
module.exports={getAllPermissionService}
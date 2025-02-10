
const roleRepo = require('../repos/role.repo');


const getPermisssionsService = async (role_id) => {
    return await roleRepo.getPermissions(role_id);
}

const getAllRolesService = async () => {
    return await roleRepo.getAllRoles();
}

const getAllPaginatedRoles = async (page = 1, limit = 10,searchword) => {

    const roles = await roleRepo.getAllPaginatedRoles(page, limit,searchword);
    const totalRolesCount = await roleRepo.countAllRoles(searchword);

    return {
        roles,
        currentPage: page,
        totalPages: Math.ceil(totalRolesCount / limit),
        totalRolesCount
    };
}

const saveRoleService=async(newRole)=>{
    
    return await roleRepo.saveRole(newRole);
}
const updateRoleService=async(role)=>{
    return await roleRepo.updateRole(role);
}
const changeStatusRoleService=async(role_id,status)=>{
    return await roleRepo.changeStatusRole(role_id,status);
}

const getAllActiveRoles=async()=>{
    return await roleRepo.getAllActiveRoles();
}
module.exports = {
    getPermisssionsService,
    getAllRolesService,
    getAllPaginatedRoles,
    saveRoleService,
    updateRoleService,
    changeStatusRoleService,
    getAllActiveRoles
}

const roleRepo = require('../repos/role.repo');


const getPermisssionsService = async (role_id) => {
    return await roleRepo.getPermissions(role_id);
}

const getAllRolesService = async () => {
    return await roleRepo.getAllRoles();
}

const getAllPaginatedRoles = async (page = 1, limit = 10) => {

    const roles = await roleRepo.getAllPaginatedRoles(page, limit);
    const totalRolesCount = await roleRepo.countAllRoles();

    return {
        roles,
        currentPage: page,
        totalPages: Math.ceil(totalRolesCount / limit),
        totalRolesCount
    };
}
module.exports = {
    getPermisssionsService,
    getAllRolesService,
    getAllPaginatedRoles
}
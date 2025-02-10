const roleModel = require('../models/role.model');

const getPermissions = async (role_id) => {
    var result = await roleModel.findOne({ role_id: role_id });
    return result;
}

const getAllRoles = async () => {
    var result = await roleModel.find({});
    return result;
}

const getAllActiveRoles=async()=>{
    var result =await roleModel.find({status:"active",name:{$ne:"super_admin"}});
    return result;
}

const getAllPaginatedRoles = async (page, limit, searchword = '') => {
    const skip = (page - 1) * limit;

    const searchFilter = {
        $and: [
            { name: { $ne: "super_admin" } },
            {status:{$ne:"deleted"}},
            searchword ? { name: { $regex: searchword, $options: 'i' } } : {}
        ]
    };

    const roles = await roleModel.find(searchFilter).skip(skip).limit(limit).exec();
    return roles;
};

const countAllRoles = async (searchword = '') => {
    const searchFilter = {
        $and: [
            { name: { $ne: "super_admin" } },
            {status:{$ne:"deleted"}},
            searchword ? { name: { $regex: searchword, $options: 'i' } } : {}
        ]
    };

    return await roleModel.countDocuments(searchFilter);
};
const saveRole = async (newRole) => {
    try {
        console.log("new Role: ", newRole); 
        var result = await roleModel.create(newRole);
        console.log("Role Saved: ", result); 
        return result;
    } catch (error) {
        console.error(" Error in saveRole:", error);
        throw error; 
    }
}

const updateRole = async (role) => {
    var existedRole = await roleModel.findOne({ role_id: role.role_id });
    var result = 0;
    if (existedRole) {
        console.log("Data being updated:", JSON.stringify(role, null, 2));
        var updateData = { ...role };
        delete updateData.role_id; 
        result = await roleModel.updateOne({ role_id: role.role_id }, { $set: updateData });
    }
    return result;
}
const changeStatusRole = async (role_id, status) => {
    var existedRole = await roleModel.findOne({ role_id: role_id });
    var result = 0;
    if (existedRole) {
        result = await roleModel.updateOne({ role_id }, { $set: { status } });
    }
    return result;
}

module.exports = {
    getPermissions
    , getAllRoles
    , getAllPaginatedRoles
    , countAllRoles
    , saveRole
    , updateRole
    , changeStatusRole
    ,getAllActiveRoles
}
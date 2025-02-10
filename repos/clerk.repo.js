const clerkModel = require("../models/clerk.model");
const clerk = require("../models/clerk.model");

const createUser = async (userData) => {
    return clerk.create(userData);
};
const getUsers = async () => {
    return clerk.find({});
};
const getUserbyid = async (userid) => {
    return clerk.findOne({ clerk_id: userid });
};
const updateUser = async (user_id,userData) => {
    var existedClerk = await clerkModel.findOne({ clerk_id: user_id });
    var result = 0;
    if (existedClerk) {
        var updateData = { ...userData };
        delete updateData.clerk_id;
        result = await clerkModel.updateOne({ clerk_id: user_id }, { $set: updateData });
    }
    return result;
};
const softDeleteUser = async (userid) => {
    return clerk.findOneAndUpdate(
        { clerk_id: userid },
        { status: "inactive" },
        { new: true }
    );
};
const restoreUser = async (userid) => {
    return clerk.findOneAndUpdate(
        { clerk_id: userid },
        { status: "active" },
        { new: true }
    );
};
const getUsersBystatus = async (status) => {
    return clerk.find({ status: status });
};
const isEmailExist = async (email) => {
    const result = await clerk.findOne({ email: email });
    return result ? true : false;
};
const getuserbyemail = async (email) => {
    return clerk.findOne({ email: email });
};
const getAllclerksPaginated = async (page, limit, searchWord = '') => {
    var skip = (page - 1) * limit;
    const query = { email: { $ne: "superAdmin@gmail.com" }, status:{$ne:"deleted"} };
    if (searchWord) {
        query.$or = [
            { name: { $regex: searchWord, $options: 'i' } },
            { email: { $regex: searchWord, $options: 'i' } }
        ];
    }
    return await clerk.find(query).skip(skip).limit(limit).exec();
};
const countAllclerks = async (searchWord = '') => {
    const query = { email: { $ne: "superAdmin@gmail.com" },status:{$ne:"deleted"} };
    if (searchWord) {
        query.$or = [
            { name: { $regex: searchWord, $options: 'i' } },
            { email: { $regex: searchWord, $options: 'i' } }
        ];
    }
    return await clerk.countDocuments(query);
};

const changeStatusClerk = async (clerk_id, status) => {
    var existedClerk = await clerk.findOne({ clerk_id: clerk_id });
    var result = 0;
    if (existedClerk) {
        result = await clerk.updateOne({ clerk_id }, { $set: { status } });
    }
    return result;
}
module.exports = {
    countAllclerks,
    getAllclerksPaginated,
    createUser,
    getUsers,
    updateUser,
    softDeleteUser,
    getUsersBystatus,
    getUserbyid,
    restoreUser,
    isEmailExist,
    getuserbyemail,
    changeStatusClerk
};

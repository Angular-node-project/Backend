const updateRequestSchema = require("../models/sellerUpdateProductRequest.model");

const getRequests = async () => {
    return updateRequestSchema.find({});
}

const getRequestbyId = async (requestId) => {
    return updateRequestSchema.find({ request_id: requestId });
}

const getRequestsbyStatus = async (status) => {
    return updateRequestSchema.find({ status: status });
}

const updateRequest = async (requestId, status) => {
    return updateRequestSchema.findOneAndUpdate(
        { request_id: requestId },
        { status: status },
        { new: true }
    );
}

const getAllUpdaterequestPaginated = async (page, limit, sort, category, status) => {
    var skip = (page - 1) * limit;
    const query = {};
    let sortQuery = {};
    if (category) {
        // Add category filter to query
    }
    if (status) {
        // Add status filter to query
    }
    if (sort) {
        // Add sorting to sortQuery
    }
    return await updateRequestSchema.find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(limit)
        .exec();
}

// New function to create an update request
const createUpdateRequest = async (sellerId, productId, updateData) => {
    const newUpdateRequest = new updateRequestSchema({
        seller_id: sellerId,
        product_id: productId,
        ...updateData,
        status: 'pending'
    });
    return await newUpdateRequest.save();
}

const countUpdaterequest = async (category, status) => {
    const query = {};
    if (category) {
        query.updatedProduct.categories = { $elemMatch: { category_id: category } };
    }
    if (status) {
        query.status = status;
    }
    return await updateRequestSchema.countDocuments(query);
}

module.exports = {
    getRequests,
    getRequestbyId,
    getRequestsbyStatus,
    updateRequest,
    getAllUpdaterequestPaginated,
    createUpdateRequest, // Export the new function
    countUpdaterequest
}
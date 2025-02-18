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

const getAllUpdaterequestPaginated = async (page, limit, sort, category, status,seller,search) => {
    var skip = (page - 1) * limit;
    const query = {};
    let sortQuery = { createdAt: -1 };
    if(seller)
    {
       query.seller_id=seller
    }
    if (category) {
        query.categories = { $elemMatch: { category_id: category } };
    }
    if (status) {
        query.status = status;
    }
    if(search)
    {
        query.$or = [
            { 'updatedProduct.name': { $regex: search, $options: 'i' }  },
            { 'seller.name':{ $regex: search, $options: 'i' }  }
        ];
    }
    if (sort) {
        const sortOrder = sort === 'desc' ? -1 : 1;
        sortQuery = { price: sortOrder }
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
    createUpdateRequest, 
    countUpdaterequest
}
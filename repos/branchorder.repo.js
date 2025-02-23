const branchordermodel = require("../models/branchOrder.model");
const orderModel = require("../models/order.model");
const productModel = require("../models/product.model");
const productBranchModel = require("../models/productBranch.model");


const getALllBranchOrders = async () => {
    return branchordermodel.find({});
}
const getAllBrnachOrdersPaginated = async (page, limit, status, search, branch_id) => {
    var skip = (page - 1) * limit;
    const query = {};

    let sortQuery = { createdAt: -1 };
    if (branch_id) {
        query["branch.branch_id"] = { $regex: branch_id, $options: "i" };
    }

    if (search) {
        query["product.name"] = { $regex: search, $options: "i" };
    }

    if (status) {
        query.status = status;
    }

    const pipeline = [
        { $match: query },
        { $sort: sortQuery },
        {
            $lookup: {
                from: "products",
                localField: "product.product_id",
                foreignField: "product_id",
                as: "productDetails"
            }
        },
        {
            $lookup: {
                from: "orders",
                localField: "order_id",
                foreignField: "order_id",
                as: "orderDetails"
            }
        },
        { $unwind: "$orderDetails" },
        {
            $lookup: {
                from: "customers",
                localField: "orderDetails.customer_id",
                foreignField: "customer_id",
                as: "customerDetails"
            }
        },
        { $unwind: { path: "$customerDetails", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "clerkbranches",
                localField: "orderDetails.cashier_id",
                foreignField: "clerkBranch_id",
                as: "cashierDetails"
            }
        },
        { $unwind: { path: "$cashierDetails", preserveNullAndEmptyArrays: true } },
        {
            $group: {
                _id: { order_id: "$order_id", branch_id: "$branch.branch_id" },
                order_id: { $first: "$order_id" },
                branch: { $first: "$branch" },
                status: { $first: "$status" },
               // totalPrice: { $first: "$orderDetails.totalPrice" },
                 totalPrice:{  $sum: { 
                    $multiply: ["$qty", { $arrayElemAt: ["$productDetails.price", 0] }]
                }},
                customer_id: { $first: "$orderDetails.customer_id" },
                customer_name: { $first: "$customerDetails.name" },
                cashier_id: { $first: "$orderDetails.cashier_id" },
                cashier_name: { $first: "$cashierDetails.name" },
                createdAt:{$first:"$createdAt"},
                orders: {
                    $push: {
                        branchOrder_id: "$branchOrder_id",
                        qty: "$qty",
                        product: {
                            product_id: "$product.product_id",
                            name: "$product.name",
                            pics: { $first: "$productDetails.pics" },
                            price: { $first: "$productDetails.price" }
                        }
                    }
                }
            }
        },
        { $skip: skip },
        { $limit: limit }
    ];

    return await branchordermodel.aggregate(pipeline);
}



const createOrdersBranch = async (data) => {
    return branchordermodel.create(data);
}

const countAllBranchOrders = async (status,branch_id) => {
    const query = {};

    if (branch_id) {
        query["branch.branch_id"] = { $regex: branch_id, $options: "i" };
    }


    if (status) {
        query.status = status;
    }

    const pipeline = [
        { $match: query },
        {
            $lookup: {
                from: "orders",
                localField: "order_id",
                foreignField: "order_id",
                as: "orderDetails"
            }
        },
        { $unwind: "$orderDetails" },
        {
            $group: {
                _id: { order_id: "$order_id", branch_id: "$branch.branch_id" }
            }
        },
        {
            $count: "totalOrders"
        }
    ];

    const result = await branchordermodel.aggregate(pipeline);
    return result.length > 0 ? result[0].totalOrders : 0; // Return count or 0 if no data
}

const changeBranchOrderStatus = async (order_Id, branch_Id, status) => {

    await branchordermodel.updateMany(
        { "branch.branch_id": branch_Id, order_id: order_Id },
        { $set: { status: status } });


    const statuses = await branchordermodel.aggregate([
        { $match: { order_id: order_Id } },
        { $group: { _id: null, uniqueStatuses: { $addToSet: "$status" } } }
    ]);
    if (!statuses.length) return;

    const uniqueStatuses = statuses[0].uniqueStatuses;

    let newOrderStatus;
    if (uniqueStatuses.includes('pending')) {
        newOrderStatus = "pending";
    } else if (uniqueStatuses.every(status => status === 'cancelled')) {
        newOrderStatus = "cancelled";
    } else if (uniqueStatuses.includes('processing')) {
        newOrderStatus = "processing";
    } else if (uniqueStatuses.includes('shipped')) {
        newOrderStatus = "shipped";
    } else if (uniqueStatuses.every(status => status === 'delivered')) {
        newOrderStatus = "delivered";
    }

    if (newOrderStatus) {
        await orderModel.updateOne(
            { order_id: order_Id },
            { $set: { status: newOrderStatus } }
        );
    }


}


const cancelOrderBranch = async (order_Id, branch_Id) => {
    const branchOrders = await branchordermodel.find({ order_id: order_Id, "branch.branch_id": branch_Id });
    if (!branchOrders.length) { return; }

    for (const branchOrder of branchOrders) {
        const { product, qty } = branchOrder;

        await productBranchModel.updateOne(
            { product_id: product.product_id, "branch.branch_id": branch_Id },
            { $inc: { qty: qty } }
        );

        await productModel.updateOne(
            { product_id: product.product_id },
            { $inc: { qty: qty } }
        );

    }

    await branchordermodel.updateMany(
        { order_id: order_Id, "branch.branch_id": branch_Id },
        { $set: { status: "cancelled" } }

    )
    const statuses = await branchordermodel.aggregate([
        { $match: { order_id: order_Id } },
        { $group: { _id: null, uniqueStatuses: { $addToSet: "$status" } } }
    ]);

    if (statuses.length && statuses[0].uniqueStatuses.every(status => status === "cancelled")) {
        await orderModel.updateOne(
            { order_id: order_Id },
            { $set: { status: "cancelled" } }
        );
    }

}
module.exports = {
    getALllBranchOrders,
    getAllBrnachOrdersPaginated,
    countAllBranchOrders,
    createOrdersBranch,
    changeBranchOrderStatus,
    cancelOrderBranch
}
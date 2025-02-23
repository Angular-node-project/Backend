const order = require("../models/order.model");
const branchOrderModel = require("../models/branchOrder.model");
const productBranchModel = require("../models/productBranch.model");
const productModel = require("../models/product.model");
const orderModel = require("../models/order.model");

const getorders = async () => {
    return await order.find({});
}
const getorderbystatus = async (status) => {
    return await order.find({ status: status });
}
const getorderbydid = async (orderid) => {
    return await order.find({ order_id: orderid });
}
const ChangeOrderStatus = async (orderid, status) => {
    await branchOrderModel.updateMany({ order_id: orderid }, { status: status });
    return await order.findOneAndUpdate({ order_id: orderid }, { status: status }, { new: true });
}
const getorderbysellerid = async (sellerid) => {
    return await order.find({ "product.seller_id": sellerid });
}
const getorderbyproductid = async (productid) => {
    return await order.find({ "product.product_id": productid });
}
const createOrder = async (data) => {

    return await order.create(data);
}

const cancelAllOrderBranches = async (order_id) => {
    var branchOrders = await branchOrderModel.find({ order_id: order_id });
    if (!branchOrders.length) {
        const Order = await orderModel.findOne({ order_id: order_id });
        if (!Order || !Order.product.length) { return; }
        for (const product of Order.product) {
            await productModel.updateOne(
                { product_id: product.product_id },
                { $inc: { qty: product.qty } }
            )
        }
    } else {
        for (const branchorder of branchOrders) {
            const { product, qty } = branchorder;
            await productBranchModel.updateOne(
                { product_id: product.product_id },
                { $inc: { qty: qty } }
            )
            await productModel.updateOne(
                { product_id: product.product_id },
                { $inc: { qty: qty } }
            )
        }
    }
}

const getAllOrdersPaginated = async (page, limit, status, governorate, type) => {
    var skip = (page - 1) * limit;
    const query = {};

    let sortQuery = { createdAt: -1 };

    if (governorate) {
        query.governorate = { $regex: governorate, $options: 'i' };
    }
    if (status) {
        query.status = status;
    }
    if (type === "Online") {
        query["customer_id"] = { $exists: true, $ne: null };
    } else if (type === "Offline") {
        query["cashier_id"] = { $exists: true, $ne: null };
    }

    const pipeline = [
        { $match: query },
        { $sort: sortQuery },
        {
            $lookup: {
                from: "branchorders",
                localField: "order_id",
                foreignField: "order_id",
                as: "branchOrders"
            }
        },
        {
            $lookup: {
                from: "customers",
                localField: "customer_id",
                foreignField: "customer_id",
                as: "customer"
            }
        },
        { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "clerkbranches",
                localField: "cashier_id",
                foreignField: "clerkBranch_id",
                as: "cashier"
            }
        },
        { $unwind: { path: "$cashier", preserveNullAndEmptyArrays: true } },
        // {
        //     $addFields: {
        //         status: {
        //             $cond: {
        //                 if: { $eq: [{ $size: "$branchOrders" }, 0] },
        //                 then: "pending",
        //                 else: {
        //                     $switch: {
        //                         branches: [
        //                             { case: { $gt: [{ $size: { $filter: { input: "$branchOrders", as: "bo", cond: { $eq: ["$$bo.status", "pending"] } } } }, 0] }, then: "pending" },
        //                             { case: { $gt: [{ $size: { $filter: { input: "$branchOrders", as: "bo", cond: { $eq: ["$$bo.status", "processing"] } } } }, 0] }, then: "processing" },
        //                             { case: { $gt: [{ $size: { $filter: { input: "$branchOrders", as: "bo", cond: { $eq: ["$$bo.status", "shipping"] } } } }, 0] }, then: "shipping" },
        //                             { case: { $eq: [{ $size: "$branchOrders" }, { $size: { $filter: { input: "$branchOrders", as: "bo", cond: { $eq: ["$$bo.status", "delivered"] } } } }] }, then: "delivered" },
        //                         ],
        //                         default: "pending"
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // },
        { $skip: skip },
        { $limit: limit },
        {
            $project: {
                order_id: 1,
                customer_id: 1,
                "customer.name": 1,
                "customer.email": 1,
                cashier_id: 1,
                "cashier.name": 1,
                "cashier.email": 1,
                totalPrice: 1,
                address: 1,
                governorate: 1,
                phone_number: 1,
                product: 1,
                status: 1,
                createdAt:1
            }
        }
    ];

    return await order.aggregate(pipeline);
};



const countAllOrders = async (status) => {
    const query = {};

    if (status) {
        query.status = status;
    }
    return await order.countDocuments(query);
}
const countOrdersBySellerId = async (sellerId) => {
    const query = { "product.seller_id": sellerId };
    const orders = await order.find(query).distinct('order_id');
    return orders.length;
}

const getCustomerOrders = async (customerId) => {
    return order.find({ customer_id: customerId }, {})
        .sort({ createdAt: -1 });

}
const getOrdersBySellerIdPaginated = async (sellerId, page, limit, governorate) => {
    var skip = (page - 1) * limit;
    const query = { "product.seller_id": sellerId };
    if (governorate) {
        query.governorate = { $regex: governorate, $options: 'i' };
    }
    const pipeline = [
        { $match: query },
        {$sort:{createdAt:-1}},
        { $skip: skip },
        { $limit: limit },
        {
            $lookup: {
                from: "branchorders",
                localField: "order_id",
                foreignField: "order_id",
                as: "branch_orders"
            }
        },
        {
            $lookup: {
                from: "customers",
                localField: "customer_id",
                foreignField: "customer_id",
                as: "customer"
            }
        },
        { $unwind: { path: "$customer", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "clerks",
                localField: "cashier_id",
                foreignField: "clerk_id",
                as: "cashier"
            }
        },
        { $unwind: { path: "$cashier", preserveNullAndEmptyArrays: true } },
        {
            $addFields: {
                deducedStatus: {
                    $switch: {
                        branches: [
                            {
                                case: { $in: ["pending", "$branch_orders.status"] },
                                then: "pending"
                            },
                            {
                                case: { $allElementsTrue: { $map: { input: "$branch_orders.status", as: "s", in: { $eq: ["$$s", "cancelled"] } } } },
                                then: "cancelled"
                            },
                            {
                                case: { $in: ["processing", "$branch_orders.status"] },
                                then: "processing"
                            },
                            {
                                case: { $in: ["shipping", "$branch_orders.status"] },
                                then: "shipping"
                            },
                            {
                                case: { $allElementsTrue: { $map: { input: "$branch_orders.status", as: "s", in: { $eq: ["$$s", "delivered"] } } } },
                                then: "delivered"
                            }
                        ],
                        default: "unknown"
                    }
                }
            }
        },
        {
            $addFields: {
                product: {
                    $filter: {
                        input: "$product",
                        as: "prod",
                        cond: { $eq: ["$$prod.seller_id", sellerId] }
                    }
                }
            }
        },
        {
            $project: {
                order_id: 1,
                customer_id: 1,
                "customer.name": 1,
                "customer.email": 1,
                cashier_id: 1,
                "cashier.name": 1,
                "cashier.email": 1,
                address: 1,
                governorate: 1,
                phone_number: 1,
                product: 1,
                createdAt:1,
                status: "$deducedStatus",
            }
        }
    ];

    return await order.aggregate(pipeline);
}

const assignOrderToBranches = async (orderBranches) => {
    var result = await branchOrderModel.insertMany(orderBranches);
    return result;

}




module.exports = {
    getAllOrdersPaginated,
    countAllOrders,
    getorders,
    getorderbystatus,
    getorderbydid,
    ChangeOrderStatus,
    getorderbysellerid,
    getorderbyproductid,
    createOrder,
    getCustomerOrders,
    getOrdersBySellerIdPaginated,
    countOrdersBySellerId,
    assignOrderToBranches,
    cancelAllOrderBranches
}


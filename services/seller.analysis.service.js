const Product = require("../models/product.model");
const Order = require("../models/order.model");
const Seller = require("../models/seller.model");

async function countSellerProducts(sellerId) {
    try {
        const count = await Product.countDocuments({ seller_id: sellerId });
        return count;
    } catch (error) {
        console.error("Error counting seller products:", error);
        throw error;
    }
}
async function countSellerProductsByStatus(sellerId, status) {
    try {
        const count = await Product.countDocuments({ seller_id: sellerId, status: status });
        return count;
    } catch (error) {
        console.error("Error counting seller products by status:", error);
        throw error;
    }
}
async function countOrdersForSeller(sellerId, status) {
    try {
        const orders = await Order.find({
            "product.seller_id": sellerId,
            "status": status
        }).distinct('order_id');
        return orders.length;
    } catch (error) {
        console.error("Error counting orders for seller:", error);
        throw error;
    }
}
async function getTopSellingProducts(sellerId, limit = 5) {
    try {
        const topProducts = await Order.aggregate([
            { $unwind: "$product" }, 
            { $match: { "product.seller_id": sellerId, "status": "delivered"  } }, 
            { 
                $group: { 
                    _id: "$product.product_id", 
                    name: { $first: "$product.name" }, 
                    totalSold: { $sum: "$product.qty" } 
                } 
            }, 
            { $sort: { totalSold: -1 } }, 
            { $limit: limit }, 
            { 
                $lookup: { 
                    from: "products", 
                    localField: "_id", 
                    foreignField: "product_id", 
                    as: "productDetails" 
                } 
            },
            { $unwind: "$productDetails" }, 
            {
                $project: {
                    _id: 0,
                    product_id: "$_id",
                    name: 1,
                    totalSold: 1,
                    price: "$productDetails.price",
                    pics: "$productDetails.pics"
                }
            }
        ]);

        return topProducts;
    } catch (error) {
        console.error("Error fetching top-selling products:", error);
        throw error;
    }
}

module.exports = {
    countSellerProducts,
    countOrdersForSeller,
    countSellerProductsByStatus,
    getTopSellingProducts
};

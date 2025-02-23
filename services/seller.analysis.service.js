const Product = require("../models/product.model");
const Order = require("../models/order.model");

async function countSellerProducts(sellerId) {
    try {
        const count = await Product.countDocuments({ seller_id: sellerId });
        return count;
    } catch (error) {
        console.error("Error counting seller products:", error);
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

module.exports = {
    countSellerProducts,
    countOrdersForSeller,
};

const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const orderSchema = new mongoose.Schema({
    order_id: { type: String,default:()=>uuidv4(), required: true, unique: true },
    address: { type: String, required: true },
    governorate: { type: String, required: true },
    zipcode: { type: Number, required: false },
    phone_number: { type: String, required: true },
    additional_data: { type: String, default: null },
    product: [{
        product_id: { type: String, required: true },
        seller_id: { type:String ,required: true },
        name: { type: String, required: true },
        qty: { type: Number, required: true,min:1 },
        price: { type: Number, required: true,min:1 },
        pic_path: { type: String, required: false },
        status: { type: String, enum: ["pending", "processing", "shipped", "cancelled", "delivered"], default: "pending" }
    }],
    status: { type: String, enum: ["pending", "processing", "shipped", "cancelled", "delivered"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

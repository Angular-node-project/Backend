const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const productSchema = new mongoose.Schema(
    {
        product_id: {
            type: String,
            default: () => uuidv4(),
            unique: true,
            required: true,
        },
        categories: { type: [{ category_id: { type: String, required: true }, name: { type: String, required: true } }] },
        name: { type: String, required: true },
        description: { type: String, required: true },
        details: { type: String, required: false },
        qty: { type: Number, required: true },
        price: { type: Number, required: true, min: 1 },
        seller_id: { type: String, required: true },
        status: {
            type: String,
            enum: ["active", "inactive", "pending", "outStock","deleted"],
            required: true,
        },
        pics: { type: [String], default: [] },
        reviews: {
            type: [
                {
                    customer: { customer_id: { type: String, required: true }, name: { type: String, required: true } },
                    rate: { type: Number, required: true, min: 1, max: 5 },
                    comment: { type: String, required: false },
                    created_at: { type: Date, default: Date.now() }
                },
            ],
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

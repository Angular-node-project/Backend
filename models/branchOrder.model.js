
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');

const branchOrderSchema = new mongoose.Schema({
    branchOrder_id: { type: String, default: () => uuidv4(), unique: true, required: true },
    branch: { branch_id: { type: String, required: true }, name: { type: String, required: true } },
    product: { product_id: { type: String, required: true }, name: { type: String, required: true } },
    qty: { type: Number, required: true },
    status: { type: String, enum: [ "processing", "shipped", "cancelled", "delivered"], default: "processing" }
}, { timestamps: true });

module.exports = mongoose.model("BranchOrder", branchOrderSchema);